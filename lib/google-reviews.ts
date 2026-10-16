export type QuoteItem = {
  quote: string;
  name: string;
  detail: string;
  href: string | null;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
};

export type GooglePlaceReviews = {
  rating: number | null;
  reviewCount: number | null;
  quotes: QuoteItem[];
};

const TWELVE_HOURS_SECONDS = 60 * 60 * 12;
const TWELVE_HOURS_MS = TWELVE_HOURS_SECONDS * 1000;

let memory: { expiresAt: number; value: GooglePlaceReviews | null } | null = null;

function stars(rating: number) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
}

function toQuote(review: PlacesReview): QuoteItem | null {
  const quote = review.text?.text?.trim() || review.originalText?.text?.trim() || "";
  const name = review.authorAttribution?.displayName?.trim() || "";
  if (!quote || !name) return null;

  const href = review.authorAttribution?.uri?.trim() || null;
  const when = review.relativePublishTimeDescription?.trim();
  const score = typeof review.rating === "number" ? stars(review.rating) : null;
  const detail = [score, when].filter(Boolean).join(" · ") || "Google";

  return { quote, name, detail, href };
}

export async function getGoogleReviews(): Promise<GooglePlaceReviews | null> {
  if (memory && Date.now() < memory.expiresAt) return memory.value;

  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!key || !placeId) return null;

  const exporting = process.env.GITHUB_PAGES === "true";

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=pt-BR&regionCode=BR`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews.rating,reviews.text,reviews.originalText,reviews.authorAttribution,reviews.relativePublishTimeDescription",
        },
        ...(exporting ? { cache: "force-cache" as const } : { next: { revalidate: TWELVE_HOURS_SECONDS } }),
      },
    );

    if (!response.ok) {
      console.error(`Google Places respondeu ${response.status}.`);
      memory = { expiresAt: Date.now() + TWELVE_HOURS_MS, value: null };
      return null;
    }

    const data = (await response.json()) as PlacesResponse;
    const quotes = (data.reviews ?? [])
      .map(toQuote)
      .filter((item): item is QuoteItem => item !== null);
    const result: GooglePlaceReviews = {
      rating: typeof data.rating === "number" ? data.rating : null,
      reviewCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      quotes,
    };

    if (!result.quotes.length && result.rating == null) {
      console.error("Google Places não devolveu nota nem comentários.");
      memory = { expiresAt: Date.now() + TWELVE_HOURS_MS, value: null };
      return null;
    }

    memory = { expiresAt: Date.now() + TWELVE_HOURS_MS, value: result };
    return result;
  } catch (error) {
    console.error("Google Places: falha ao buscar comentários.", error);
    memory = { expiresAt: Date.now() + TWELVE_HOURS_MS, value: null };
    return null;
  }
}

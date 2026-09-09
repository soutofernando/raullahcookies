import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public", "brand");

const mockupDir = "C:\\Users\\Pichau\\Desktop\\Apresentação e Mockups - RGB";
const photoDir =
  "C:\\Users\\Pichau\\.cursor\\projects\\c-Users-Pichau-Desktop-raullahcokkies\\assets";

function findMockup(n) {
  const files = fs.readdirSync(mockupDir);
  const match = files.find((file) => file.includes(`(${n}).`));
  if (!match) throw new Error(`Mockup ${n} not found`);
  return path.join(mockupDir, match);
}

function findPhoto(fragment) {
  const files = fs.readdirSync(photoDir);
  const match = files.find((file) => file.includes(fragment));
  if (!match) throw new Error(`Photo ${fragment} not found`);
  return path.join(photoDir, match);
}

const jobs = [
  { src: findMockup(2), name: "logo-primary", width: 1200 },
  { src: findMockup(5), name: "logo-badge", width: 1000 },
  { src: findMockup(1), name: "hang-tag", width: 1200 },
  { src: findMockup(9), name: "packaging-box", width: 1600 },
  { src: findMockup(8), name: "packaging-pink", width: 1600 },
  { src: findMockup(10), name: "packaging-split", width: 1600 },
  { src: findMockup(7), name: "apron", width: 1600 },
  { src: findMockup(15), name: "store-lounge", width: 1920 },
  {
    src: findPhoto("11.11.07__1_"),
    name: "store-counter",
    width: 1920,
  },
  {
    src: findPhoto("11.11.07__2_"),
    name: "ribbon-wall",
    width: 1920,
  },
  {
    src: findPhoto("11.11.08-"),
    name: "cookie-red-velvet",
    width: 1600,
  },
  {
    src: findPhoto("11.11.07-19b875e7"),
    name: "cookie-red-velvet-top",
    width: 1600,
  },
  {
    src: findPhoto("11.11.06-"),
    name: "cookie-chocolate",
    width: 1600,
  },
];

await fs.promises.mkdir(outDir, { recursive: true });

async function writeWebp(src, dest, width, quality) {
  const buffer = await fs.promises.readFile(src);
  await sharp(buffer)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
}

for (const job of jobs) {
  const buffer = await fs.promises.readFile(job.src);
  const meta = await sharp(buffer).metadata();
  const width = Math.min(job.width, meta.width ?? job.width);

  await writeWebp(job.src, path.join(outDir, `${job.name}.webp`), width, 78);
  await writeWebp(
    job.src,
    path.join(outDir, `${job.name}-960.webp`),
    Math.min(960, width),
    72,
  );

  console.log(`wrote ${job.name}`);
}

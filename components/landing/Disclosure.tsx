"use client";

import { useRef, useState } from "react";

export default function Disclosure({
  question,
  answer,
  accent = "rose",
}: {
  question: string;
  answer: string;
  accent?: "rose" | "blush";
}) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const panel = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const node = panel.current;
    if (!node) return;
    setHeight(open ? 0 : node.scrollHeight);
    setOpen((value) => !value);
  };

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold"
      >
        {question}
        <span
          className={`shrink-0 text-xl leading-none transition-transform duration-300 ease-out ${
            accent === "blush" ? "text-blush" : "text-rose"
          } ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        style={{ height }}
        className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      >
        <div
          ref={panel}
          className={`pb-4 text-sm leading-relaxed transition-opacity duration-500 motion-reduce:transition-none ${
            open ? "opacity-100" : "opacity-0"
          } ${accent === "blush" ? "text-cream/75" : "text-navy/75"}`}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

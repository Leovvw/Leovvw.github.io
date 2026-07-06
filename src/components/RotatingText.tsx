import { useEffect, useMemo, useState, type CSSProperties } from "react";

type RotatingTextProps = {
  texts: string[];
  interval?: number;
  className?: string;
};

type SegmenterConstructor = new (
  locale: string,
  options: { granularity: "grapheme" },
) => {
  segment(text: string): Iterable<{ segment: string }>;
};

function splitCharacters(text: string) {
  const Segmenter = (Intl as typeof Intl & { Segmenter?: SegmenterConstructor }).Segmenter;

  if (Segmenter) {
    const segmenter = new Segmenter("zh", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (segment) => segment.segment);
  }

  return Array.from(text);
}

export default function RotatingText({ texts, interval = 2200, className = "" }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = texts[currentIndex] ?? "";
  const characters = useMemo(() => splitCharacters(currentText), [currentText]);

  useEffect(() => {
    if (texts.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % texts.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, texts.length]);

  return (
    <span className={`rotating-text ${className}`} aria-live="polite">
      <span className="rotating-text-sr">{currentText}</span>
      <span className="rotating-text-line" aria-hidden="true" key={currentText}>
        {characters.map((character, index) => (
          <span
            className="rotating-text-char"
            key={`${character}-${index}`}
            style={{ "--char-delay": `${index * 34}ms` } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </span>
  );
}

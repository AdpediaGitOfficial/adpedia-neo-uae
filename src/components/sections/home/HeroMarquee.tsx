import Image from "next/image";
import { heroShowcase } from "@/lib/home-content";

/** Infinite horizontal marquee of showcase mockups (pure CSS, pauses on hover). */
export function HeroMarquee() {
  const items = [...heroShowcase, ...heroShowcase];
  return (
    <div className="pause-on-hover marquee-mask relative w-full overflow-hidden">
      <ul
        data-marquee
        className="animate-marquee flex w-max items-stretch gap-5"
        style={{ ["--marquee-duration" as string]: "48s" }}
      >
        {items.map((item, i) => (
          <li
            key={`${item.src}-${i}`}
            aria-hidden={i >= heroShowcase.length}
            className="relative aspect-[16/10] w-[clamp(280px,28vw,420px)] shrink-0 overflow-hidden rounded-card border border-white/10 bg-ink-800"
          >
            <Image
              src={item.src}
              alt={i < heroShowcase.length ? item.alt : ""}
              fill
              sizes="(max-width: 768px) 60vw, 420px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

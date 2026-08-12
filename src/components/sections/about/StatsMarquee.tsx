import { Star } from "lucide-react";
import { Label, Text } from "@/components/ui/typography";
import { stats } from "@/lib/home-content";
import { aboutBadge } from "@/lib/about-content";

/**
 * Star-separated stats ticker with the date badge beside it.
 *
 * The figures come from the same `stats` array the home page uses, so the two
 * cannot drift — the comp shows exactly those four. Duplicated for a seamless
 * CSS loop, with the copies hidden from assistive tech.
 *
 * The badge sits in its own column rather than floating over the track. In the
 * comp the marquee frame is 1532px wide and stops short of the badge at 1676;
 * overlaying it instead meant stats scrolled underneath and showed through the
 * gradient. The fades now only soften the track's own edges.
 */
export function StatsMarquee() {
  const items = [...stats, ...stats, ...stats];

  return (
    <div className="flex items-center gap-6 py-4 sm:gap-10">
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <ul
          data-marquee
          className="animate-marquee flex w-max items-center gap-6"
          style={{ ["--marquee-duration" as string]: "10s" }}
        >
          {items.map((stat, i) => (
            <li
              key={`${stat.unit}-${i}`}
              aria-hidden={i >= stats.length}
              className="flex shrink-0 items-center gap-6 whitespace-nowrap"
            >
              <span className="flex items-baseline gap-1.5">
                <Text as="span" size="body-sm" tone="primary">
                  {stat.value}
                  {stat.suffix}
                </Text>
                <Text as="span" size="body-sm" tone="muted">
                  {stat.unit}
                </Text>
              </span>
              <Star aria-hidden className="h-3 w-3 shrink-0 fill-current text-white/45" />
            </li>
          ))}
        </ul>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-24"
        />
      </div>

      <span className="shrink-0 text-right">
        <Label as="span" className="block text-white/45">
          {aboutBadge.range}
        </Label>
        <Text as="span" size="body-sm" className="mt-1 block">
          {aboutBadge.owner}
        </Text>
      </span>
    </div>
  );
}

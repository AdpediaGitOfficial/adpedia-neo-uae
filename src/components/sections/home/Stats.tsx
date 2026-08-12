import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Title, Text } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { statsIntro, stats } from "@/lib/home-content";

/**
 * The proof band: an intro card beside four figures.
 *
 * Rebuilt from the earlier version, which had two problems worth not
 * reintroducing:
 *
 * 1. **The intro card carried a structural void.** It stretched to match the
 *    stat grid — roughly 750px — while holding only a heading, a paragraph and a
 *    button, with `mt-auto` parking the button at the bottom. The gap was the
 *    layout, not a shortage of copy.
 * 2. **Four white cards on a white section** read as floating rather than
 *    sitting in anything, and each carried a border *and* a shadow, against the
 *    "borders, not shadows" rule. They are now one bordered panel divided by
 *    hairlines — the same treatment as the DevOps industries panel.
 *
 * The card is `accent-600` rather than `ink` because this is the home page's
 * first light section, sitting between two dark ones: an ink card made the whole
 * top of the page read as one long dark run. The accent breaks up the white
 * without spending that contrast beat. Its CTA uses the `invert` Button variant,
 * since `primary` would be accent-on-accent and invisible.
 */
export function Stats() {
  return (
    <Section tone="light" aria-labelledby="stats-heading">
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        <Reveal direction="left" className="lg:col-span-1">
          <div className="flex h-full flex-col bg-accent-600 p-8 text-white sm:p-10 lg:p-11">
            <Heading as="h2" id="stats-heading" size="sm" balance={false} className="leading-tight">
              {statsIntro.title}
            </Heading>
            {/* 20px (`body-lg`) from `sm` up — at this column width that is what
                lets the paragraph hold the card's height on its own, instead of
                a spacer doing it. Stays at `body` on a phone, where the card is
                full width and 20px would run to very long lines. */}
            <Text size="body" tone="primary" className="mt-6 sm:text-body-lg">
              {statsIntro.body}
            </Text>
            <div className="mt-auto pt-10">
              <Button href={statsIntro.cta.href} variant="invert" size="lg">
                {statsIntro.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* One panel, hairline-divided — not four cards.
            The dividers are a 1px grid `gap` showing the container's colour
            through, not borders on the cells. Per-cell borders needed
            `border-b` at one breakpoint and `border-b-0` at another, which is
            the same utility twice — Tailwind's output order decides the winner,
            not the order they are passed to `cn`, and the horizontal rules
            silently lost. A gap has nothing to collide with and re-flows by
            itself between one and two columns. */}
        <Stagger
          as="ul"
          className="grid list-none gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-2"
        >
          {stats.map((stat) => (
            <StaggerItem
              as="li"
              key={stat.title}
              className="flex flex-col bg-paper-200 p-7 sm:p-8 lg:p-9"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-sans text-[3.75rem] font-light leading-none tracking-tight">
                  {stat.value}
                  <sup className="ml-0.5 align-super text-2xl font-light">{stat.suffix}</sup>
                </p>
                <span className="text-lg text-ink/60">{stat.unit}</span>
              </div>
              <hr className="mt-6 border-ink/10" />
              <Title as="h3" size="sm" weight="semibold" surface="light" className="mt-5">
                {stat.title}
              </Title>
              <Text size="body" surface="light" className="mt-3">
                {stat.body}
              </Text>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

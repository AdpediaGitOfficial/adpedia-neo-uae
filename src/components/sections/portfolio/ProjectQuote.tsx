import { Section } from "@/components/ui/Section";
import { Heading, Label, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/projects";

/** Client words, set large — the one place on the page copy takes the lead. */
export function ProjectQuote({ quote }: { quote: NonNullable<Project["quote"]> }) {
  return (
    <Section padded={false} innerClassName="pb-section" aria-labelledby="project-quote-heading">
      <h2 id="project-quote-heading" className="sr-only">
        What the client said
      </h2>
      <Reveal>
        <figure className="border-t border-white/10 pt-12">
          <blockquote>
            <Heading as="h3" size="sm" weight="light" className="max-w-4xl">
              &ldquo;{quote.text}&rdquo;
            </Heading>
          </blockquote>
          <figcaption className="mt-8">
            <Label className="text-white/45">{quote.author}</Label>
            {quote.role ? (
              <Text size="body-sm" tone="muted" className="mt-2">
                {quote.role}
              </Text>
            ) : null}
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

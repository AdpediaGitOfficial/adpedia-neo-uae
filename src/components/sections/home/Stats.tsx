import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Heading, Title, Text } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { statsIntro, stats } from "@/lib/home-content";

export function Stats() {
  return (
    <Section tone="light" aria-labelledby="stats-heading">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Promo card */}
        <Reveal direction="left" className="lg:col-span-1">
          <div className="flex h-full flex-col bg-ink p-8 text-white sm:p-10">
            <Heading as="h2" id="stats-heading" size="sm" balance={false} className="leading-tight">
              {statsIntro.title}
            </Heading>
            <Text className="mt-6">{statsIntro.body}</Text>
            <div className="mt-auto pt-10">
              <Button href={statsIntro.cta.href} size="lg" className="w-full">
                {statsIntro.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>

        {/* 2x2 stat grid */}
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
          {stats.map((stat) => (
            <StaggerItem key={stat.title} className="h-full">
              <Card
                as="article"
                tone="light"
                padding="none"
                className="flex h-full flex-col p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <p className="font-sans text-[3.75rem] font-light leading-none tracking-tight">
                    {stat.value}
                    <sup className="ml-0.5 align-super text-2xl font-light">{stat.suffix}</sup>
                  </p>
                  <span className="pt-3 text-lg text-ink/60">{stat.unit}</span>
                </div>
                <hr className="my-6 border-ink/10" />
                <Title as="h3" size="sm" weight="semibold" surface="light">
                  {stat.title}
                </Title>
                <Text surface="light" className="mt-3">
                  {stat.body}
                </Text>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

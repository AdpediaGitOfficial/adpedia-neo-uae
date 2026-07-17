import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { statsIntro, stats } from "@/lib/home-content";

export function Stats() {
  return (
    <section className="bg-paper py-section text-ink" aria-labelledby="stats-heading">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Promo card */}
          <Reveal direction="left" className="lg:col-span-1">
            <div className="flex h-full flex-col rounded-card bg-ink p-8 text-white sm:p-10">
              <h2 id="stats-heading" className="font-sans text-display-sm font-light leading-tight">
                {statsIntro.title}
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/65">{statsIntro.body}</p>
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
                <article className="flex h-full flex-col rounded-card border border-ink/[0.08] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-8">
                  <div className="flex items-start justify-between">
                    <p className="font-sans text-[3.75rem] font-light leading-none tracking-tight">
                      {stat.value}
                      <sup className="ml-0.5 align-super text-2xl font-light">{stat.suffix}</sup>
                    </p>
                    <span className="pt-3 text-lg text-ink/70">{stat.unit}</span>
                  </div>
                  <hr className="my-6 border-ink/10" />
                  <h3 className="text-lg font-semibold">{stat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">{stat.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

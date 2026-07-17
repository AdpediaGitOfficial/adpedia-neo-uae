import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, PenTool, Rocket, Server, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { serviceMenu, portfolioMenu } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Code2,
  Smartphone,
  Sparkles,
  Rocket,
  Server,
};

function MegaIntro({
  eyebrow,
  title,
  description,
  viewAll,
  children,
  onNavigate,
}: {
  eyebrow: string;
  title: string;
  description: string;
  viewAll: { label: string; href: string };
  children?: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3.5 font-display text-2xl font-medium text-white">{title}</h2>
      <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/55">{description}</p>
      {children}
      <Link
        href={viewAll.href}
        onClick={onNavigate}
        className="mono-label mt-auto inline-flex items-center gap-2 pt-6 text-white transition-colors hover:text-accent-300"
      >
        {viewAll.label}
        <ArrowRight className="h-4 w-4 text-accent-400" aria-hidden />
      </Link>
    </div>
  );
}

export function ServiceMegaPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr]">
      <MegaIntro {...serviceMenu} onNavigate={onNavigate} />
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {serviceMenu.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Sparkles;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex h-full gap-3.5 rounded-xl border border-transparent p-4 transition-colors hover:border-white/10 hover:bg-ink-700"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center bg-accent-600/15 text-accent-300">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.95rem] font-semibold text-white">{item.label}</span>
                  <span className="mt-1 text-[0.8rem] leading-snug text-white/50">{item.description}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PortfolioMegaPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
      <MegaIntro
        eyebrow={portfolioMenu.eyebrow}
        title={portfolioMenu.title}
        description={portfolioMenu.description}
        viewAll={portfolioMenu.viewAll}
        onNavigate={onNavigate}
      >
        <ul className="mt-5 flex flex-wrap gap-2">
          {portfolioMenu.filters.map((filter, i) => (
            <li key={filter.href + filter.label}>
              <Link
                href={filter.href}
                onClick={onNavigate}
                className={`inline-block rounded-lg border px-3 py-1.5 text-[0.8rem] transition-colors ${
                  i === 0
                    ? "border-accent-600 bg-accent-600 text-white"
                    : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                {filter.label}
              </Link>
            </li>
          ))}
        </ul>
      </MegaIntro>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioMenu.featured.map((project) => (
          <li key={project.title}>
            <Link
              href={project.href}
              onClick={onNavigate}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-700 transition-colors hover:border-white/25"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-ink">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 260px"
                  className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col p-4">
                <span className="mono-label text-[0.65rem] text-accent-300">{project.category}</span>
                <span className="mt-2 text-base font-medium text-white">{project.title}</span>
                <span className="mono-label mt-3 inline-flex items-center gap-2 text-[0.62rem] text-white/60">
                  See work
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      className="grid min-h-[70vh] place-items-center bg-ink pt-[--header-height]"
      aria-labelledby="not-found-heading"
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="mono-label text-accent-400">404</p>
        <h1 id="not-found-heading" className="font-sans text-display-xl font-light text-white">
          Page not found
        </h1>
        <p className="max-w-md text-white/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist or is still in the works. Let&rsquo;s get you
          back on track.
        </p>
        <Button href="/" size="lg">
          Back to home
        </Button>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

/**
 * A framed video with a still-image fallback, sized by its parent.
 *
 * Shared by the service-detail hero (a wide banner) and the AI orbital core (a
 * circular mask). When a `video` is given it plays as an autoplay/loop/muted
 * background clip; otherwise the poster image is shown. Two constants across
 * both uses:
 *
 * - **Reduced motion falls back to the still.** A muted autoplay video cannot be
 *   stopped by CSS, so the check is here (client-side), matching how the rest of
 *   the site honours the preference.
 * - **`poster` is the same still**, so an image shows immediately while the
 *   (large) video loads, and it is what crawlers and no-JS clients see.
 *
 * Both fill the parent (which sets the aspect ratio / mask) with `object-cover`.
 *
 * Props tune the two contexts:
 * - `feather` overlays four black edge gradients so a rectangular video blends
 *   into the page. The hero needs it (its dark ground is not pure black); the
 *   circular core does not (the round mask is its own clean edge).
 * - `sizes`/`priority` are the usual next/image knobs — the hero is an LCP
 *   banner, the core a small decorative circle.
 */
const EDGE_FEATHER = [
  "linear-gradient(to right, #000, transparent 13%)",
  "linear-gradient(to left, #000, transparent 13%)",
  "linear-gradient(to top, #000, transparent 17%)",
  "linear-gradient(to bottom, #000, transparent 17%)",
].join(", ");

export function ServiceMedia({
  image,
  video,
  sizes = "(max-width: 1024px) 100vw, 1478px",
  feather = true,
  priority = true,
}: {
  image: { src: string; alt: string };
  video?: string;
  sizes?: string;
  feather?: boolean;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (video && !reduceMotion) {
    return (
      <>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={image.src}
          aria-label={image.alt}
        >
          <source src={video} type="video/mp4" />
        </video>
        {feather ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: EDGE_FEATHER }}
          />
        ) : null}
      </>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

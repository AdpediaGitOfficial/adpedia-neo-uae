import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The exact frosted-slat overlay exported from Figma (`public/images/services.svg`).
 *
 * Each slat is a `<foreignObject>` with a `backdrop-filter` blur (most 20px, a
 * few 90px) plus a `#252525` fill in `overlay` blend — the blur variation
 * carves the media into the comp's soft "equalizer" columns and the overlay
 * fill supplies the muted darkening. The export carries no image of its own, so
 * it must be **inlined over the media**: an `<img>`/`next/image` would render it
 * in isolation with nothing behind for the backdrop-filters to blur.
 *
 * We read the file once and stretch the root `<svg>` to fill the hero band
 * (`preserveAspectRatio="none"`). Uses `node:fs`, so this stays a server
 * component — never import it into a client tree.
 */
const RAW = readFileSync(
  join(process.cwd(), "public/images/services.svg"),
  "utf8",
);

// Make the fixed 1124×694 export fill its container and stretch to the band.
const SVG = RAW.replace(
  /<svg\b[^>]*>/,
  '<svg width="100%" height="100%" viewBox="0 0 1124 694" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">',
);

export function ServiceHeroSlats() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      dangerouslySetInnerHTML={{ __html: SVG }}
    />
  );
}

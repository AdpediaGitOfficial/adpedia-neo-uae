type Slat = { left: number; width: number; blur: number };

/**
 * The "equalizer" slats from the Figma frosted-glass hero effect —
 * reconstructed as plain positioned divs instead of the original SVG export.
 *
 * The original export (`public/images/services.svg`) used SVG
 * `<foreignObject>` elements with `backdrop-filter` + `clip-path: url(...)`
 * inside them (Figma's "background blur" CSS export). That combination does
 * not composite in WebKit — desktop and mobile Safari both fail to apply the
 * blur inside a foreignObject, so the slats rendered as flat, unblurred
 * `#252525` bars sitting directly over the hero video, which read as both
 * "the video" and "the overlay" being broken on iOS.
 *
 * `backdrop-filter` on a normal HTML element is well supported in Safari, so
 * each slat below is just a `<div>` positioned by percentage (relative to the
 * export's 1124-wide viewBox — every slat in the original spans the full
 * 694px height, so only x/width and blur radius vary), with the same
 * `#252525` / `mix-blend-mode: overlay` tint the export used.
 */
const VIEWBOX_WIDTH = 1124;

const SLATS: Slat[] = [
  { left: 561.984, width: 618.183 - 561.984, blur: 90 },
  { left: 602.125, width: 642.267 - 602.125, blur: 20 },
  { left: 642.27, width: 682.411 - 642.27, blur: 20 },
  { left: 682.414, width: 722.556 - 682.414, blur: 20 },
  { left: 722.551, width: 762.692 - 722.551, blur: 20 },
  { left: 762.691, width: 802.833 - 762.691, blur: 20 },
  { left: 802.836, width: 842.978 - 802.836, blur: 20 },
  { left: 963.402, width: 1003.54 - 963.402, blur: 20 },
  { left: 842.977, width: 883.118 - 842.977, blur: 20 },
  { left: 1003.54, width: 1043.68 - 1003.54, blur: 20 },
  { left: 561.984, width: 602.126 - 561.984, blur: 20 },
  { left: 883.117, width: 923.259 - 883.117, blur: 20 },
  { left: 1043.68, width: 1083.83 - 1043.68, blur: 20 },
  { left: 923.258, width: 963.399 - 923.258, blur: 20 },
  { left: 1083.83, width: 1123.97 - 1083.83, blur: 90 },
  { left: 0, width: 56.1983, blur: 90 },
  { left: 40.1406, width: 80.2823 - 40.1406, blur: 20 },
  { left: 80.2852, width: 120.427 - 80.2852, blur: 20 },
  { left: 120.43, width: 160.571 - 120.43, blur: 20 },
  { left: 160.57, width: 200.712 - 160.57, blur: 20 },
  { left: 200.707, width: 240.849 - 200.707, blur: 20 },
  { left: 240.852, width: 280.993 - 240.852, blur: 20 },
  { left: 401.422, width: 441.564 - 401.422, blur: 20 },
  { left: 280.992, width: 321.134 - 280.992, blur: 20 },
  { left: 441.562, width: 481.704 - 441.562, blur: 20 },
  { left: 0, width: 40.1417, blur: 20 },
  { left: 321.133, width: 361.274 - 321.133, blur: 20 },
  { left: 481.699, width: 521.841 - 481.699, blur: 20 },
  { left: 361.277, width: 401.419 - 361.277, blur: 20 },
  { left: 521.844, width: 561.985 - 521.844, blur: 90 },
];

export function ServiceHeroSlats() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {SLATS.map((slat, i) => (
        <div
          key={i}
          className="absolute inset-y-0 bg-[#252525] mix-blend-overlay"
          style={{
            left: `${(slat.left / VIEWBOX_WIDTH) * 100}%`,
            width: `${(slat.width / VIEWBOX_WIDTH) * 100}%`,
            backdropFilter: `blur(${slat.blur}px)`,
            WebkitBackdropFilter: `blur(${slat.blur}px)`,
          }}
        />
      ))}
    </div>
  );
}

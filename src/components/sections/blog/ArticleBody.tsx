import { Title, Text } from "@/components/ui/typography";
import type { Block } from "@/lib/blog-content";

/**
 * Renders the typed block list. Each variant maps to a primitive rather than a
 * prose stylesheet, so article copy stays on the same type scale as the rest of
 * the site.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  if (blocks.length === 0) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;

        if (block.type === "heading") {
          return (
            <Title
              key={key}
              as={block.level === 2 ? "h2" : "h3"}
              size={block.level === 2 ? "md" : "sm"}
              weight={block.level === 2 ? "normal" : "medium"}
              className={block.level === 2 ? "mt-16 first:mt-0" : "mt-10"}
            >
              {block.text}
            </Title>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="mt-5 flex flex-col gap-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                  <Text size="body">{item}</Text>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <Text key={key} size="body" className="mt-5">
            {block.text}
          </Text>
        );
      })}
    </div>
  );
}

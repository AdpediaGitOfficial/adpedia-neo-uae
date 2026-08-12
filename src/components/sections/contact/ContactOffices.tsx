import { Mail, Phone } from "lucide-react";
import { Title, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { offices } from "@/lib/site";

/** Icon + label link (email / phone), toned via the Text primitive. */
function ContactLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="group flex items-center gap-3">
      <Icon aria-hidden className="h-4 w-4 shrink-0 text-white/45 transition-colors group-hover:text-white" />
      <Text as="span" size="body-sm" tone="secondary" className="transition-colors group-hover:text-white">
        {children}
      </Text>
    </a>
  );
}

/**
 * The three regional offices. Each row is an address block and a contact block
 * separated by a vertical hairline (horizontal rule on small screens).
 */
export function ContactOffices() {
  return (
    <Stagger className="flex flex-col gap-16 sm:gap-20">
      {offices.map((office) => (
        <StaggerItem key={office.country}>
          <Title as="h3" size="lg" weight="light" className="uppercase tracking-spaced">
            {office.country}
          </Title>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:gap-10">
            <address className="not-italic sm:w-64">
              {office.address.map((line) => (
                <Text key={line} size="body-sm" tone="secondary">
                  {line}
                </Text>
              ))}
            </address>

            <div className="flex flex-col gap-2 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <ContactLink href={`mailto:${office.email}`} icon={Mail}>
                {office.email}
              </ContactLink>
              <ContactLink href={office.phoneHref} icon={Phone}>
                {office.phone}
              </ContactLink>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

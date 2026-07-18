import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
  children: React.ReactNode;
};

/** Centered content column matching the design's max width + gutters. */
export function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Tag = as ?? "div";
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-content px-5 sm:px-8 lg:px-16 xl:px-[100px]",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

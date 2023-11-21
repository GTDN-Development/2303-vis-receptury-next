import clsx from "clsx";

// Popis komponentu:
// - Slouží k zobrazení animovaného loaderu
// - Je k dispozici několik velikostí a tlouštěk

type Props = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "inherit";
  color?: "inherit" | "primary" | "white" | "black";
  loadingText?: string;
};

// Component Variants
const componentVariants = {
  size: {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "w-16 h-16",
    "2xl": "w-20 h-20",
    inherit: "h-[1em] w-[1em]",
  },
  borderSize: {
    xs: "border-[0.125rem]",
    sm: "border-[0.1875rem]",
    md: "border-[0.25rem]",
    lg: "border-[0.375rem]",
    xl: "border-[0.5rem]",
    "2xl": "border-[0.625rem]",
    inherit: "border-[0.125em]",
  },
  color: {
    inherit: "border-current",
    primary: "border-primary-500",
    white: "border-white",
    black: "border-gray-900",
  },
};

export default function Loader({
  className = "",
  size = "inherit",
  color = "primary",
  loadingText,
}: Props) {
  return (
    <div className={className}>
      <div
        aria-label="načítání..."
        className={clsx(
          "relative",
          componentVariants.size[size],
          loadingText && "mx-auto"
        )}
      >
        <div
          className={clsx(
            "absolute origin-center animate-[spin_0.7s_linear_infinite] rounded-full border-dashed border-b-transparent border-l-transparent border-r-transparent opacity-25",
            componentVariants.size[size],
            componentVariants.borderSize[size],
            componentVariants.color[color]
          )}
        ></div>
        <div
          className={clsx(
            "absolute origin-center animate-[spin_0.7s_ease_infinite] rounded-full border-b-transparent border-l-transparent border-r-transparent",
            componentVariants.size[size],
            componentVariants.borderSize[size],
            componentVariants.color[color]
          )}
        ></div>
      </div>
    </div>
  );
}

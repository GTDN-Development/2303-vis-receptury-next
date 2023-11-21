import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

// Component Variants
// const componentVariants = {
//   base: "",
//   prop: {
//     value: "",
//     value: "",
//     value: "",
//   },
// }

export default function TemplateBase({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

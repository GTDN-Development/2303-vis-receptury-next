import { cn } from "@/lib/cn";
import { forwardRef } from "react";

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

const TemplateRef = forwardRef<HTMLDivElement, Props>(
  ({ children, className = "", ...rest }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...rest}>
        {children}
      </div>
    );
  }
);

TemplateRef.displayName = "TemplateRef";
export default TemplateRef;

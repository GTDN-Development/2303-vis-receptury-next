"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

// Wrapper for Next.js Link component that adds an activeClassName prop
// for styling active links (Url pathname matches the href prop)

type Props = React.ComponentPropsWithRef<typeof Link> & {
  activeClassName: string;
  className?: string;
  [key: string]: any;
};

const ActiveLink = forwardRef<HTMLAnchorElement, Props>(
  ({ activeClassName = "", className = "", ...props }, forwardedRef) => {
    const pathname = usePathname();
    const isActive = pathname === props.href;
    return (
      <Link
        ref={forwardedRef}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

ActiveLink.displayName = "ActiveLink";
export default ActiveLink;
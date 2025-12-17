import * as React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "success"
    | "warning"
    | "info";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      outline: "text-foreground",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground",
      success:
        "border-transparent bg-neon-green/20 text-neon-green border border-neon-green/50",
      warning:
        "border-transparent bg-yellow-500/20 text-yellow-500 border border-yellow-500/50",
      info: "border-transparent bg-blue-500/20 text-blue-500 border border-blue-500/50",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };

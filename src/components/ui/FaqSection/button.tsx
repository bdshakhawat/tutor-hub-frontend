import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../ui/FaqSection/utils";

const buttonVariants = cva(
  "intine-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-semibold  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ",
  {
    variants: {
      variant: {
        default: "bg-primary text-primaryPro hover:bg-[#136E61]",
        primary: "bg-primary text-white",
        outline:
          "border border-accent bg-transparent text-accent hover:bg-accent hover:text-primary",
      },
      size: {
        default: "h-[40px] px-6 ",
        md: "h-[48px] px-6 ",
        lg: "h-[56px] text-sm uppercase tracking-[2px] px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
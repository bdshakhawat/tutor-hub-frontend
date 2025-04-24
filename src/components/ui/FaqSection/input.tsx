import * as React from "react";

import { cn } from "../../ui/FaqSection/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[48px]  bg-transparent rounded-xl   font-light px-4 py-5 text-base placeholder:text-lg placeholder:text-black  outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
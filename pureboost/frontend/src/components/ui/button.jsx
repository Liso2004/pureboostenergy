import React from "react";

const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const variants = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  hero: "bg-primary text-primary-foreground hover:bg-accent hover:scale-105 shadow-hero transition-all duration-300 font-semibold",
  cta: "bg-accent text-accent-foreground hover:bg-primary hover:scale-105 shadow-lg transition-all duration-300 font-semibold",
};

const sizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef(
  ({ variant = "default", size = "default", className = "", ...props }, ref) => {
    const variantClasses = variants[variant] || variants.default;
    const sizeClasses = sizes[size] || sizes.default;

    return (
      <button
        ref={ref}
        className={`${buttonBase} ${variantClasses} ${sizeClasses} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

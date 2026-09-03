import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Button variant styles
const getButtonStyles = (
  variant: string = "default",
  size: string = "default"
) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    outline:
      "border bg-transparent focus-visible:ring-gray-500",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
    link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  };

  return cn(
    baseStyles,
    variants[variant as keyof typeof variants] || variants.default,
    sizes[size as keyof typeof sizes] || sizes.default
  );
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(getButtonStyles(variant, size), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;

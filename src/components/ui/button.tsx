import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-[#1E4D2B] text-white hover:bg-[#163B20] shadow-lg hover:shadow-xl",
        destructive:
          "bg-[#B8413D] text-white hover:bg-[#A03730] shadow-lg hover:shadow-xl",
        outline:
          "border-2 border-[#1E4D2B] bg-transparent text-[#1E4D2B] hover:bg-[#1E4D2B] hover:text-white shadow-md hover:shadow-lg",
        secondary:
          "bg-[#C89F45] text-white hover:bg-[#B8913D] shadow-lg hover:shadow-xl",
        ghost: "text-[#2B2E2B] hover:bg-[#F7F6F2] hover:text-[#1E4D2B]",
        link: "text-[#C89F45] underline-offset-4 hover:underline hover:text-[#B8913D]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-white hover:bg-[#2E7A5A]",
        secondary:
          "border-transparent bg-[#C89F45] text-white hover:bg-[#B8913D]",
        destructive:
          "border-transparent bg-[#B8413D] text-white hover:bg-[#A03730]",
        outline: "border-primary text-primary",
        success:
          "border-transparent bg-[#3D9970] text-white hover:bg-[#2E7A5A]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
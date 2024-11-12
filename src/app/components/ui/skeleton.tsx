import React from 'react'
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export default function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  ...props
}: SkeletonProps = {}) {
  const baseClasses = "animate-pulse bg-gray-200 dark:bg-gray-700"
  
  const variantClasses = {
    text: "rounded",
    circular: "rounded-full",
    rectangular: ""
  }

  const styles: React.CSSProperties = {
    width: width,
    height: height
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      style={styles}
      {...props}
    />
  )
}
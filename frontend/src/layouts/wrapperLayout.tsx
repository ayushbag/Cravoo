import React from 'react'
import { cn } from '../lib/utils'

const WrapperLayout = ({ children, className } : {
    children: React.ReactNode;
    className?: string;
}) => {
  return (
    <div className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full",
      className
    )}>
        { children }
    </div>
  )
}

export default WrapperLayout
import React from 'react'
import { cn } from '../lib/utils'

const WrapperLayout = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <div className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    )}>
        { children }
    </div>
  )
}

export default WrapperLayout
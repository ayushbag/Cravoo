import React from 'react'
import WrapperLayout from './wrapperLayout'

const AuthLayout = ({ children } : {
    children: React.ReactNode
}) => {
  return (
    <WrapperLayout>
        <div className="flex min-h-screen items-center justify-center">
            { children }
        </div>
    </WrapperLayout>
  )
}

export default AuthLayout
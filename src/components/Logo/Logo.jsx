import React from 'react'

export const Logo = () => {
    return (
        <div className='relative flex items-center'>
            
            {/* Background Icon */}
            <div className="absolute -left-4 text-5xl w-10 h-10 text-primary/15  rounded-md">✦</div>

            {/* Text */}
            <div className='relative flex items-center'>
                <span className="text-2xl font-bold text-secondary">
                    S
                </span>

                <span className="text-xl font-bold text-primary">
                    tyle
                </span>

                <span className="text-2xl font-bold text-secondary ml-1">
                    D
                </span>

                <span className="text-xl font-bold text-primary">
                    ecor
                </span>
            </div>
        </div>
    )
}
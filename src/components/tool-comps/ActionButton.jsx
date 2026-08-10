import React from 'react'
import useMagnetHover from '../../hooks/useMagnetHover'

const VARIANT_CLASSES = {
    primary: 'bg-amber-47 hover:brightness-110 disabled:bg-neutral-700 disabled:text-neutral-500 text-black',
    secondary: 'bg-transparent border border-neutral-700 hover:border-amber-47 text-neutral-300 hover:text-amber-47',
}

/** Full-width pill button used for a tool's main actions (Compress, Resize, etc.). */
const ActionButton = ({ variant = 'primary', onClick, disabled, children, className = '' }) => {
    const { ref, handlers } = useMagnetHover()

    return (
        <button
            ref={ref}
            {...handlers}
            onClick={onClick}
            disabled={disabled}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-4 rounded-xl cursor-pointer disabled:cursor-not-allowed transition-all duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default ActionButton
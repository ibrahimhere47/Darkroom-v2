import React, { useRef } from 'react'
import gsap from 'gsap'

const MagneticWrapper = ({ children, strength = 0.35, className = '', disabled = false }) => {
    const elRef = useRef(null)

    const handleMouseMove = (e) => {
        if (disabled) return
        const rect = elRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = e.clientX - centerX
        const y = e.clientY - centerY

        gsap.to(elRef.current, {
            x: x * strength,
            y: y * strength,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
        })
    }

    const handleMouseLeave = () => {
        gsap.to(elRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.45)',
        })
    }

    return (
        <div
            ref={elRef}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}

export default MagneticWrapper
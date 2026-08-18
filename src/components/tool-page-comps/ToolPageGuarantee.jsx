import React, { useRef } from 'react'
import gsap from 'gsap'
import MagneticWrapper from '../MagneticWrapper'

const ToolPageGuarantee = ({ g, idx }) => {

    const borderRef = useRef(null)
    const parentRef = useRef(null)
    const Icon = g.icon

    const handleHover = () => {
        gsap.to(borderRef.current, {
            opacity: '100%',
            boxShadow: `0 0 16px #e8a33d`,
            duration: 0.4,
        })
        gsap.to(parentRef.current, {
            color: '#e8a33d',
            duration: 0.4,
        })
    }

    const handleHoverLeave = () => {
        gsap.to(borderRef.current, {
            opacity: '0%',
            boxShadow: 'none',
            duration: 0.4,
        })
        gsap.to(parentRef.current, {
            color: '#e5e5e5',
            duration: 0.4
        })
    }

    return (
        <div onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className='w-1/4 h-70 text-neutral-300' ref={parentRef}>
        <MagneticWrapper strength={0.05} className='relative w-full h-full p-6 bg-linear-180 from-neutral-950 to-[#121212] rounded-2xl border border-neutral-800'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center gap-0.5 border-b border-neutral-800 pb-3'>
                    <Icon size={36} />
                    <h1 className='font-mono font-bold text-[30px]'>{g.name}</h1>
                </div>
                <p className='font-body'>{g.description}</p>
            </div>
            <div
                ref={borderRef}
                className="absolute inset-0 rounded-xl border opacity-0 pointer-events-none border-amber-47"
            />
        </MagneticWrapper>
        </div>
    )
}

export default ToolPageGuarantee
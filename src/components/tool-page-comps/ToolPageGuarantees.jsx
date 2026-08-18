import React, { useRef } from 'react'
import { Lock, FastForward, Laugh } from 'lucide-react'
import MagneticWrapper from '../MagneticWrapper'
import gsap from 'gsap'
import ToolPageGuarantee from './ToolPageGuarantee'

const ToolPageGuarantees = () => {

    const glowRef = useRef(null)
    const headingRef = useRef(null)

    const guarantees = [
        {
            name: 'Secure',
            description: 'We never store or keep your files. All processing takes place on RAM.',
            icon: Lock
        },
        {
            name: 'Quick',
            description: 'We use only the fastest processing engines that prepare your files in seconds.',
            icon: FastForward,
        },
        {
            name: 'Easy',
            description: 'Our tools are easy to use with user first UI design.',
            icon: Laugh,
        }
    ]

    const handleHover = () => {
        gsap.to(glowRef.current, {
            opacity: '25%',
            duration: 0.4
        })
    }

    const handleHoverLeave = () => {
        gsap.to(glowRef.current, {
            opacity: 0,
            duration: 0.4
        })
    }

    const handleHeadingChange = () => {
        gsap.to(headingRef.current, {
            color: '#e5e5e5',
            duration: 0.4
        })
    }

    const handleHeadingRevert = () => {
        gsap.to(headingRef.current, {
            color: '#e8a33d',
            duration: 0.4
        })
    }

    return (
        <div className='hidden md:flex flex-col items-center gap-5 mb-12 bg-black w-full p-6 py-12 rounded-2xl border border-neutral-800'>
            <div className='w-fit h-fit relative flex items-center justify-center' onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>
                <h1 className='font-mono font-bold text-2xl text-amber-47' ref={headingRef}>Why choose Darkroom?</h1>
                <div className='absolute inset-0 opacity-0 blur-lg rounded-full bg-amber-47' ref={glowRef} />
            </div>
            <div className='flex justify-center gap-4 w-fit' onMouseEnter={handleHeadingChange} onMouseLeave={handleHeadingRevert}>
                {guarantees.map((g, idx) => {
                    const Icon = g.icon
                    return (
                        <ToolPageGuarantee g={g} key={idx} />
                    )
                })}
            </div>
        </div>
    )
}

export default ToolPageGuarantees
import React, { useRef, useState } from 'react'
import { Image, Scale } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Hero = () => {

    const glowRef = useRef(null)
    const iconRef= useRef(null)
    const [mouseEnter, setMouseEnter] = useState(false)

    useGSAP(() => {
        if (mouseEnter) {
            gsap.to(glowRef.current, {
                opacity: "40%",
                duration: 0.4,
            })
            gsap.to(iconRef.current, {
                scale: 1.05,
                duration: 0.4,
                ease: "power2.out"
            })
        }
        if (!mouseEnter) {
            gsap.to(glowRef.current, {
                opacity: 0,
                duration: 0.4,
            })
            gsap.to(iconRef.current, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            })
        }
        
    }, { dependencies: [mouseEnter] })

    return (
        <>
        <div className='flex justify-between mb-9'>
            <div>
                <p className='font-mono text-amber-47 text-sm pb-4'>safe | fast | efficient</p>
                <h1 className='font-zilla text-6xl leading-14 tracking-wide'>Your Private<br />Image Editing Toolkit</h1>
                <p className='font-body text-md pt-4'>Quick edits are supposed to be quick.</p>
            </div>
            <div>
                <div className='relative flex items-center justify-center mr-15 w-48 h-48' onMouseEnter={() => {setMouseEnter(true)}} onMouseLeave={() => {setMouseEnter(false)}}>
                    <div className='absolute inset-0 bg-amber-47 opacity-0 blur-xl rounded-full z-0' ref={glowRef} />
                    <Image color='#e8a33d' size={200} className='z-10' ref={iconRef} />
                </div>
            </div>
        </div>
        <div className='border-b border-neutral-400 w-full mb-9' />
        </>
    )
}

export default Hero
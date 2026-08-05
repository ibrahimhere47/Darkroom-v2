import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Image } from 'lucide-react'

const HeroIcon = () => {

    const glowRef = useRef(null)
    const iconRef= useRef(null)
    const [mouseEnter, setMouseEnter] = useState(false)

    //Icon Animation
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
        } else {
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
        <div className='relative flex items-center justify-center mr-15 w-48 h-48' onMouseEnter={() => {setMouseEnter(true)}} onMouseLeave={() => {setMouseEnter(false)}}>
            <div className='absolute inset-0 bg-amber-47 opacity-0 blur-xl rounded-full z-0' ref={glowRef} />
            <Image color='#e8a33d' size={200} className='z-10' ref={iconRef} />
        </div>
        </>
    )
}

export default HeroIcon
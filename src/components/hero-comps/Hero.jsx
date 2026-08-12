import React, { useRef, useState } from 'react'
import HeroTitle from './HeroTitle'
import HeroIcon from './HeroIcon'
import gsap from 'gsap'
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const Hero = () => {

    const captionRef = useRef(null);

    const handleCaptionHover = () => {
        gsap.to(captionRef.current, {
            duration: 0.8,
            overwrite: "auto",
            scrambleText: {
                text: "safe | fast | efficient",
                chars: "upperAndLowerCase",
                revealDelay: 0.1,
                speed: 0.4,
            },
            ease: "none",
        });
    };

    return (
        <>
        <div className='flex justify-center cursor-default'>
            <div className='flex flex-col items-center gap-1'>
                <p 
                className='font-mono text-amber-47 text-sm pb-3 inline-block'
                ref={captionRef}
                onMouseEnter={handleCaptionHover}
                >safe | fast | efficient</p>
                <HeroTitle />
            </div>
        </div>
        </>
    )
}

export default Hero
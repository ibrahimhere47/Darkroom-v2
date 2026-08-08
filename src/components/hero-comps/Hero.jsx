import React, { useRef, useState } from 'react'
import HeroTitle from './HeroTitle'
import HeroIcon from './HeroIcon'
import gsap from 'gsap'
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const Hero = () => {

    const captionRef = useRef(null);
    const subtitleRef = useRef(null);

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

    const handleSubtitleHover = () => {
        gsap.to(subtitleRef.current, {
            duration: 1,
            overwrite: "auto",
            scrambleText: {
                text: "Quick edits are supposed to be quick.",
                chars: "lowerCase",
                revealDelay: 0.1,
                speed: 0.25,
            },
            ease: "none",
        });
    };

    return (
        <>
        <div className='flex justify-between mb-9 cursor-default'>
            <div>

                <p 
                className='font-mono text-amber-47 text-sm pb-4 inline-block'
                ref={captionRef}
                onMouseEnter={handleCaptionHover}
                >safe | fast | efficient</p>

                <HeroTitle />

                <p
                ref={subtitleRef}
                className="font-body text-md pt-4 inline-block"
                onMouseEnter={handleSubtitleHover}
                >Quick edits are supposed to be quick.
                </p>

            </div>
            <div>
                <HeroIcon />
            </div>
        </div>
        <div className='border-b border-neutral-400 w-full mb-9' />
        </>
    )
}

export default Hero
import React, { useRef } from 'react'
import gsap from 'gsap';
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const GuideHeading = (props) => {

    const headingRef = useRef(null)
    const { text } = props

    const handleHover = () => {
        gsap.to(headingRef.current, {
            duration: 0.8,
            overwrite: "auto",
            scrambleText: {
                text: text,
                chars: "upperAndLowerCase",
                revealDelay: 0.1,
                speed: 0.3,
            },
            ease: "none",
        });
    }

    return (
        <h1 className='text-4xl font-fraunces' ref={headingRef} onMouseEnter={handleHover}>{text}</h1>
    )
}

export default GuideHeading
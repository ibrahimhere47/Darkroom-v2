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
            y: -5,
            ease: "power3.out",
        });
    }

    const handleHoverLeave = () => {
        gsap.to(headingRef.current, {
            duration: 0.8,
            y: 0,
            ease: "power1.out",
        });
    }

    return (
        <h1 className='text-4xl font-fraunces' ref={headingRef} onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>{text}</h1>
    )
}

export default GuideHeading
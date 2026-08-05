import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Image } from 'lucide-react'

const HeroIcon = () => {

    const containerRef = useRef(null);
    const iconRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x - rect.width / 2) / rect.width) * 30;
        const rotateX = -((y - rect.height / 2) / rect.height) * 30;

        gsap.to(iconRef.current, {
            rotateX,
            rotateY,
            transformPerspective: 800,
            transformOrigin: "center",
            duration: 0.4,
            ease: "power2.out",
        });
    };
    
    const handleMouseLeave = () => {
        gsap.to(iconRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
        });
    };

    return (
        <>
        <div
            ref={containerRef}
            className="relative flex items-center justify-center mr-15 w-48 h-48"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Image ref={iconRef} color="#e8a33d" size={200}/>
        </div>
        </>
    )
}

export default HeroIcon
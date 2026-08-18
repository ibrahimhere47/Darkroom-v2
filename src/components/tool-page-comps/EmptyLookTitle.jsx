import React, { useRef } from "react";
import gsap from "gsap";

const EmptyLookTitle = ({ title }) => {
    const titleRef = useRef(null);

    const handleMouseMove = (e) => {
        const words = titleRef.current.querySelectorAll(".hero-word");

        words.forEach((word) => {
            const rect = word.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // Maximum distance that affects the word
            const maxDistance = 250;

            // 0 -> 1 strength
            const strength = Math.max(0, 1 - distance / maxDistance);

            gsap.to(word, {
                x: dx * 0.12 * strength,
                y: dy * 0.12 * strength,
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
            });
        });
    };

    const handleMouseLeave = () => {
        const words = titleRef.current.querySelectorAll(".hero-word");

        gsap.to(words, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.45)",
            stagger: 0.02,
        });
    };

    return (
        <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl font-zilla flex flex-wrap justify-center gap-x-3 gap-y-1 leading-8 md:leading-10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">    
                <span className="hero-word inline-block">Drag</span>{" "}
                <span className="hero-word inline-block">or</span>{" "}
                <span className="hero-word inline-block">Browse</span>{" "}
                <span className="hero-word inline-block">Files</span>{" "}
                <span className="hero-word inline-block">to</span>{" "}
                <span className="hero-word inline-block">{title}</span>
            </div>
        </h1>
    );
};

export default EmptyLookTitle
import React, { useRef } from "react";
import gsap from "gsap";

const HeroTitle = () => {
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
            className="font-fraunces text-2xl -my-4 font-semibold md:text-4xl leading-8 md:leading-14 cursor-default"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">    
                <span className="hero-word inline-block">Your</span>{" "}
                <span className="hero-word inline-block">Private</span>{" "}
                <span className="hero-word inline-block">Image</span>{" "}
                <span className="hero-word inline-block">Editing</span>{" "}
                <span className="hero-word inline-block">Toolkit</span>
            </div>
        </h1>
    );
};

export default HeroTitle;
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ToolCard = (props) => {
    
    const tool = props.tool;
    const Icon = tool.icon;
    const glowRef = useRef([]);
    const borderRef = useRef(null);
    const cardRef = useRef(null)
    const tl = useRef(null)
    const [mouseEnter, setMouseEnter] = useState(false);

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true });
        if (!tool.comingSoon) {
            tl.current
            .to(glowRef.current, {
                opacity: 0.3,
                duration: 0.4
            }, 0)
            .to(borderRef.current, {
                autoAlpha: 1,
                boxShadow: "0 0 16px rgba(232, 163, 61, .5)",
                duration: 0.4
            }, 0);
        }
        else {
            tl.current
            .to(glowRef.current, {
                opacity: 0.3,
                duration: 0.4,
                backgroundColor: "#d09235",
            }, 0)
            .to(borderRef.current, {
                autoAlpha: 1,
                boxShadow: "0 0 16px rgba(208, 146, 53, .5)",
                duration: 0.4
            }, 0);
        }
    }, []);

    useGSAP(() => {
        mouseEnter ? tl.current.play() : tl.current.reverse();

        // HANDLE MAGNETIC RETURN
        if (!mouseEnter) {
            gsap.to(cardRef.current, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.45)",
            });
        }

    }, { dependencies: [mouseEnter] });

    const handleMouseMove = (e) => {
        if (!tool.comingSoon) {
            const card = e.currentTarget.getBoundingClientRect();
            const centerX = card.left + card.width / 2
            const centerY = card.top + card.height / 2
            const x = e.clientX - centerX
            const y = e.clientY - centerY
            const moveX = x / 10
            const moveY = y / 10

            gsap.to(cardRef.current, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }

    const content = (
        <div className='relative' ref={cardRef}>
            <div className='absolute inset-0 rounded-xl border border-amber-47 opacity-0 pointer-events-none' ref={borderRef} />
            <div className='flex flex-col gap-2 bg-neutral-700 rounded-xl p-3 flex-1 min-h-40 border-amber-47' onMouseEnter={() => {setMouseEnter(true)}} onMouseLeave={() => {setMouseEnter(false)}} onMouseMove={handleMouseMove}>
                <div className='flex justify-between items-center'>
                    <div>
                        <div className='relative flex items-center justify-center w-9 h-9'>
                            <div className='absolute inset-0 bg-amber-47 opacity-0 blur-lg rounded-full' ref={(elem) => (glowRef.current[0] = elem)}></div>
                            <Icon color="#e8a33d" className="relative z-10" />
                        </div>
                    </div>
                    <div className='mr-1.5'>
                        <div className='relative flex items-center justify-center w-9 h-9'>
                            <div className={`absolute inset-0 opacity-0 blur-lg rounded-full ${tool.comingSoon ? 'bg-badge-grey' : 'bg-success'}`} ref={(elem) => (glowRef.current[1] = elem)}></div>
                            <span className={`badge ${tool.comingSoon ? 'badge-soon' : 'badge-ready'}`}>
                                {tool.comingSoon ? 'Soon' : 'Ready'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-0.5 ${tool.comingSoon ? 'text-neutral-300' : 'text-white'}`}>
                    <h3 className='bold text-lg font-mono font-bold'>{tool.name}</h3>
                    <p className='line-clamp-2 font-body tracking-normal leading-5 text-sm'>{tool.tagline}</p>
                </div>
            </div>
        </div>
    )

    if (tool.comingSoon == true) {
        return (
            <div className='flex cursor-default'>
                {content}
            </div>
        )
    }

    return (
        <Link to={`/tools/${tool.id}`} className='flex cursor-pointer'>
            {content}
        </Link>
    )
}

export default ToolCard
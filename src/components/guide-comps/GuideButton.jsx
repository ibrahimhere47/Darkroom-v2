import React, { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'

const GuideButton = () => {
    const { toolId } = useParams()
    const borderRef = useRef(null)
    const linkRef = useRef(null)

    const handleHover = () => {
        gsap.to(borderRef.current, {
            opacity: "100%", boxShadow: '0 0 16px #e8a33d', duration: 0.4
        })
        gsap.to(linkRef.current, {
            y: -6, duration: 0.4
        })
    }

    const handleHoverRevert = () => {
        gsap.to(borderRef.current, {
            opacity: "0%", boxShadow: 'none', duration: 0.4, delay: 0.1,
        })
        gsap.to(linkRef.current, {
            y: 0, duration: 0.3
        })
    }

    return (
        <Link to={`/guides/${toolId}`} onMouseEnter={handleHover} onMouseLeave={handleHoverRevert}>
            <div className='relative flex p-8 rounded-2xl bg-linear-90 from-[#0b0b0b] to-neutral-950 border border-neutral-800 text-neutral-200 w-full justify-self-center mt-4' ref={linkRef}>
                <div
                    ref={borderRef}
                    className="absolute inset-0 rounded-xl border opacity-0 pointer-events-none border-amber-dim"
                />
                <div className='w-1/2 flex flex-col gap-2'>
                    <h1 className='font-mono font-bold text-xl'>See how it works</h1>
                    <p className='font-body text-base leading-5.5'>Check out our extensive guide on exactly how to use this tool like a pro. Find out how the tool works and our behind the scene processes to make this tool come to life. Stuck? Click here.</p>
                    <ArrowUpRight />
                </div>
            </div>
        </Link>
    )
}

export default GuideButton
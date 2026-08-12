import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ToolCard = (props) => {
    const { tool } = props

    const Icon = tool.icon
    const color = `var(${tool.categoryColor})`

    const iconGlowRef = useRef(null)
    const iconRef = useRef(null)
    const badgeGlowRef = useRef(null)
    const borderRef = useRef(null)
    const cardRef = useRef(null)
    const headingRef = useRef(null)
    const tl = useRef(null)

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })

        tl.current
            .to(iconGlowRef.current, {
                opacity: 0.3,
                duration: 0.4,
            }, 0)

            .to(iconRef.current, {
                color: color,
                duration: 0.4,
            }, 0)

            .to(borderRef.current, {
                autoAlpha: 1,
                boxShadow: `0 0 16px ${color}`,
                duration: 0.4,
            }, 0)

            .to(badgeGlowRef.current, {
                opacity: 0.3,
                duration: 0.4,
            }, 0)

            .to(headingRef.current, {
                backgroundColor: color,
                border: 'none',
                duration: 0.4,
            }, 0)
    }, [])

    const handleMouseEnter = () => {
        tl.current?.play()
    }

    const handleMouseLeave = () => {
        tl.current?.reverse()

        gsap.to(cardRef.current, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.45)',
        })
    }

    const handleMouseMove = (e) => {
        if (tool.comingSoon) return

        const card = e.currentTarget.getBoundingClientRect()

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
            ease: 'power2.out',
            overwrite: true,
        })
    }

    const content = (
        <div
            className="relative"
            ref={cardRef}
        >
            {/* Animated category border */}
            <div
                ref={borderRef}
                className="absolute inset-0 rounded-xl border opacity-0 pointer-events-none"
                style={{
                    borderColor: color,
                }}
            />

            {/* Card */}
            <div
                className="flex flex-col gap-2 bg-neutral-800 rounded-xl p-3 flex-1 min-h-40"
                style={{
                    borderColor: color,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                {/* Top row */}
                <div className="flex justify-between items-center">

                    {/* Tool icon */}
                    <div>
                        <div className="relative flex items-center justify-center w-9 h-9">

                            <div
                                ref={iconGlowRef}
                                className="absolute inset-0 opacity-0 blur-lg rounded-full bg-amber-47"
                                style={{
                                    backgroundColor: color,
                                }}
                            />

                            <Icon
                                ref={iconRef}
                                className="relative z-10"
                                color={color}
                            />
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className="mr-1.5">
                        <div className="relative flex items-center justify-center w-9 h-9">

                            <div
                                ref={badgeGlowRef}
                                className={`absolute inset-0 opacity-0 blur-lg rounded-full ${
                                    tool.comingSoon
                                        ? 'bg-badge-grey'
                                        : 'bg-success'
                                }`}
                            />

                            <span
                                className={`badge ${
                                    tool.comingSoon
                                        ? 'badge-soon'
                                        : 'badge-ready'
                                }`}
                            >
                                {tool.comingSoon ? 'Soon' : 'Ready'}
                            </span>

                        </div>
                    </div>
                </div>

                {/* Text */}
                <div
                    className={`flex flex-col gap-0.5 ${
                        tool.comingSoon
                            ? 'text-neutral-300'
                            : 'text-white'
                    }`}
                >
                    <h3 className={`text-2xl font-fraunces font-semibold w-fit px-2 rounded-2xl`}
                        ref={headingRef}
                    >
                        {tool.name}
                    </h3>

                    <p className="line-clamp-3 font-body tracking-normal leading-5 text-[12px] pl-2">
                        {tool.tagline}
                    </p>
                </div>
            </div>
        </div>
    )

    if (tool.comingSoon) {
        return (
            <div className="flex cursor-default">
                {content}
            </div>
        )
    }

    return (
        <Link
            to={`/tools/${tool.id}`}
            className="flex cursor-pointer"
        >
            {content}
        </Link>
    )
}

export default ToolCard
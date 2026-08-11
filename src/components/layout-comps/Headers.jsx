import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import HeaderToolMenu from './HeaderToolMenu'

gsap.registerPlugin(ScrollTrigger)

const Headers = () => {
    const headerRef = useRef(null)
    const header2Ref = useRef(null)

    useEffect(() => {
        const header = headerRef.current
        const header2 = header2Ref.current
        if (!header || !header2) return

        // explicit starting state — header2 starts off-screen via transform, not display:none
        gsap.set(header, { yPercent: 0 })
        gsap.set(header2, { yPercent: -200 })

        const showHeader = () => gsap.to(header, { yPercent: 0, duration: 0.3, ease: 'power2.out' })
        const hideHeader = () => gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power2.out' })
        const showHeader2 = () => gsap.to(header2, { yPercent: 0, duration: 0.3, ease: 'power2.out' })
        const hideHeader2 = () => gsap.to(header2, { yPercent: -200, duration: 0.3, ease: 'power2.out' })

        const trigger = ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                if (self.scroll() < 300) {
                    showHeader()
                    hideHeader2()
                } else if (self.direction === -1) {
                    showHeader2()
                    hideHeader()
                } else if (self.direction === 1) {
                    hideHeader()
                    hideHeader2()
                }
            },
        })

        return () => trigger.kill()
    }, [])

    return (
        <div className='relative'>
            <header
                ref={headerRef}
                className='absolute inset-x-0 top-0 z-50 bg-neutral-800 flex items-baseline justify-between py-9 mx-8 border-b-neutral-400 border-b'
            >
                <Link to='/' className='no-underline flex items-center gap-1 font-body'>
                    <span className='bg-amber-47 w-3 h-3 rounded-full'></span>
                    <span>Darkroom</span>
                </Link>
                <HeaderToolMenu />
            </header>
            <header
                ref={header2Ref}
                className='fixed inset-x-0 top-0 z-40 bg-neutral-950 flex items-baseline justify-center py-6 px-8 mx-8 mt-6 border border-neutral-400 rounded-4xl shadow-2xl shadow-neutral-950'
            >
                <Link to='/' className='no-underline flex items-center gap-1 font-body'>
                    <span className='bg-amber-47 w-3 h-3 rounded-full'></span>
                    <span>Darkroom</span>
                </Link>
                <HeaderToolMenu />
            </header>
        </div>
    )
}

export default Headers
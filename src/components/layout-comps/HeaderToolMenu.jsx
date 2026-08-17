import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { CATEGORIES } from '../../tools/toolsRegistry.js'

const HeaderToolMenu = () => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const panelRef = useRef(null)
    const closeTimer = useRef(null)
    const arrowRef = useRef(null)
    const categories = CATEGORIES.filter(c => c.name !== 'All')

    useLayoutEffect(() => {
        if (!open) return
        const wrapper = wrapperRef.current
        const panel = panelRef.current
        if (!wrapper || !panel) return

        const positionPanel = () => {
            const margin = 16
            const wrapperRect = wrapper.getBoundingClientRect()
            const panelWidth = panel.offsetWidth
            const triggerCenter = wrapperRect.left + wrapperRect.width / 2

            let desiredLeft = triggerCenter - panelWidth / 2
            desiredLeft = Math.max(margin, Math.min(desiredLeft, window.innerWidth - panelWidth - margin))

            const offsetFromWrapper = desiredLeft - wrapperRect.left
            panel.style.left = `${offsetFromWrapper}px`
        }

        positionPanel()
        window.addEventListener('resize', positionPanel)
        return () => window.removeEventListener('resize', positionPanel)
    }, [open])

    useEffect(() => {
        if (!panelRef.current) return
        if (open) {
            gsap.to(panelRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.25,
                ease: 'power2.out',
                pointerEvents: 'auto',
            })
            gsap.to(arrowRef.current, { rotate: 180 })
        } else {
            gsap.to(panelRef.current, {
                autoAlpha: 0,
                y: -8,
                duration: 0.2,
                ease: 'power2.in',
                pointerEvents: 'none',
            })
            gsap.to(arrowRef.current, { rotate: 0 })
        }
    }, [open])

    const scheduleClose = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 150)
    }
    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
    }

    return (
        <div
            ref={wrapperRef}
            className='relative'
            onMouseEnter={() => { cancelClose(); setOpen(true) }}
            onMouseLeave={scheduleClose}
            onClick={scheduleClose}
        >
            <button className='mono font-bold text-lg hover:text-neutral-300 transition-colors flex items-center'>
                <ChevronDown ref={arrowRef} size={30} />
            </button>

            <div
                ref={panelRef}
                className='absolute top-full mt-4 w-[90vw] bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl shadow-neutral-950 opacity-0 invisible'
                style={{ pointerEvents: 'none' }}
            >
                <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
                    {categories.map((category) => (
                        <div key={category.name}>
                            <p className='mono text-sm text-neutral-500 mb-2 uppercase tracking-widest'>
                                {category.name}
                            </p>
                            <ul className='flex flex-col gap-1'>
                                {category.tools.map((tool) => (
                                    <li key={tool.id} className='flex items-center-safe gap-1'>
                                        <tool.icon size={20} className='text-amber-47' />
                                        <Link
                                            to={`/tools/${tool.id}`}
                                            className='no-underline text-[17px] font-body text-neutral-200 hover:text-amber-47 transition-colors'
                                            onClick={() => setOpen(false)}
                                        >
                                            {tool.name ?? tool.id}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeaderToolMenu
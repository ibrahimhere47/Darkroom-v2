// ToolsMenu.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { tools } from '../../tools/toolsRegistry'

const CATEGORIES = [
    { name: 'Optimize', tools: tools.filter(t => ['compress', 'remove-background', 'upscale'].includes(t.id)) },
    { name: 'Edit', tools: tools.filter(t => ['add-background', 'remove-background', 'add-text', 'remove-text', 'add-border', 'doodle'].includes(t.id)) },
    { name: 'Properties', tools: tools.filter(t => ['convert', 'resize', 'rotate', 'round-corners'].includes(t.id)) },
    { name: 'Effects', tools: tools.filter(t => ['add-filter', 'color-correction'].includes(t.id)) },
    { name: 'Security', tools: tools.filter(t => ['watermark', 'remove-watermark'].includes(t.id)) },
]

const HeaderToolMenu = () => {
    const [open, setOpen] = useState(false)
    const panelRef = useRef(null)
    const closeTimer = useRef(null)

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
        } else {
            gsap.to(panelRef.current, {
                autoAlpha: 0,
                y: -8,
                duration: 0.2,
                ease: 'power2.in',
                pointerEvents: 'none',
            })
        }
    }, [open])

    // Delay closing so moving from trigger -> panel doesn't close it mid-transit
    const scheduleClose = () => {
        closeTimer.current = setTimeout(() => setOpen(false), 150)
    }
    const cancelClose = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
    }

    return (
        <div
            className='relative'
            onMouseEnter={() => { cancelClose(); setOpen(true) }}
            onMouseLeave={scheduleClose}
        >
            <button className='mono text-sm hover:text-neutral-300 transition-colors'>
                Tools
            </button>

            <div
                ref={panelRef}
                className='absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[min(90vw,720px)] bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl shadow-neutral-950 opacity-0 invisible'
                style={{ pointerEvents: 'none' }}
            >
                <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                    {CATEGORIES.map((category) => (
                        <div key={category.name}>
                            <p className='mono text-xs text-neutral-500 mb-2 uppercase tracking-wide'>
                                {category.name}
                            </p>
                            <ul className='flex flex-col gap-1'>
                                {category.tools.map((tool) => (
                                    <li key={tool.id}>
                                        <Link
                                            to={`/tools/${tool.id}`}
                                            className='no-underline text-sm text-neutral-200 hover:text-amber-47 transition-colors'
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
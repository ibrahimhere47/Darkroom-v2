// ToolsMenu.jsx
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

const HeaderToolMenu = (props) => {

    const { CATEGORIES } = props
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
                className='absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[90vw] bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl shadow-neutral-950 opacity-0 invisible'
                style={{ pointerEvents: 'none' }}
            >
                <div className='grid grid-cols-3 md:grid-cols-5 gap-6'>
                    {CATEGORIES.map((category) => (
                        <div key={category.name}>
                            <p className='mono text-sm text-neutral-500 mb-2 uppercase tracking-widest'>
                                {category.name}
                            </p>
                            <ul className='flex flex-col gap-1'>
                                {category.tools.map((tool) => (
                                    <li key={tool.id} className='flex items-center gap-1'>
                                        <tool.icon size={20} className='text-amber-47' />
                                        <Link
                                            to={`/tools/${tool.id}`}
                                            className='no-underline text-md font-body text-neutral-200 hover:text-amber-47 transition-colors'
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
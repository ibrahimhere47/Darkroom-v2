import React, { useRef } from 'react'
import { X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Popup = ({
    isOpen,
    onClose,
    title,
    description,
    children,
}) => {
    const overlayRef = useRef(null)
    const popupRef = useRef(null)

    useGSAP(() => {
        if (!isOpen) return

        gsap.fromTo(
            overlayRef.current,
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
            }
        )

        gsap.fromTo(
            popupRef.current,
            {
                opacity: 0,
                y: 20,
                scale: 0.95,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.35,
                ease: 'power3.out',
            }
        )
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            ref={overlayRef}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4'
            onClick={onClose}
        >
            <div
                ref={popupRef}
                className='relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-2xl'
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className='absolute right-4 top-4 rounded-lg p-2 text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors'
                >
                    <X size={18} />
                </button>

                <div className='pr-8'>
                    <h2 className='font-zilla text-3xl text-white'>
                        {title}
                    </h2>

                    <p className='mt-2 font-mono text-sm leading-relaxed text-neutral-400'>
                        {description}
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Popup
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/** Outer w-85 panel every tool's sidebar lives in. */
const SidebarPanel = ({ children }) => (
    <div className='w-full lg:w-85 shrink-0 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between'>
        {children}
    </div>
)

/** Eyebrow label + optional description + divider, used at the top of every sidebar state. */
const SidebarSection = ({ eyebrow, description, children }) => (
    <div className='flex flex-col gap-3'>
        <div>
            <p className='text-sm tracking-widest text-neutral-400 uppercase mb-1'>{eyebrow}</p>
            {description && <p className='text-sm text-neutral-300'>{description}</p>}
        </div>
        {children}
        <div className='border-b border-b-neutral-600' />
    </div>
)

/** Big headline stat, e.g. "42% smaller". */
const StatHighlight = ({ value, label }) => (
    <div className='flex flex-col gap-1'>
        <span className='text-5xl font-semibold text-amber-47 leading-none font-body'>{value}</span>
        <span className='text-xs tracking-widest text-neutral-500 uppercase'>{label}</span>
    </div>
)

/**
 * Animated fill bar (e.g. compressed-vs-original size) with optional
 * left/right captions underneath. `animateKey` should change whenever the
 * bar should replay its fill animation (e.g. when results first appear).
 */
const ProgressBar = ({ ratio, leftLabel, rightLabel, animateKey }) => {
    const fillRef = useRef(null)

    useGSAP(() => {
        if (fillRef.current) {
            gsap.fromTo(
                fillRef.current,
                { width: '0%' },
                { width: `${Math.min(Math.max(ratio, 0), 1) * 100}%`, duration: 0.8, ease: 'power3.out', delay: 0.15 }
            )
        }
    }, [animateKey])

    return (
        <div>
            <div className='w-full h-3 rounded-full bg-neutral-800 overflow-hidden'>
                <div ref={fillRef} className='h-full rounded-full bg-amber-47' style={{ width: 0 }} />
            </div>
            {(leftLabel || rightLabel) && (
                <div className='flex justify-between text-[11px] text-neutral-500 mt-2'>
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
            )}
        </div>
    )
}

/** One label/value line, e.g. "Original size ... 4.2 MB". */
const StatRow = ({ label, value, highlight }) => (
    <div className='flex justify-between'>
        <span>{label}</span>
        <span className={highlight ? 'text-amber-47' : 'text-neutral-300'}>{value}</span>
    </div>
)

/** A stack of StatRows. */
const StatRowList = ({ rows }) => (
    <div className='flex flex-col gap-2 text-[11px] text-neutral-500'>
        {rows.map((row, idx) => (
            <StatRow key={idx} {...row} />
        ))}
    </div>
)

export {
    SidebarPanel,
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRow,
    StatRowList,
}
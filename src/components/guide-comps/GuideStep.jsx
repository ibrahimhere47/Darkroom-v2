import React from 'react'
import GuideHeading from './GuideHeading'
import GuideBody from './GuideBody'

// A numbered step card. `reverse` flips the media to the left on wide screens
// so a multi-step list doesn't read as a single monotonous column.
const GuideStep = ({ number, title, body, reverse, children }) => (
    <section className='relative flex flex-col lg:flex-row lg:items-center gap-8 rounded-2xl border border-neutral-800 bg-linear-90 from-[#0b0b0b] to-neutral-950 p-6 sm:p-10'>
        <div className={`flex-1 flex flex-col gap-4 ${reverse ? 'lg:order-2' : ''}`}>
            <div className='flex items-center gap-4'>
                <span className='flex items-center justify-center w-9 h-9 shrink-0 rounded-full border border-amber-47 font-mono text-sm text-amber-47'>
                    {number}
                </span>
                <GuideHeading text={title} />
            </div>
            <GuideBody text={body} />
        </div>

        {children && (
            <div className={`flex-1 rounded-xl overflow-hidden border border-neutral-800 ${reverse ? 'lg:order-1' : ''}`}>
                {children}
            </div>
        )}
    </section>
)

export default GuideStep
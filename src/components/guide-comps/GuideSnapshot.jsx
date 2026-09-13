import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import { getTool } from '../../tools/toolsRegistry'

const GuideSnapshot = () => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    const steps = tool?.guideSteps

    if (!Array.isArray(steps) || steps.length === 0) return null

    const heading = tool.guideSnapshotHeading || `How to ${tool.name}`
    const summary = tool.guideSnapshotSummary || tool.tagline
    const headingId = `guide-snapshot-heading-${tool.id}`

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: heading,
        description: summary,
        step: steps.map((step) => ({
            '@type': 'HowToStep',
            name: step.title,
            text: step.description,
        })),
    }

    return (
        <section
            aria-labelledby={headingId}
            className='w-full rounded-2xl border border-neutral-800 bg-linear-90 from-[#0c0c0c] to-neutral-950 p-6 sm:p-8 flex flex-col gap-8'
        >
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between sm:items-center gap-6'>
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-1.5 text-amber-47'>
                        <BookOpen size={15} strokeWidth={2} />
                        <span className='font-mono text-sm tracking-widest uppercase'>Guide</span>
                    </div>
                    <h2 id={headingId} className='font-mono font-bold text-[20px] text-neutral-100'>
                        {heading}
                    </h2>
                    {summary && (
                        <p className='font-body text-[18px] text-neutral-400 leading-5 max-w-md'>
                            {summary}
                        </p>
                    )}
                </div>

                <Link
                    to={`/guides/${toolId}`}
                    className='group flex items-center gap-1.5 shrink-0 w-fit rounded-full border border-neutral-700 px-4 py-2 font-mono text-sm text-neutral-200 hover:border-amber-47 hover:text-amber-47 transition-colors duration-300'
                >
                    Read full guide
                    <ArrowUpRight
                        size={16}
                        className='transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                    />
                </Link>
            </div>

            <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8'>
                {steps.map((step, index) => (
                    <li
                        key={step.title}
                        className={`flex flex-col gap-2 ${index !== 0 ? 'lg:border-l lg:border-neutral-800 lg:pl-6' : ''}`}
                    >
                        <span className='font-mono text-3xl font-bold text-amber-47'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className='font-body text-xl font-bold text-neutral-100 leading-5'>
                            {step.title}
                        </span>
                        <span className='font-body text-lg text-neutral-400 leading-5'>
                            {step.description}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    )
}

export default GuideSnapshot
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
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
            className='w-full rounded-2xl border border-neutral-800 bg-linear-90 from-[#0b0b0b] to-neutral-950 p-6 sm:p-8 flex flex-col gap-6'
        >
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            <div className='flex flex-col gap-2'>
                <h2 id={headingId} className='font-mono font-bold text-lg text-neutral-200'>
                    {heading}
                </h2>
                {summary && (
                    <p className='font-body text-sm text-neutral-400 leading-5'>{summary}</p>
                )}
            </div>

            <ol className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                {steps.map((step, index) => (
                    <li key={step.title} className='flex flex-col gap-1.5'>
                        <span className='font-mono text-sm text-amber-47'>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className='font-body text-sm font-bold text-neutral-200 leading-5'>
                            {step.title}
                        </span>
                        <span className='font-body text-sm text-neutral-400 leading-5'>
                            {step.description}
                        </span>
                    </li>
                ))}
            </ol>

            <Link
                to={`/guides/${toolId}`}
                className='flex items-center gap-1 font-mono text-sm text-amber-47 hover:opacity-80 transition-opacity duration-300 w-fit'
            >
                Read the full {tool.name} guide
                <ArrowUpRight size={16} />
            </Link>
        </section>
    )
}

export default GuideSnapshot
import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Remove the Background from an Image | Guide'
const PAGE_DESCRIPTION =
    'Learn how to automatically remove the background from an image and export it with transparency.'

// Sets <title> and the meta description tag for SEO, since this app
// doesn't currently use react-helmet or a similar head-management library.
const useSeoMeta = ({ title, description }) => {
    useEffect(() => {
        const previousTitle = document.title
        document.title = title

        let metaDescription = document.querySelector('meta[name="description"]')
        const createdMeta = !metaDescription

        if (!metaDescription) {
            metaDescription = document.createElement('meta')
            metaDescription.setAttribute('name', 'description')
            document.head.appendChild(metaDescription)
        }

        const previousDescription = metaDescription.getAttribute('content')
        metaDescription.setAttribute('content', description)

        return () => {
            document.title = previousTitle
            if (createdMeta) {
                metaDescription.remove()
            } else if (previousDescription !== null) {
                metaDescription.setAttribute('content', previousDescription)
            }
        }
    }, [title, description])
}

// HowTo structured data helps this guide surface as a rich result in search.
const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Remove the Background from an Image',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the photo whose background you want removed.',
        },
        {
            '@type': 'HowToStep',
            name: 'Let the tool detect your subject',
            text: 'Automatic detection separates your subject from its background.',
        },
        {
            '@type': 'HowToStep',
            name: 'Refine the edges',
            text: 'Touch up rough edges around hair or fine details.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export with transparency',
            text: 'Download a PNG with a transparent background.',
        },
    ],
}

const RemoveBackgroundGuide = () => {
    useSeoMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION })

    return (
        <article className='flex flex-col gap-16'>
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>

            {/* Hero */}
            <header className='max-w-3xl mx-auto pt-8 pb-4 flex flex-col gap-6 text-center items-center'>
                <span className='font-mono text-sm tracking-widest uppercase text-amber-47'>
                    Guide
                </span>
                <GuideHeading text='How to Remove a Background' />
                <GuideBody text="Cutting a subject out from its background used to take patience and a steady hand. This tool detects your subject automatically and erases the background for you, leaving a clean transparent layer. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the photo you want to cut out. Images with a clear contrast between subject and background give the cleanest results.'
                >
                    <GuideImage
                        image='/images/guides/remove-background/step-1-upload.jpg'
                        alt='Uploading a photo into the background removal tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Let the Tool Detect Your Subject'
                    body='The tool automatically analyzes your image and identifies the subject to separate it from the background.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/remove-background/step-2-detect-subject.jpg'
                        alt='Automatic subject detection separating a subject from its background'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Refine the Edges'
                    body='Zoom in and touch up any rough edges around hair, fur, or fine details for a cleaner cutout.'
                >
                    <GuideVideo video='/videos/guides/remove-background/step-3-refine-edges.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export with a Transparent Background'
                    body='Download your image as a PNG with a transparent background, ready to drop onto any backdrop you like.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your subject is cut out onto a transparent background." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default RemoveBackgroundGuide
import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Doodle on Your Images | Guide'
const PAGE_DESCRIPTION =
    'Learn how to draw on your images with a variety of brushes, colors, and styles using the doodle tool.'

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
    name: 'How to Doodle on Your Images',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to draw on.',
        },
        {
            '@type': 'HowToStep',
            name: 'Pick a brush and color',
            text: 'Choose from a range of brush styles and colors.',
        },
        {
            '@type': 'HowToStep',
            name: 'Draw on the image',
            text: 'Sketch, highlight, or annotate directly on the canvas.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download your finished, doodled image.',
        },
    ],
}

const DoodleGuide = () => {
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
                <GuideHeading text='How to Doodle on an Image' />
                <GuideBody text="Sometimes an image just needs a personal touch — an arrow, a note, a bit of hand-drawn flair. This tool lets you draw directly onto your photos with a range of brushes and colors. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to draw on.'
                >
                    <GuideImage
                        image='/images/guides/doodle/step-1-upload.jpg'
                        alt='Uploading an image into the doodle tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Pick a Brush and Color'
                    body="Choose from a variety of brush styles and colors to match the look you're going for."
                    reverse
                >
                    <GuideImage
                        image='/images/guides/doodle/step-2-brush-color.jpg'
                        alt='Selecting a brush style and color for doodling'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Draw Directly on the Image'
                    body='Sketch, highlight, or annotate your image freehand, right on the canvas.'
                >
                    <GuideVideo video='/videos/guides/doodle/step-3-draw.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Doodled Image'
                    body="Once you're happy with your doodle, export the finished image."
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your doodle is complete." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default DoodleGuide
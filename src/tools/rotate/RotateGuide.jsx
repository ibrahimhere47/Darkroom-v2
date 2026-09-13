import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Rotate an Image to Any Angle | Guide'
const PAGE_DESCRIPTION =
    'Learn how to rotate an image between portrait and landscape, or spin it to any exact degree you need.'

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
    name: 'How to Rotate an Image to Any Angle',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to rotate.',
        },
        {
            '@type': 'HowToStep',
            name: 'Choose an angle',
            text: 'Quick-rotate by 90 degrees or drag the dial for a custom angle.',
        },
        {
            '@type': 'HowToStep',
            name: 'Preview the result',
            text: 'Check the rotated image and any edge cropping before exporting.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download your image at its new orientation.',
        },
    ],
}

const RotateGuide = () => {
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
                <GuideHeading text='How to Rotate an Image' />
                <GuideBody text="Whether you need to flip a sideways photo, switch between portrait and landscape, or nudge an image by a precise angle, this tool handles it all with a live preview. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to rotate.'
                >
                    <GuideImage
                        image='/images/guides/rotate/step-1-upload.jpg'
                        alt='Uploading an image into the rotate tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Choose a Quick Rotation or Custom Angle'
                    body='Use the 90-degree quick rotate buttons to switch between portrait and landscape, or drag the dial to set any exact angle.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/rotate/step-2-choose-angle.jpg'
                        alt='Choosing a quick rotation or a custom rotation angle'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Preview the Result'
                    body='Check how the rotated image looks, including any cropping needed at the edges, before exporting.'
                >
                    <GuideVideo video='/videos/guides/rotate/step-3-preview.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Rotated Image'
                    body='Download your image at its new orientation, ready to use.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is rotated and ready to go." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default RotateGuide
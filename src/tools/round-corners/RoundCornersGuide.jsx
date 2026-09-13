import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Round the Corners of an Image | Guide'
const PAGE_DESCRIPTION =
    'Learn how to add a border radius to your image corners for a cleaner, more polished look.'

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
    name: 'How to Round the Corners of an Image',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image whose corners you want to round.',
        },
        {
            '@type': 'HowToStep',
            name: 'Set your corner radius',
            text: 'Drag a slider or enter an exact pixel value for the radius.',
        },
        {
            '@type': 'HowToStep',
            name: 'Preview the result',
            text: 'Check the rounded corners in real time before exporting.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download the finished image with rounded corners.',
        },
    ],
}

const RoundCornersGuide = () => {
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
                <GuideHeading text='How to Round Image Corners' />
                <GuideBody text="Rounded corners can make an image feel softer and more polished, whether you're prepping app icons, thumbnails, or social graphics. This tool lets you dial in an exact border radius and export instantly. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to round the corners of.'
                >
                    <GuideImage
                        image='/images/guides/round-corners/step-1-upload.jpg'
                        alt='Uploading an image into the round corners tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Set Your Corner Radius'
                    body='Drag the radius slider or enter an exact pixel value to control how rounded the corners are.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/round-corners/step-2-set-radius.jpg'
                        alt='Setting a corner radius value for an image'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Preview the Result'
                    body='See the rounded corners applied to your image in real time before exporting.'
                >
                    <GuideVideo video='/videos/guides/round-corners/step-3-preview.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Image'
                    body='Download your image with rounded corners, ready to use.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image now has clean, rounded corners." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default RoundCornersGuide
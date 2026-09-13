import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Resize an Image to Exact Dimensions | Guide'
const PAGE_DESCRIPTION =
    'Learn how to fit, crop, or scale an image to exact pixel dimensions in just a few steps.'

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
    name: 'How to Resize an Image to Exact Dimensions',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to resize.',
        },
        {
            '@type': 'HowToStep',
            name: 'Choose fit, crop, or scale',
            text: 'Pick how the image should change to match your target size.',
        },
        {
            '@type': 'HowToStep',
            name: 'Set exact dimensions',
            text: 'Enter a pixel width and height, or choose a common preset.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download the resized image ready to use.',
        },
    ],
}

const ResizeGuide = () => {
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
                <GuideHeading text='How to Resize an Image' />
                <GuideBody text="Whether you need an image to fit a specific pixel size for a website, social post, or print, this tool lets you fit, crop, or scale to exact dimensions in seconds. Here's how it works." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to resize. Higher-resolution source images give you more flexibility if you plan to scale up.'
                >
                    <GuideImage
                        image='/images/guides/resize/step-1-upload.jpg'
                        alt='Uploading an image into the resize tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Choose Fit, Crop, or Scale'
                    body='Pick how you want to change the dimensions: fit resizes proportionally, crop trims to an exact frame, and scale stretches to fill the target size.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/resize/step-2-fit-crop-scale.jpg'
                        alt='Choosing between fit, crop, and scale resize modes'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Set Your Exact Dimensions'
                    body='Enter the width and height you need in pixels, or choose from common presets for social media, print, and web.'
                >
                    <GuideVideo video='/videos/guides/resize/step-3-set-dimensions.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Resized Image'
                    body='Download your resized image, ready to use exactly where you need it.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is resized and ready to go." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default ResizeGuide
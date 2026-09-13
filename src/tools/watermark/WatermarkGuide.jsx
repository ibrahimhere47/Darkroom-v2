import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Add a Watermark to Your Images | Guide'
const PAGE_DESCRIPTION =
    'Learn how to add a text or logo watermark to your images to protect your brand and content.'

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
    name: 'How to Add a Watermark to Your Images',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to protect with a watermark.',
        },
        {
            '@type': 'HowToStep',
            name: 'Add text or a logo',
            text: 'Type in watermark text or upload a logo to use as your mark.',
        },
        {
            '@type': 'HowToStep',
            name: 'Position and adjust opacity',
            text: 'Place the watermark and set how visible it should be.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download the finished, watermarked image.',
        },
    ],
}

const WatermarkGuide = () => {
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
                <GuideHeading text='How to Add a Watermark' />
                <GuideBody text="A watermark helps protect your images and keep your brand visible wherever they're shared. This tool lets you add text or a logo, then position and adjust it exactly how you want. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to protect with a watermark.'
                >
                    <GuideImage
                        image='/images/guides/watermark/step-1-upload.jpg'
                        alt='Uploading an image into the watermark tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Add Your Watermark Text or Logo'
                    body='Type in your watermark text or upload a logo image to use as your mark.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/watermark/step-2-add-mark.jpg'
                        alt='Adding watermark text or a logo to an image'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Position and Adjust Opacity'
                    body="Drag your watermark into place and adjust its opacity so it's visible without overpowering the image."
                >
                    <GuideVideo video='/videos/guides/watermark/step-3-position-opacity.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Watermarked Image'
                    body='Download your finished image with the watermark applied, ready to share securely.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is watermarked and ready to share." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default WatermarkGuide
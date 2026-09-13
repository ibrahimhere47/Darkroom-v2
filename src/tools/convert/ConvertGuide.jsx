import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Convert an Image Between JPEG, PNG, WebP, and AVIF | Guide'
const PAGE_DESCRIPTION =
    'Learn how to convert an image file between JPEG, PNG, WebP, and AVIF formats in a few simple steps.'

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
    name: 'How to Convert an Image Between JPEG, PNG, WebP, and AVIF',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image file you want to convert, in whatever format it is currently saved as.',
        },
        {
            '@type': 'HowToStep',
            name: 'Choose your target format',
            text: 'Select JPEG, PNG, WebP, or AVIF depending on where the image will be used.',
        },
        {
            '@type': 'HowToStep',
            name: 'Preview the converted file',
            text: 'Check the converted preview and estimated file size before committing to the change.',
        },
        {
            '@type': 'HowToStep',
            name: 'Download your new file',
            text: 'Download the converted image, ready to use in its new format.',
        },
    ],
}

const ConvertGuide = () => {
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
                <GuideHeading text='How to Convert an Image Format' />
                <GuideBody text="Different formats suit different needs — JPEG for photos, PNG for transparency, WebP and AVIF for smaller web-friendly files. This tool converts between all of them without any quality guesswork. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image file you want to convert, in whatever format it is currently saved as.'
                >
                    <GuideImage
                        image='/images/guides/convert/step-1-upload.jpg'
                        alt='Uploading an image into the format converter'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Choose Your Target Format'
                    body='Select the format you want to convert to — JPEG, PNG, WebP, or AVIF — depending on where the image will be used.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/convert/step-2-target-format.jpg'
                        alt='Selecting a target image format to convert to'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Preview the Converted File'
                    body='Check the converted preview and estimated file size before committing to the change.'
                >
                    <GuideVideo video='/videos/guides/convert/step-3-preview-conversion.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Download Your New File'
                    body='Download the converted image, ready to use in its new format.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is converted to its new format." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default ConvertGuide
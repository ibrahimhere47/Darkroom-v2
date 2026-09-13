import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Compress an Image Without Losing Quality | Guide'
const PAGE_DESCRIPTION =
    'Learn how to shrink an image file size with a quality slider, then export as JPEG, PNG, or WebP without a noticeable drop in quality.'

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
    name: 'How to Compress an Image Without Losing Quality',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to shrink. Results vary depending on how much fine detail or noise the photo has.',
        },
        {
            '@type': 'HowToStep',
            name: 'Adjust the quality slider',
            text: 'Drag the quality slider to balance file size against visual quality.',
        },
        {
            '@type': 'HowToStep',
            name: 'Preview the size savings',
            text: 'Compare the estimated file size before and after compression in real time.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your format',
            text: 'Export the compressed image as JPEG, PNG, or WebP.',
        },
    ],
}

const CompressGuide = () => {
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
                <GuideHeading text='How to Compress an Image' />
                <GuideBody text="Large image files slow down websites and eat up storage. This tool lets you dial in exactly how much compression to apply with a live quality slider, then export in whichever format works best for you. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Start by uploading the image you want to shrink. Photos with a lot of fine detail or noise compress more visibly than simple graphics, so results will vary by image.'
                >
                    <GuideImage
                        image='/images/guides/compress/step-1-upload.jpg'
                        alt='Uploading an image into the compression tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Adjust the Quality Slider'
                    body="Drag the quality slider to control the trade-off between file size and visual quality. Lower values shrink the file further but introduce more compression artifacts."
                    reverse
                >
                    <GuideImage
                        image='/images/guides/compress/step-2-quality-slider.jpg'
                        alt='Adjusting the quality slider to control compression'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Preview the Size Savings'
                    body="Compare the estimated file size before and after compression in real time, so you can find the smallest file that still looks good to you."
                >
                    <GuideVideo video='/videos/guides/compress/step-3-preview-savings.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export in Your Format'
                    body="Once you're happy with the result, export the compressed image as JPEG, PNG, or WebP depending on where you plan to use it."
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is smaller and ready to use." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default CompressGuide
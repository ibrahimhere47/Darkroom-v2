import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Add Filters to Your Images | Guide'
const PAGE_DESCRIPTION =
    'Learn how to apply aesthetic, retro, vintage, grayscale, and other filters to your images with adjustable intensity.'

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
    name: 'How to Add Filters to Your Images',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the photo you want to stylize.',
        },
        {
            '@type': 'HowToStep',
            name: 'Browse the filter library',
            text: 'Choose from vintage, retro, grayscale, and other aesthetic filters.',
        },
        {
            '@type': 'HowToStep',
            name: 'Adjust filter intensity',
            text: 'Dial the effect from a subtle touch to a full stylistic transformation.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Export your filtered image in your preferred format.',
        },
    ],
}

const AddFilterGuide = () => {
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
                <GuideHeading text='How to Add Filters to an Image' />
                <GuideBody text="A good filter can completely change the mood of a photo — moody and desaturated, warm and vintage, or crisp black-and-white. This tool gives you a library of filters with adjustable intensity. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the photo you want to stylize. Well-exposed images tend to respond most predictably to filters.'
                >
                    <GuideImage
                        image='/images/guides/add-filter/step-1-upload.jpg'
                        alt='Uploading a photo into the filter tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Browse the Filter Library'
                    body='Scroll through the available filters — from vintage and retro looks to grayscale and aesthetic presets — and pick the one that fits your image.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/add-filter/step-2-filter-library.jpg'
                        alt='Browsing a library of image filters'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Adjust Filter Intensity'
                    body='Fine-tune how strong the filter effect is applied, from a subtle touch to a full stylistic transformation.'
                >
                    <GuideVideo video='/videos/guides/add-filter/step-3-adjust-intensity.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Filtered Image'
                    body="Once you're happy with the look, export your filtered image in your preferred format."
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image has a brand new look." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default AddFilterGuide
import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Color Correct an Image | Guide'
const PAGE_DESCRIPTION =
    'Learn how to adjust the color balance, brightness, contrast, and saturation of your images for a more polished look.'

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
    name: 'How to Color Correct an Image',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the photo you want to color correct.',
        },
        {
            '@type': 'HowToStep',
            name: 'Adjust brightness and contrast',
            text: 'Set the overall tone and depth of the image first.',
        },
        {
            '@type': 'HowToStep',
            name: 'Fine-tune color and saturation',
            text: 'Fix any color cast and dial saturation up or down.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download your finished, color-corrected image.',
        },
    ],
}

const ColorCorrectionGuide = () => {
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
                <GuideHeading text='How to Color Correct an Image' />
                <GuideBody text="A few small adjustments to brightness, contrast, and color balance can turn a flat, dull photo into something that pops. This tool gives you live sliders for every key adjustment, all in one place. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the photo you want to color correct.'
                >
                    <GuideImage
                        image='/images/guides/color-correction/step-1-upload.jpg'
                        alt='Uploading a photo into the color correction tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Adjust Brightness and Contrast'
                    body='Start with brightness and contrast to set the overall tone and depth of the image.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/color-correction/step-2-brightness-contrast.jpg'
                        alt='Adjusting brightness and contrast sliders on an image'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Fine-Tune Color Balance and Saturation'
                    body='Nudge the color balance to fix any color cast, then adjust saturation to make colors pop or mute them for a subtler look.'
                >
                    <GuideVideo video='/videos/guides/color-correction/step-3-color-saturation.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Corrected Image'
                    body='Download your color-corrected image once every adjustment looks right.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image is color corrected and ready to use." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default ColorCorrectionGuide
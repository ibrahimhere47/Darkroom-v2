import React, { useEffect } from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'

const PAGE_TITLE = 'How to Add a Solid Background Color to a Transparent Image | Guide'
const PAGE_DESCRIPTION =
    'Learn how to fill the transparent areas of a PNG with a solid background color. A complete step-by-step guide covering upload, color selection, and export.'

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
    name: 'How to Add a Solid Background Color to a Transparent Image',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload a PNG with transparent areas — this tool fills existing transparency, it does not detect or remove a background for you.',
        },
        {
            '@type': 'HowToStep',
            name: 'Pick a background color',
            text: 'Choose the solid color you want to fill the transparent areas with.',
        },
        {
            '@type': 'HowToStep',
            name: 'Preview the result',
            text: 'Check the preview to confirm the color fills the transparent areas the way you expect.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Export the finished image in your preferred format.',
        },
    ],
}

const AddBackgroundGuide = () => {
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
                <GuideHeading text='How to Add a Solid Background Color' />
                <GuideBody text="If your image already has transparent areas — like a PNG cutout — this tool fills that transparency with a solid color of your choice. It doesn't detect or remove a background for you, so this works best when you start with an image that's already transparent. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Transparent Image'
                    body="Upload a PNG that already has transparent areas — for example, an image with the background already removed elsewhere. This tool fills existing transparency; it doesn't detect or cut out a background for you."
                >
                    <GuideImage
                        image='/images/guides/add-background/step-1-upload.jpg'
                        alt='Uploading a transparent PNG into the background color tool'
                    />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Pick a Background Color'
                    body='Choose the solid color you want to fill the transparent areas with. Pick a hex value directly, or use the color picker to find the right shade.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/add-background/step-2-pick-color.jpg'
                        alt='Choosing a solid background color to fill transparent areas'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Preview the Result'
                    body='The transparent areas of your image fill with your chosen color in real time, so you can confirm it looks right before exporting.'
                >
                    <GuideVideo video='/videos/guides/add-background/step-3-preview-color-fill.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Image'
                    body='Once the color looks right, export your finished image in the format and resolution you need — ready to share, print, or upload.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your transparent areas now have a solid background color." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default AddBackgroundGuide
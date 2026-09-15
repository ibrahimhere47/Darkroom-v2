import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import GuideStep from '../../components/guide-comps/GuideStep'
import ToolPageDropZone from '../../components/tool-page-comps/ToolPageDropZone'

const PAGE_TITLE = 'How to Add a Border to Your Images | Guide'
const PAGE_DESCRIPTION =
    'Learn how to add a border to your image with a custom color, style, and width in just a few steps.'
const TOOL_ID = 'add-border'

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

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Add a Border to Your Images',
    description: PAGE_DESCRIPTION,
    step: [
        {
            '@type': 'HowToStep',
            name: 'Upload your image',
            text: 'Upload the image you want to frame with a border.',
        },
        {
            '@type': 'HowToStep',
            name: 'Choose a style and color',
            text: 'Pick a border style — solid, dashed, or double — and a color.',
        },
        {
            '@type': 'HowToStep',
            name: 'Set the border width',
            text: 'Adjust the width from a thin outline to a bold frame.',
        },
        {
            '@type': 'HowToStep',
            name: 'Export your image',
            text: 'Download the finished image with its new border.',
        },
    ],
}

const AddBorderGuide = () => {
    useSeoMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION })
    const navigate = useNavigate()

    const handleFilesDropped = (files) => {
        navigate(`/tools/${TOOL_ID}`, { state: { files } })
    }

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
                <GuideHeading text='How to Add a Border to an Image' />
                <GuideBody text="A clean border can frame a photo, make a thumbnail stand out, or give a product shot a finished look. This tool lets you pick a color, style, and width, then preview it instantly. Here's how to use it." />
            </header>

            {/* Steps */}
            <div className='max-w-5xl mx-auto w-full pb-8 flex flex-col gap-8'>
                <GuideStep
                    number='01'
                    title='Upload Your Image'
                    body='Upload the image you want to add a border to.'
                >
                    <ToolPageDropZone setFiles={handleFilesDropped} />
                </GuideStep>

                <GuideStep
                    number='02'
                    title='Choose a Border Style and Color'
                    body='Pick a border style — solid, dashed, or double — and choose a color that fits your image.'
                    reverse
                >
                    <GuideImage
                        image='/images/guides/add-border/step-2-style-color.jpg'
                        alt='Choosing a border style and color for an image'
                    />
                </GuideStep>

                <GuideStep
                    number='03'
                    title='Set the Border Width'
                    body='Adjust the width of the border until it looks right, from a thin outline to a bold frame.'
                >
                    <GuideVideo video='/videos/guides/add-border/step-3-set-width.mp4' />
                </GuideStep>

                <GuideStep
                    number='04'
                    title='Export Your Bordered Image'
                    body='Download your finished image with the new border applied.'
                />
            </div>

            {/* Closing note */}
            <div className='max-w-3xl mx-auto pb-16 flex flex-col gap-2 items-center text-center border-t border-neutral-800 pt-12'>
                <GuideBody bold text="That's it — your image now has a clean, custom border." />
                <GuideBody text='Head back to the tool whenever you want to give it a try.' />
            </div>
        </article>
    )
}

export default AddBorderGuide
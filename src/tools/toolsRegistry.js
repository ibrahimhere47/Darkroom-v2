import { lazy } from "react";
import { 
    Crop, 
    Blend, 
    Image, 
    ArrowBigDownDash, 
    Camera, 
    Droplet, 
    RotateCcw, 
    SquareRoundCorner,
    Paintbrush,
    DropletOff,
    Type,
    RemoveFormatting,
    SquareDashed,
    CircleCheckBig,
    Laugh,
    Scaling,
} from 'lucide-react'

import {
    LayoutGrid,
    ChartNoAxesColumnIncreasing,
    Info,
    Sparkles,
    ShieldCheck
} from 'lucide-react'

export const tools = [
    {
        id: 'compress',
        name: 'Compress',
        tagline: 'Shrink file size with a quality slider and covert finished file to JPEG, PNG, or WebP',
        icon: ArrowBigDownDash,
        component: lazy(() => import('./compress/CompressTool.jsx')),
        guide: lazy(() => import('./compress/CompressGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image you want to shrink before applying any compression.',
            },
            {
                title: 'Adjust the quality slider',
                description: 'Balance file size against visual quality with a live slider.',
            },
            {
                title: 'Preview the size savings',
                description: 'Compare before-and-after file sizes in real time.',
            },
            {
                title: 'Export your format',
                description: 'Download the compressed image as JPEG, PNG, or WebP.',
            },
        ],
        guideSnapshotHeading: 'How to Compress an Image Without Losing Quality',
        guideSnapshotSummary: 'Shrink a file size with a quality slider, then export as JPEG, PNG, or WebP.',
        category: 'Optimize',
        categoryColor: '--color-category-optimize',
    },
    {
        id: 'resize',
        name: 'Resize',
        tagline: 'Fit, crop, or scale to exact dimensions instantaneously and securely',
        icon: Crop,
        component: lazy(() => import('./resize/ResizeTool.jsx')),
        guide: lazy(() => import('./resize/ResizeGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image you want to resize to a new set of dimensions.',
            },
            {
                title: 'Choose fit, crop, or scale',
                description: 'Pick how the image should change to match your target size.',
            },
            {
                title: 'Set exact dimensions',
                description: 'Enter a pixel width and height, or choose a common preset.',
            },
            {
                title: 'Export your image',
                description: 'Download the resized image ready to use.',
            },
        ],
        guideSnapshotHeading: 'How to Resize an Image to Exact Dimensions',
        guideSnapshotSummary: 'Fit, crop, or scale an image to exact pixel dimensions in a few clicks.',
        category: 'Properties',
        categoryColor: '--color-category-properties',
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF depending on whatever you need',
        icon: Image,
        component: lazy(() => import('./convert/ConvertTool.jsx')),
        guide: lazy(() => import('./convert/ConvertGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image file you want to convert to a different format.',
            },
            {
                title: 'Choose your target format',
                description: 'Pick JPEG, PNG, WebP, or AVIF depending on your needs.',
            },
            {
                title: 'Preview the converted file',
                description: 'Check the converted result and file size before downloading.',
            },
            {
                title: 'Download your new file',
                description: 'Save the image in its newly converted format.',
            },
        ],
        guideSnapshotHeading: 'How to Convert an Image Between JPEG, PNG, WebP, and AVIF',
        guideSnapshotSummary: 'Move an image between JPEG, PNG, WebP, and AVIF in a few clicks.',
        category: 'Properties',
        categoryColor: '--color-category-properties',
    },
    {
        id: 'add-filter',
        name: 'Add Filters',
        tagline: 'Add aesthetic, retro, vintage, grayscale and many other filters to your image',
        icon: Camera,
        component: lazy(() => import('./add-filter/AddFilterTool.jsx')),
        guide: lazy(() => import('./add-filter/AddFilterGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the photo you want to apply a filter to.',
            },
            {
                title: 'Browse the filter library',
                description: 'Choose from vintage, retro, grayscale, and other aesthetic filters.',
            },
            {
                title: 'Adjust filter intensity',
                description: 'Dial the effect from subtle to full strength.',
            },
            {
                title: 'Export your image',
                description: 'Download your filtered image in your preferred format.',
            },
        ],
        guideSnapshotHeading: 'How to Add Filters to Your Images',
        guideSnapshotSummary: 'Apply aesthetic, retro, vintage, and grayscale filters with adjustable intensity.',
        category: 'Effects',
        categoryColor: '--color-category-effects',
    },
    {
        id: 'watermark',
        name: 'Add Watermark',
        tagline: 'Watermark your image to maintain brand identity and stay high on security',
        icon: Droplet,
        component: lazy(() => import('./watermark/WatermarkTool.jsx')),
        guide: lazy(() => import('./watermark/WatermarkGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image you want to protect with a watermark.',
            },
            {
                title: 'Add text or a logo',
                description: 'Type in watermark text or upload a logo to use as your mark.',
            },
            {
                title: 'Position and adjust opacity',
                description: 'Place the watermark and set how visible it should be.',
            },
            {
                title: 'Export your image',
                description: 'Download the finished, watermarked image.',
            },
        ],
        guideSnapshotHeading: 'How to Add a Watermark to Your Images',
        guideSnapshotSummary: 'Add a text or logo watermark and position it exactly where you want.',
        category: 'Security',
        categoryColor: '--color-category-security',
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer by erasing the background',
        icon: Blend,
        component: lazy(() => import('./remove-background/RemoveBackgroundTool.jsx')),
        guide: lazy(() => import('./remove-background/RemoveBackgroundGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the photo whose background you want removed.',
            },
            {
                title: 'Let the tool detect your subject',
                description: 'Automatic detection separates your subject from its background.',
            },
            {
                title: 'Refine the edges',
                description: 'Touch up rough edges around hair or fine details.',
            },
            {
                title: 'Export with transparency',
                description: 'Download a PNG with a transparent background.',
            },
        ],
        guideSnapshotHeading: 'How to Remove the Background from an Image',
        guideSnapshotSummary: 'Automatically cut your subject out onto a transparent background.',
        category: 'Optimize',
        categoryColor: '--color-category-optimize',
    },
    {
        id: 'doodle',
        name: 'Doodle',
        tagline: 'Draw on your images with a variety of brushes, colors, and styles',
        icon: Laugh,
        component: lazy(() => import('./doodle/DoodleTool.jsx')),
        guide: lazy(() => import('./doodle/DoodleGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image you want to draw on.',
            },
            {
                title: 'Pick a brush and color',
                description: 'Choose from a range of brush styles and colors.',
            },
            {
                title: 'Draw on the image',
                description: 'Sketch, highlight, or annotate directly on the canvas.',
            },
            {
                title: 'Export your image',
                description: 'Download your finished, doodled image.',
            },
        ],
        guideSnapshotHeading: 'How to Doodle on Your Images',
        guideSnapshotSummary: 'Draw directly on your photos with a variety of brushes, colors, and styles.',
        category: 'Edit',
        categoryColor: '--color-category-edit',
    },
    {
        id: 'add-background',
        name: 'Add Background',
        tagline: 'Add a plain custom color background to your transparent background images',
        icon: Paintbrush,
        component: lazy(() => import('./add-background/AddBackgroundTool.jsx')),
        guide: lazy(() => import('./add-background/AddBackgroundGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload a transparent PNG',
                description: 'Start with an image that already has transparent areas — this tool fills existing transparency rather than detecting or removing a background for you.',
            },
            {
                title: 'Pick a background color',
                description: 'Choose any solid color to fill the transparent areas, using a hex value or the color picker.',
            },
            {
                title: 'Preview the fill',
                description: 'See your chosen background color applied to the transparent areas in real time before exporting.',
            },
            {
                title: 'Export your image',
                description: 'Download the finished image with its new solid background color, ready to share, print, or upload.',
            },
        ],
        guideSnapshotHeading: 'How to Add a Background Color to a Transparent Image',
        guideSnapshotSummary: 'Fill the transparent areas of a PNG with a solid background color in four quick steps.',
        category: 'Edit',
        categoryColor: '--color-category-edit',
    },
    {
        id: 'round-corners',
        name: 'Round Corners',
        tagline: 'Add a border radius to your images in order to give them a cleaner look',
        icon: SquareRoundCorner,
        component: lazy(() => import('./round-corners/RoundCornersTool.jsx')),
        guide: lazy(() => import('./round-corners/RoundCornersGuide.jsx')),
        guideSteps: [
            {
                title: 'Upload your image',
                description: 'Add the image whose corners you want to round.',
            },
            {
                title: 'Set your corner radius',
                description: 'Drag a slider or enter an exact pixel value for the radius.',
            },
            {
                title: 'Preview the result',
                description: 'Check the rounded corners in real time before exporting.',
            },
            {
                title: 'Export your image',
                description: 'Download the finished image with rounded corners.',
            },
        ],
        guideSnapshotHeading: 'How to Round the Corners of an Image',
        guideSnapshotSummary: 'Add a border radius to your image corners for a cleaner look.',
        category: 'Properties',
        categoryColor: '--color-category-properties',
    },
    {
        id: 'remove-watermark',
        name: 'Remove Watermark',
        tagline: 'Remove watermarks from images and restore them to their original state',
        icon: DropletOff,
        category: 'Security',
        categoryColor: '--color-category-security',
        comingSoon: true,
    },
    {
        id: 'rotate',
        name: 'Rotate',
        tagline: 'Convert image from landscape to portrait or rotate to any degree you wish',
        icon: RotateCcw,
        category: 'Properties',
        categoryColor: '--color-category-properties',
        comingSoon: true,
    },
    {
        id: 'add-text',
        name: 'Add Text',
        tagline: 'Add text to your images with a variety of fonts, colors, and styles',
        icon: Type,
        category: 'Edit',
        categoryColor: '--color-category-edit',
        comingSoon: true,
    },
    {
        id: 'remove-text',
        name: 'Remove Text',
        tagline: 'Remove text from images and restore them to their original state',
        icon: RemoveFormatting,
        category: 'Edit',
        categoryColor: '--color-category-edit',
        comingSoon: true,
    },
    {
        id: 'add-border',
        name: 'Add Border',
        tagline: 'Add a border to your images with a variety of colors, styles, and widths',
        icon: SquareDashed,
        category: 'Edit',
        categoryColor: '--color-category-edit',
        comingSoon: true,
    },
    {
        id: 'color-correction',
        name: 'Color Correction',
        tagline: 'Adjust the color balance, brightness, contrast, and saturation of your images',
        icon: CircleCheckBig,
        category: 'Effects',
        categoryColor: '--color-category-effects',
        comingSoon: true,
    },
    {
        id: 'upscale',
        name: 'Upscale',
        tagline: 'Increase the resolution of your images without losing quality',
        icon: Scaling,
        category: 'Optimize',
        categoryColor: '--color-category-optimize',
        comingSoon: true,
    },
]

export function getTool(id) {
    const tool = tools.find((t) => t.id === id)
    return tool
}

export const maxFilesPerBatch = 7;

export const CATEGORIES = [
    {
        name: 'All',
        icon: LayoutGrid,
        tools: tools
    },
    {
        name: 'Optimize',
        icon: ChartNoAxesColumnIncreasing,
        tools: tools.filter(t => t.category === 'Optimize')
    },
    {
        name: 'Edit',
        icon: Crop,
        tools: tools.filter(t => t.category === 'Edit')
    },
    {
        name: 'Properties',
        icon: Info,
        tools: tools.filter(t => t.category === 'Properties')
    },
    {
        name: 'Effects',
        icon: Sparkles,
        tools: tools.filter(t => t.category === 'Effects')
    },
    {
        name: 'Security',
        icon: ShieldCheck,
        tools: tools.filter(t => t.category === 'Security')
    },
]
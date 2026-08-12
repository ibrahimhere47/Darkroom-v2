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
        category: 'Optimize',
        categoryColor: '--color-category-optimize',
    },
    {
        id: 'resize',
        name: 'Resize',
        tagline: 'Fit, crop, or scale to exact dimensions instantaneously and securely',
        icon: Crop,
        component: lazy(() => import('./resize/ResizeTool.jsx')),
        category: 'Properties',
        categoryColor: '--color-category-properties',
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF depending on whatever you need',
        icon: Image,
        component: lazy(() => import('./convert/ConvertTool.jsx')),
        category: 'Properties',
        categoryColor: '--color-category-properties',
    },
    {
        id: 'add-filter',
        name: 'Add Filters',
        tagline: 'Add aesthetic, retro, vintage, grayscale and many other filters to your image',
        icon: Camera,
        component: lazy(() => import('./add-filter/AddFilterTool.jsx')),
        category: 'Effects',
        categoryColor: '--color-category-effects',
    },
    {
        id: 'watermark',
        name: 'Watermark',
        tagline: 'Watermark your image to maintain brand identity and stay high on security',
        icon: Droplet,
        category: 'Security',
        categoryColor: '--color-category-security',
        comingSoon: true,
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
        id: 'round-corners',
        name: 'Round Corners',
        tagline: 'Add a border radius to your images in order to give them a cleaner look',
        icon: SquareRoundCorner,
        category: 'Properties',
        categoryColor: '--color-category-properties',
        comingSoon: true,
    },
    {
        id: 'add-background',
        name: 'Add Background',
        tagline: 'Add a plain custom color background to your transparent background images',
        icon: Paintbrush,
        category: 'Edit',
        categoryColor: '--color-category-edit',
        comingSoon: true,
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer by erasing the background',
        icon: Blend,
        component: lazy(() => import('./remove-background/RemoveBackgroundTool.jsx')),
        category: 'Optimize',
        categoryColor: '--color-category-optimize',
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
        id: 'doodle',
        name: 'Doodle',
        tagline: 'Draw on your images with a variety of brushes, colors, and styles',
        icon: Laugh,
        component: lazy(() => import('./doodle/DoodleTool.jsx')),
        category: 'Edit',
        categoryColor: '--color-category-edit',
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

export const maxFilesPerBatch = 20;

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
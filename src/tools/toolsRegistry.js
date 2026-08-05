import { lazy } from "react";
import { Heart, Crop, Blend, Image, ArrowBigDownDash } from 'lucide-react'

export const tools = [
    {
        id: 'compress',
        name: 'Compress',
        tagline: 'Shrink file size with a quality slider. JPEG, PNG, or WebP.',
        icon: ArrowBigDownDash,
        // component: lazy(() => import('./compress/CompressTool.jsx')),
        comingSoon: false,
    },
    {
        id: 'resize',
        name: 'Resize',
        tagline: 'Fit, crop, or scale to exact dimensions instantaneously.',
        icon: Crop,
        comingSoon: true,
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer.',
        icon: Blend,
        comingSoon: true,
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF.',
        icon: Image,
        comingSoon: true,
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF.',
        icon: Image,
        comingSoon: true,
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF.',
        icon: Image,
        comingSoon: true,
    },
]

export function getTool(id) {
    const tool = tools.find((t) => t.id === id)
    return tool
}
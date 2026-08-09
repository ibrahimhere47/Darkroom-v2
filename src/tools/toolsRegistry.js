import { lazy } from "react";
import { Crop, Blend, Image, ArrowBigDownDash } from 'lucide-react'

export const tools = [
    {
        id: 'compress',
        name: 'Compress',
        tagline: 'Shrink file size with a quality slider and covert finished file to JPEG, PNG, or WebP',
        icon: ArrowBigDownDash,
        component: lazy(() => import('./compress/CompressTool.jsx')),
    },
    {
        id: 'resize',
        name: 'Resize',
        tagline: 'Fit, crop, or scale to exact dimensions instantaneously and securely',
        icon: Crop,
        comingSoon: true,
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer by erasing the background',
        icon: Blend,
        comingSoon: true,
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF depending on whatever you need',
        icon: Image,
        comingSoon: true,
    },
]

export function getTool(id) {
    const tool = tools.find((t) => t.id === id)
    return tool
}
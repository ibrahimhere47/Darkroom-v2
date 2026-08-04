import { lazy } from "react";
import { Heart } from 'lucide-react'

export const tools = [
    {
        id: 'compress',
        name: 'Compress',
        tagline: 'Shrink file size with a quality slider. JPEG, PNG, or WebP.',
        icon: Heart,
        // component: lazy(() => import('./compress/CompressTool.jsx')),
        comingSoon: true,
    },
    {
        id: 'resize',
        name: 'Resize',
        tagline: 'Fit, crop, or scale to exact dimensions.',
        icon: Heart,
        comingSoon: true,
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer.',
        icon: Heart,
        comingSoon: true,
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF.',
        icon: Heart,
        comingSoon: true,
    },
]

export function getTool(id) {
    const tool = tools.find((t) => t.id === id)
    return tool
}
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
} from 'lucide-react'

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
        component: lazy(() => import('./resize/ResizeTool.jsx'))
    },
    {
        id: 'convert',
        name: 'Convert format',
        tagline: 'Move between JPEG, PNG, WebP, and AVIF depending on whatever you need',
        icon: Image,
        component: lazy(() => import('./convert/ConvertTool.jsx'))
    },
    {
        id: 'remove-background',
        name: 'Remove background',
        tagline: 'Cut a subject out onto a transparent layer by erasing the background',
        icon: Blend,
        comingSoon: true,
    },
    {
        id: 'add-filter',
        name: 'Add Filters',
        tagline: 'Add aesthetic, retro, vintage, grayscale and many other filters to your image',
        icon: Camera,
        comingSoon: true,
    },
    {
        id: 'watermark',
        name: 'Watermark',
        tagline: 'Watermark your image to maintain brand identity and stay high on security',
        icon: Droplet,
        comingSoon: true,
    },
    {
        id: 'rotate',
        name: 'Rotate',
        tagline: 'Convert image from landscape to portrait or rotate to any degree you wish',
        icon: RotateCcw,
        comingSoon: true,
    },
    {
        id: 'round-corners',
        name: 'Round Corners',
        tagline: 'Add a border radius to your images in order to give them a cleaner look',
        icon: SquareRoundCorner,
        comingSoon: true,
    },
    {
        id: 'add-background',
        name: 'Add Background',
        tagline: 'Add a plain custom color background to your transparent background images',
        icon: Paintbrush,
        comingSoon: true,
    }
]

export function getTool(id) {
    const tool = tools.find((t) => t.id === id)
    return tool
}
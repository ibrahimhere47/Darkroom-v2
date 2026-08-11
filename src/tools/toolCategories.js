import { tools } from "./toolsRegistry"

const CATEGORIES = [
        { name: 'All', tools: tools },
        { name: 'Optimize', tools: tools.filter(t => ['compress', 'remove-background', 'upscale'].includes(t.id)) },
        { name: 'Edit', tools: tools.filter(t => ['add-background', 'add-text', 'remove-text', 'add-border', 'doodle'].includes(t.id)) },
        { name: 'Properties', tools: tools.filter(t => ['convert', 'resize', 'rotate', 'round-corners'].includes(t.id)) },
        { name: 'Effects', tools: tools.filter(t => ['add-filter', 'color-correction'].includes(t.id)) },
        { name: 'Security', tools: tools.filter(t => ['watermark', 'remove-watermark'].includes(t.id)) },
    ]

export default CATEGORIES
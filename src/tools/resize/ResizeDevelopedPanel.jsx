import React from 'react'
import { Lock, Unlock } from 'lucide-react'
import { 
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList, 
} from '../../components/tool-comps/ToolSidebar'
import formatBytes from '../../utils/formatBytes'

const ResizeDevelopedPanel = (props) => {
    const { width, height, originalDims, files, allResized } = props

    const originalRows = files.map((file, idx) => ({
        label: `Image ${idx + 1}`,
        value: originalDims(file, idx),
    }))

    const resizedDimensions = `${width} × ${height}`

    return (
        <div className='flex flex-col gap-6 mb-11'>
            <SidebarSection
                eyebrow='Resized'
                description={`${files.length} ${files.length === 1 ? 'image' : 'images'} resized to ${width} × ${height}.`}
            />

            <StatHighlight value={`${width}×${height}`} label='target size' />

            <ProgressBar
                ratio={Math.random() * 0.5 + 0.5} // Placeholder for actual progress
                leftLabel={`${width} × ${height} now`}
                rightLabel={`${originalDims(files[0], 0)} original`}
                animateKey={allResized}
            />

            <h1 className='text-md text-neutral-200 -mb-4'>Original Dimensions</h1>
            <StatRowList
                rows={[
                    ...originalRows,
                ]}
            />
        </div>
    )
}

export default ResizeDevelopedPanel
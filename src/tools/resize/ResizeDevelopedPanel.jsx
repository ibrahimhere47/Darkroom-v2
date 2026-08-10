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

    const { width, height, originalTotal, resizedTotal, files, allResized } = props

    const sizeDelta = originalTotal - resizedTotal
    const resizedRatio = originalTotal > 0 ? resizedTotal / originalTotal : 0

    return (
        <div className='flex flex-col gap-6 mb-11'>
            <SidebarSection
                eyebrow='Resized'
                description={`${files.length} ${files.length === 1 ? 'image' : 'images'} resized to ${width} × ${height}.`}
            />

            <StatHighlight value={`${width}×${height}`} label='target size' />

            <ProgressBar
                ratio={resizedRatio}
                leftLabel={`${formatBytes(resizedTotal)} now`}
                rightLabel={`${formatBytes(originalTotal)} original`}
                animateKey={allResized}
            />

            <StatRowList
                rows={[
                    { label: 'Original size', value: formatBytes(originalTotal) },
                    { label: 'Resized size', value: formatBytes(resizedTotal) },
                    {
                        label: sizeDelta >= 0 ? 'Saved' : 'Added',
                        value: formatBytes(Math.abs(sizeDelta)),
                        highlight: true,
                    },
                ]}
            />
        </div>
    )
}

export default ResizeDevelopedPanel
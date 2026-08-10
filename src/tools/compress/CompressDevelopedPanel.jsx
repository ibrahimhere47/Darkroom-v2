import React from 'react'
import {
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'
import formatBytes from '../../utils/formatBytes'

const CompressDevelopedPanel = (props) => {
    const { files, quality, originalTotal, compressedTotal, savedBytes, savedPercent, compressedRatio, allDeveloped } = props

    return (
        <div className='flex flex-col gap-6 mb-11'>
            <SidebarSection
                eyebrow='Developed'
                description={`${files.length} ${files.length === 1 ? 'image' : 'images'} processed at ${quality}% quality.`}
            />

            <StatHighlight value={`${savedPercent}%`} label='smaller' />

            <ProgressBar
                ratio={compressedRatio}
                leftLabel={`${formatBytes(compressedTotal)} now`}
                rightLabel={`${formatBytes(originalTotal)} original`}
                animateKey={allDeveloped}
            />

            <StatRowList
                rows={[
                    { label: 'Original size', value: formatBytes(originalTotal) },
                    { label: 'Compressed size', value: formatBytes(compressedTotal) },
                    { label: 'Saved', value: formatBytes(savedBytes), highlight: true },
                ]}
            />
        </div>
    )
}

export default CompressDevelopedPanel
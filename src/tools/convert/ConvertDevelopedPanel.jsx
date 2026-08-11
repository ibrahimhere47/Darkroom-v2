import React from 'react'
import {
    SidebarPanel,
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'
import formatBytes from '../../utils/formatBytes'

const ConvertDevelopedPanel = (props) => {
    const { files, format, convertedRatio, convertedTotal, originalTotal, sizeDelta, FORMATS, allConverted } = props

    return (
        <div className='flex flex-col gap-6 mb-11'>
            <SidebarSection
                eyebrow='Converted'
                description={`${files.length} ${files.length === 1 ? 'image' : 'images'} converted to ${FORMATS.find(f => f.id === format)?.label}.`}
            />

            <StatHighlight value={FORMATS.find(f => f.id === format)?.label} label='target format' />

            <ProgressBar
                ratio={convertedRatio}
                leftLabel={`${formatBytes(convertedTotal)} now`}
                rightLabel={`${formatBytes(originalTotal)} original`}
                animateKey={allConverted}
            />

            <StatRowList
                rows={[
                    { label: 'Original size', value: formatBytes(originalTotal) },
                    { label: 'Converted size', value: formatBytes(convertedTotal) },
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

export default ConvertDevelopedPanel
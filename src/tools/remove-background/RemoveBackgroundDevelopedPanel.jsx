import React from 'react'
import formatBytes from '../../utils/formatBytes'
import {
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'

const RemoveBackgroundDevelopedPanel = ({
    files,
    resultRatio,
    resultTotal,
    originalTotal,
    sizeDelta,
    allProcessed,
}) => {
    const grew = sizeDelta < 0

    return (
        <SidebarSection
            eyebrow='Done'
            description='Backgrounds removed. Download your images below.'
        >
            <StatHighlight
                value={grew ? `+${formatBytes(Math.abs(sizeDelta))}` : `-${formatBytes(sizeDelta)}`}
                label={grew ? 'larger (transparency added)' : 'smaller overall'}
            />

            <ProgressBar
                ratio={resultRatio}
                leftLabel={formatBytes(originalTotal)}
                rightLabel={formatBytes(resultTotal)}
                animateKey={allProcessed}
            />

            <StatRowList
                rows={[
                    { label: 'Images processed', value: files.length },
                    { label: 'Original size', value: formatBytes(originalTotal) },
                    { label: 'Result size', value: formatBytes(resultTotal), highlight: true },
                ]}
            />
        </SidebarSection>
    )
}

export default RemoveBackgroundDevelopedPanel
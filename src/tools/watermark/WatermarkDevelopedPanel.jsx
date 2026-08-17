import React from 'react'
import { SidebarSection, StatHighlight, StatRowList } from '../../components/tool-comps/ToolSidebar'

const WatermarkDevelopedPanel = ({ files, position, opacity, watermarkedCount }) => {
    return (
        <SidebarSection
            eyebrow='Done'
            description='Your images have been watermarked.'
        >
            <StatHighlight
                value={watermarkedCount}
                label={watermarkedCount === 1 ? 'image watermarked' : 'images watermarked'}
            />
            <StatRowList
                rows={[
                    { label: 'Total images', value: files.length },
                    { label: 'Position', value: position },
                    { label: 'Opacity', value: `${opacity}%` },
                ]}
            />
        </SidebarSection>
    )
}

export default WatermarkDevelopedPanel
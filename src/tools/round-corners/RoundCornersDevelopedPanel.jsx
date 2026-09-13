import React from 'react'
import { SidebarSection, StatHighlight, StatRowList } from '../../components/tool-comps/ToolSidebar'

const RoundCornersDevelopedPanel = ({ files, radius, roundedCount }) => {
    return (
        <SidebarSection
            eyebrow='Done'
            description='Your images now have rounded corners.'
        >
            <StatHighlight
                value={roundedCount}
                label={roundedCount === 1 ? 'image rounded' : 'images rounded'}
            />
            <StatRowList
                rows={[
                    { label: 'Total images', value: files.length },
                    { label: 'Radius', value: `${radius}px` },
                ]}
            />
        </SidebarSection>
    )
}

export default RoundCornersDevelopedPanel
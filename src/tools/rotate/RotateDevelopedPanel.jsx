import React from 'react'
import { SidebarSection, StatHighlight, StatRowList } from '../../components/tool-comps/ToolSidebar'

const RotateDevelopedPanel = ({ files, degrees, rotatedCount }) => {
    return (
        <SidebarSection
            eyebrow='Done'
            description='Your images have been rotated.'
        >
            <StatHighlight
                value={rotatedCount}
                label={rotatedCount === 1 ? 'image rotated' : 'images rotated'}
            />
            <StatRowList
                rows={[
                    { label: 'Total images', value: files.length },
                    { label: 'Angle', value: `${degrees}°` },
                ]}
            />
        </SidebarSection>
    )
}

export default RotateDevelopedPanel
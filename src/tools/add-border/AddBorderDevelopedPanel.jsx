import React from 'react'
import { SidebarSection, StatHighlight, StatRowList } from '../../components/tool-comps/ToolSidebar'

const AddBorderDevelopedPanel = ({ files, width, color, borderedCount }) => {
    return (
        <SidebarSection
            eyebrow='Done'
            description='Your images now have a border.'
        >
            <StatHighlight
                value={borderedCount}
                label={borderedCount === 1 ? 'image bordered' : 'images bordered'}
            />
            <StatRowList
                rows={[
                    { label: 'Total images', value: files.length },
                    { label: 'Width', value: `${width}px` },
                    { label: 'Color', value: color },
                ]}
            />
        </SidebarSection>
    )
}

export default AddBorderDevelopedPanel
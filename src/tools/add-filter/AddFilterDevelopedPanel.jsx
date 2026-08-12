import React from 'react'
import { DownloadCloud } from 'lucide-react'
import {
    SidebarPanel,
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'
import formatBytes from '../../utils/formatBytes'

const AddFilterDevelopedPanel = (props) => {
    const { files, filter, FILTERS, allFiltered } = props

    return (
        <div className='flex flex-col gap-6 mb-11'>
            <SidebarSection
                eyebrow='Converted'
                description={`${files.length} ${files.length === 1 ? 'image' : 'images'} converted to ${FILTERS.find(f => f === filter)?.label}.`}
            />

            <StatHighlight value={FILTERS.find(f => f === filter)?.label} label='target filter' />

            <ProgressBar
                ratio={Math.random()}
                leftLabel={`${filter} now`}
                rightLabel={`original`}
                animateKey={allFiltered}
            />
        </div>
    )
}

export default AddFilterDevelopedPanel
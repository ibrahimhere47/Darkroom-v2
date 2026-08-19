import React from 'react'
import formatBytes from '../../utils/formatBytes'
import { SidebarSection, StatRowList } from '../../components/tool-comps/ToolSidebar'

const AddBackgroundDevelopedPanel = ({ files, color, processedCount, outputTotal }) => {
    const normalized = color?.toUpperCase() || '#FFFFFF'

    return (
        <SidebarSection
            eyebrow='Background Added'
            description='Transparent areas are now filled solid.'
        >
            <div className='flex items-center gap-4'>
                <div
                    className='w-16 h-16 rounded-2xl border border-neutral-800 shrink-0'
                    style={{ backgroundColor: normalized }}
                />
                <div className='flex flex-col gap-1'>
                    <span className='text-3xl font-semibold text-amber-47 leading-none font-body'>
                        {normalized}
                    </span>
                    <span className='text-xs tracking-widest text-neutral-500 uppercase'>
                        Fill color
                    </span>
                </div>
            </div>

            <StatRowList
                rows={[
                    { label: 'Images processed', value: `${processedCount} / ${files.length}` },
                    { label: 'Output format', value: 'PNG' },
                    { label: 'Total output size', value: formatBytes(outputTotal) },
                ]}
            />
        </SidebarSection>
    )
}

export default AddBackgroundDevelopedPanel
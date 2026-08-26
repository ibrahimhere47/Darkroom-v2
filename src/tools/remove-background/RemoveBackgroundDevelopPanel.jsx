import React from 'react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const RemoveBackgroundDevelopPanel = ({ isProcessing, fileCount }) => {
    return (
        <div className='flex flex-col gap-2'>
        <SidebarSection
            eyebrow='Background removal'
            description='Automatically strips the background from the image.'
        />
        <p className='text-[11px] text-neutral-500 leading-relaxed'>
            {fileCount === 0
                ? 'Add images to get started.'
                : isProcessing
                    ? 'Working through your batch…'
                    : 'Ready when you are.'}
        </p>
        </div>
    )
}

export default RemoveBackgroundDevelopPanel
import React from 'react'
import {
    SidebarPanel,
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'

const CompressDevelopPanel = (props) => {
    const { quality, setQuality, isCompressing } = props

    return (
        <div className='flex flex-col gap-6'>
            <SidebarSection eyebrow='Develop' description='Adjust quality, then compress your batch.' />

            <div>
                <div className='flex justify-between items-center mb-2'>
                    <span className='text-sm tracking-widest text-neutral-400 uppercase'>Quality</span>
                    <span className='text-amber-47 text-lg font-semibold font-mono'>{quality}</span>
                </div>
                <input
                    type='range'
                    min='10'
                    max='100'
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    disabled={isCompressing}
                    className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-47 cursor-pointer disabled:opacity-40'
                />
                <div className='flex justify-between text-[14px] text-neutral-300 mt-1 font-mono'>
                    <span>10</span>
                    <span>100</span>
                </div>
            </div>
        </div>
    )
}

export default CompressDevelopPanel
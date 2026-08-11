import React from 'react'
import {
    SidebarPanel,
    SidebarSection,
} from '../../components/tool-comps/ToolSidebar'

const ConvertDevelopPanel = (props) => {
    const { quality, setQuality, format, setFormat, isConverting, FORMATS } = props

    return (
        <div className='flex flex-col gap-6 mb-10 md:mb-2'>
            <SidebarSection eyebrow='Develop' description='Adjust quality, select format, then convert your batch.' />

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
                    disabled={isConverting}
                    className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-47 cursor-pointer disabled:opacity-40'
                />
                <div className='flex justify-between text-[14px] text-neutral-300 mt-1 font-mono'>
                    <span>10</span>
                    <span>100</span>
                </div>
            </div>
            <div>
                <div className='flex gap-2'>
                    {FORMATS.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setFormat(m.id)}
                            disabled={isConverting}
                            className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200 disabled:opacity-40 ${
                                format === m.id
                                    ? 'bg-amber-47 text-black font-semibold'
                                    : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-amber-47 hover:text-amber-47'
                            }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConvertDevelopPanel
import React from 'react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const PRESET_COLORS = [
    { label: 'Black', value: '#000000' },
    { label: 'White', value: '#ffffff' },
    { label: 'Amber', value: '#f5a623' },
]

const AddBorderDevelopPanel = ({ width, setWidth, color, setColor, isBordering }) => {

    const handleHexChange = (value) => {
        // allow free typing, only push valid-looking hex up as the live color
        setColor(value)
    }

    return (
        <SidebarSection
            eyebrow='Add border'
            description='Add a border of any color and width around your images.'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                        <span>Width</span>
                        <span className='text-neutral-300 normal-case tracking-normal'>{width}px</span>
                    </div>
                    <input
                        type='range'
                        min={0}
                        max={100}
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        disabled={isBordering}
                        className='w-full accent-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Custom value</label>
                    <input
                        type='number'
                        min={0}
                        value={width}
                        onChange={(e) => setWidth(Math.max(0, Number(e.target.value) || 0))}
                        disabled={isBordering}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Color</label>
                    <div className='flex items-center gap-2'>
                        <input
                            type='color'
                            value={/^#([0-9a-f]{6})$/i.test(color) ? color : '#000000'}
                            onChange={(e) => setColor(e.target.value)}
                            disabled={isBordering}
                            className='h-9 w-9 shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 cursor-pointer'
                        />
                        <input
                            type='text'
                            value={color}
                            onChange={(e) => handleHexChange(e.target.value)}
                            placeholder='#000000'
                            disabled={isBordering}
                            className='flex-1 rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none focus:border-amber-47'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Presets</label>
                    <div className='grid grid-cols-3 gap-2'>
                        {PRESET_COLORS.map((p) => (
                            <button
                                key={p.value}
                                type='button'
                                onClick={() => setColor(p.value)}
                                disabled={isBordering}
                                className={`flex items-center justify-center gap-1.5 text-[11px] py-2 rounded-lg border transition-colors ${
                                    color.toLowerCase() === p.value
                                        ? 'bg-amber-47 text-neutral-950 border-amber-47'
                                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                <span
                                    className='h-2.5 w-2.5 rounded-full border border-neutral-600'
                                    style={{ backgroundColor: p.value }}
                                />
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SidebarSection>
    )
}

export default AddBorderDevelopPanel
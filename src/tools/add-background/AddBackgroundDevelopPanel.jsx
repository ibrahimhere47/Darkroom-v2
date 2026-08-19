import React from 'react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

/**
 * Curated presets shown before the raw hex input. Kept short and
 * purposeful — the amber accent stands in for "brand", the rest cover
 * the common transparent-PNG use cases (studio white, pure black,
 * neutral card gray).
 */
const PRESETS = [
    { label: 'White', value: '#FFFFFF' },
    { label: 'Black', value: '#000000' },
    { label: 'Amber', value: '#FFB347' },
    { label: 'Slate', value: '#71717A' },
    { label: 'Sky', value: '#7DD3FC' },
    { label: 'Mint', value: '#86EFAC' },
]

const AddBackgroundDevelopPanel = ({ color, setColor, isProcessing, fileCount }) => {
    const normalized = color?.toUpperCase() || '#FFFFFF'

    const handleHexChange = (e) => {
        let value = e.target.value
        if (!value.startsWith('#')) value = `#${value}`
        setColor(value)
    }

    return (
        <div className='flex flex-col gap-5'>
        <SidebarSection
            eyebrow='Background Color'
            description='Transparent areas get filled with this color.'
        />
            <div className='flex flex-col gap-4'>
                <div className='flex flex-wrap gap-2'>
                    {PRESETS.map((preset) => {
                        const isActive = normalized === preset.value.toUpperCase()
                        return (
                            <button
                                key={preset.value}
                                type='button'
                                title={preset.label}
                                disabled={isProcessing}
                                onClick={() => setColor(preset.value)}
                                className={`shrink-0 rounded-full border-2 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${
                                    isActive
                                        ? 'border-amber-47 scale-110'
                                        : 'border-neutral-700 hover:border-neutral-500'
                                }`}
                                style={{
                                    backgroundColor: preset.value,
                                    width: '2.25rem',
                                    height: '2.25rem',
                                }}
                            />
                        )
                    })}
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='text-sm tracking-widest text-neutral-400 uppercase'>Pick Color</span>
                    <label
                        className='relative flex items-center justify-center w-full h-6 rounded-full border border-neutral-700 overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed'
                        style={{
                            background:
                                'linear-gradient(90deg, #FF0040, #FF9900, #FFEE00, #33FF66, #00E5FF, #4D5DFF, #C400FF, #FF0040)',
                        }}
                    >
                        <input
                            type='color'
                            value={normalized}
                            onChange={handleHexChange}
                            disabled={isProcessing}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed'
                        />
                    </label>
                </div>
                
                <div className='flex flex-col gap-2'>
                    <span className='text-sm tracking-widest text-neutral-400 uppercase'>Preview Color</span>
                    <div className='w-full h-6 rounded-full' style={{ backgroundColor: normalized }} />
                </div>

                <div className='flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 mt-2'>
                    <input
                        type='text'
                        value={normalized}
                        onChange={handleHexChange}
                        disabled={isProcessing}
                        maxLength={7}
                        spellCheck={false}
                        className='flex-1 bg-transparent text-sm text-neutral-200 tracking-widest uppercase outline-none disabled:opacity-40'
                    />
                </div>

                <p className='text-[11px] text-neutral-600 leading-relaxed'>
                    {fileCount} {fileCount === 1 ? 'image' : 'images'} loaded
                </p>
            </div>
        </div>
    )
}

export default AddBackgroundDevelopPanel
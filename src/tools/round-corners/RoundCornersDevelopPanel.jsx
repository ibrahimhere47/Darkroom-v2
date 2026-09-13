import React from 'react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const PRESETS = [
    { label: 'Subtle', value: 12 },
    { label: 'Rounded', value: 24 },
    { label: 'Pill', value: 48 },
]

const RoundCornersDevelopPanel = ({ radius, setRadius, maxRadius, isRounding }) => {
    return (
        <SidebarSection
            eyebrow='Round corners'
            description='Set a corner radius to apply to your images.'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                        <span>Radius</span>
                        <span className='text-neutral-300 normal-case tracking-normal'>{radius}px</span>
                    </div>
                    <input
                        type='range'
                        min={0}
                        max={maxRadius}
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        disabled={isRounding}
                        className='w-full accent-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Custom value</label>
                    <input
                        type='number'
                        min={0}
                        value={radius}
                        onChange={(e) => setRadius(Math.max(0, Number(e.target.value) || 0))}
                        disabled={isRounding}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Presets</label>
                    <div className='grid grid-cols-3 gap-2'>
                        {PRESETS.map((p) => (
                            <button
                                key={p.label}
                                type='button'
                                onClick={() => setRadius(p.value)}
                                disabled={isRounding}
                                className={`text-[11px] py-2 rounded-lg border transition-colors ${
                                    radius === p.value
                                        ? 'bg-amber-47 text-neutral-950 border-amber-47'
                                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SidebarSection>
    )
}

export default RoundCornersDevelopPanel
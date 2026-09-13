import React from 'react'
import { RotateCw, RotateCcw as FlipCcw } from 'lucide-react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const QUICK_ROTATIONS = [
    { label: '-90°', value: -90 },
    { label: '180°', value: 180 },
    { label: '90°', value: 90 },
]

const RotateDevelopPanel = ({ degrees, setDegrees, isRotating }) => {

    const nudge = (delta) => setDegrees((prev) => prev + delta)

    return (
        <SidebarSection
            eyebrow='Rotate'
            description='Rotate your images by any angle. The canvas expands so nothing gets clipped.'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-center gap-4'>
                    <button
                        type='button'
                        onClick={() => nudge(-90)}
                        disabled={isRotating}
                        className='p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-amber-47 hover:border-amber-47 transition-colors'
                        aria-label='Rotate left 90 degrees'
                    >
                        <FlipCcw size={18} />
                    </button>
                    <span className='text-2xl font-semibold text-amber-47 font-body w-20 text-center'>
                        {degrees}°
                    </span>
                    <button
                        type='button'
                        onClick={() => nudge(90)}
                        disabled={isRotating}
                        className='p-3 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-amber-47 hover:border-amber-47 transition-colors'
                        aria-label='Rotate right 90 degrees'
                    >
                        <RotateCw size={18} />
                    </button>
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                        <span>Angle</span>
                        <span className='text-neutral-300 normal-case tracking-normal'>{degrees}°</span>
                    </div>
                    <input
                        type='range'
                        min={-180}
                        max={180}
                        value={degrees}
                        onChange={(e) => setDegrees(Number(e.target.value))}
                        disabled={isRotating}
                        className='w-full accent-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Custom value</label>
                    <input
                        type='number'
                        value={degrees}
                        onChange={(e) => setDegrees(Number(e.target.value) || 0)}
                        disabled={isRotating}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Presets</label>
                    <div className='grid grid-cols-3 gap-2'>
                        {QUICK_ROTATIONS.map((r) => (
                            <button
                                key={r.label}
                                type='button'
                                onClick={() => setDegrees(r.value)}
                                disabled={isRotating}
                                className={`text-[11px] py-2 rounded-lg border transition-colors ${
                                    degrees === r.value
                                        ? 'bg-amber-47 text-neutral-950 border-amber-47'
                                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                {r.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </SidebarSection>
    )
}

export default RotateDevelopPanel
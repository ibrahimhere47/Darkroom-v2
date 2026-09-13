import React from 'react'
import { RotateCcw } from 'lucide-react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const SLIDERS = [
    { key: 'brightness', label: 'Brightness', min: 0, max: 3, step: 0.01, default: 1, format: (v) => v.toFixed(2) },
    { key: 'contrast', label: 'Contrast', min: 0, max: 3, step: 0.01, default: 1, format: (v) => v.toFixed(2) },
    { key: 'saturation', label: 'Saturation', min: 0, max: 3, step: 0.01, default: 1, format: (v) => v.toFixed(2) },
    { key: 'hue', label: 'Hue', min: -180, max: 180, step: 1, default: 0, format: (v) => `${v}°` },
]

const ColorCorrectDevelopPanel = ({
    values,
    setValue,
    onReset,
    gammaEnabled,
    setGammaEnabled,
    gamma,
    setGamma,
    disabled,
}) => {
    return (
        <SidebarSection
            eyebrow='Color correct'
            description='Adjust and preview changes live on the image.'
        >
            <div className='flex flex-col gap-4'>
                {SLIDERS.map((s) => (
                    <div key={s.key} className='flex flex-col gap-2'>
                        <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                            <span>{s.label}</span>
                            <span className='text-neutral-300 normal-case tracking-normal'>{s.format(values[s.key])}</span>
                        </div>
                        <input
                            type='range'
                            min={s.min}
                            max={s.max}
                            step={s.step}
                            value={values[s.key]}
                            onChange={(e) => setValue(s.key, Number(e.target.value))}
                            disabled={disabled}
                            className='w-full accent-amber-47'
                        />
                    </div>
                ))}

                <div className='flex flex-col gap-2 pt-1'>
                    <label className='flex items-center gap-2 text-xs tracking-widest text-neutral-500 uppercase cursor-pointer'>
                        <input
                            type='checkbox'
                            checked={gammaEnabled}
                            onChange={(e) => setGammaEnabled(e.target.checked)}
                            disabled={disabled}
                            className='accent-amber-47'
                        />
                        Gamma
                        <span className='normal-case tracking-normal text-neutral-600'>(export only, no live preview)</span>
                    </label>
                    {gammaEnabled && (
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                                <span>Gamma</span>
                                <span className='text-neutral-300 normal-case tracking-normal'>{gamma.toFixed(2)}</span>
                            </div>
                            <input
                                type='range'
                                min={1}
                                max={3}
                                step={0.01}
                                value={gamma}
                                onChange={(e) => setGamma(Number(e.target.value))}
                                disabled={disabled}
                                className='w-full accent-amber-47'
                            />
                        </div>
                    )}
                </div>

                <button
                    type='button'
                    onClick={onReset}
                    disabled={disabled}
                    className='self-start flex items-center gap-1.5 text-[11px] text-neutral-500 hover:text-amber-47 transition-colors'
                >
                    <RotateCcw size={12} />
                    Reset all
                </button>
            </div>
        </SidebarSection>
    )
}

export default ColorCorrectDevelopPanel
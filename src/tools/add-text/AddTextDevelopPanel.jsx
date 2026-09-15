import React from 'react'
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

// Must match the backend's FONT_FAMILIES whitelist exactly (add-text.route.ts).
// These families must also be loaded on the frontend (via @font-face / Google
// Fonts) for the live preview to actually reflect what the backend renders.
const FONT_FAMILIES = ['Inter', 'Roboto', 'Playfair Display', 'Bebas Neue', 'JetBrains Mono']

const ALIGN_OPTIONS = [
    { id: 'left', icon: AlignLeft },
    { id: 'center', icon: AlignCenter },
    { id: 'right', icon: AlignRight },
]

const AddTextDevelopPanel = ({
    text,
    setText,
    fontFamily,
    setFontFamily,
    fontSize,
    setFontSize,
    bold,
    setBold,
    italic,
    setItalic,
    align,
    setAlign,
    color,
    setColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeEnabled,
    setStrokeEnabled,
    opacity,
    setOpacity,
    rotation,
    setRotation,
    disabled,
}) => {
    return (
        <SidebarSection
            eyebrow='Add text'
            description='Type your text, then drag it anywhere on the image.'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Text</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Your text here'
                        rows={2}
                        disabled={disabled}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none focus:border-amber-47 resize-none'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Font</label>
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        disabled={disabled}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                    >
                        {FONT_FAMILIES.map((f) => (
                            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
                        ))}
                    </select>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xs tracking-widest text-neutral-500 uppercase'>Size</label>
                        <input
                            type='number'
                            min={1}
                            value={fontSize}
                            onChange={(e) => setFontSize(Math.max(1, Number(e.target.value) || 1))}
                            disabled={disabled}
                            className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xs tracking-widest text-neutral-500 uppercase'>Style</label>
                        <div className='flex gap-2'>
                            <button
                                type='button'
                                onClick={() => setBold(!bold)}
                                disabled={disabled}
                                className={`flex-1 py-2 rounded-lg border flex items-center justify-center transition-colors ${
                                    bold ? 'bg-amber-47 text-neutral-950 border-amber-47' : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                <Bold size={14} />
                            </button>
                            <button
                                type='button'
                                onClick={() => setItalic(!italic)}
                                disabled={disabled}
                                className={`flex-1 py-2 rounded-lg border flex items-center justify-center transition-colors ${
                                    italic ? 'bg-amber-47 text-neutral-950 border-amber-47' : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                <Italic size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Align</label>
                    <div className='grid grid-cols-3 gap-2'>
                        {ALIGN_OPTIONS.map(({ id, icon: Icon }) => (
                            <button
                                key={id}
                                type='button'
                                onClick={() => setAlign(id)}
                                disabled={disabled}
                                className={`py-2 rounded-lg border flex items-center justify-center transition-colors ${
                                    align === id ? 'bg-amber-47 text-neutral-950 border-amber-47' : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                <Icon size={14} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Color</label>
                    <div className='flex items-center gap-2'>
                        <input
                            type='color'
                            value={/^#([0-9a-f]{6})$/i.test(color) ? color : '#ffffff'}
                            onChange={(e) => setColor(e.target.value)}
                            disabled={disabled}
                            className='h-9 w-9 shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 cursor-pointer'
                        />
                        <input
                            type='text'
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            placeholder='#ffffff'
                            disabled={disabled}
                            className='flex-1 rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none focus:border-amber-47'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-2 pt-1'>
                    <label className='flex items-center gap-2 text-xs tracking-widest text-neutral-500 uppercase cursor-pointer'>
                        <input
                            type='checkbox'
                            checked={strokeEnabled}
                            onChange={(e) => setStrokeEnabled(e.target.checked)}
                            disabled={disabled}
                            className='accent-amber-47'
                        />
                        Stroke
                    </label>
                    {strokeEnabled && (
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type='color'
                                    value={/^#([0-9a-f]{6})$/i.test(strokeColor) ? strokeColor : '#000000'}
                                    onChange={(e) => setStrokeColor(e.target.value)}
                                    disabled={disabled}
                                    className='h-9 w-9 shrink-0 rounded-lg border border-neutral-700 bg-neutral-800 cursor-pointer'
                                />
                                <input
                                    type='text'
                                    value={strokeColor}
                                    onChange={(e) => setStrokeColor(e.target.value)}
                                    placeholder='#000000'
                                    disabled={disabled}
                                    className='flex-1 rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none focus:border-amber-47'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                                    <span>Stroke width</span>
                                    <span className='text-neutral-300 normal-case tracking-normal'>{strokeWidth}px</span>
                                </div>
                                <input
                                    type='range'
                                    min={0}
                                    max={10}
                                    step={0.5}
                                    value={strokeWidth}
                                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                    disabled={disabled}
                                    className='w-full accent-amber-47'
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                        <span>Opacity</span>
                        <span className='text-neutral-300 normal-case tracking-normal'>{opacity}%</span>
                    </div>
                    <input
                        type='range'
                        min={0}
                        max={100}
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                        disabled={disabled}
                        className='w-full accent-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between text-xs tracking-widest text-neutral-500 uppercase'>
                        <span>Rotation</span>
                        <span className='text-neutral-300 normal-case tracking-normal'>{rotation}°</span>
                    </div>
                    <input
                        type='range'
                        min={-180}
                        max={180}
                        value={rotation}
                        onChange={(e) => setRotation(Number(e.target.value))}
                        disabled={disabled}
                        className='w-full accent-amber-47'
                    />
                </div>
            </div>
        </SidebarSection>
    )
}

export default AddTextDevelopPanel
import React, { useRef } from 'react'
import { Image as ImageIcon, X } from 'lucide-react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

const WatermarkDevelopPanel = ({
    text,
    setText,
    position,
    setPosition,
    opacity,
    setOpacity,
    fontSize,
    setFontSize,
    watermarkPreviewUrl,
    onWatermarkImageChange,
    onRemoveWatermarkImage,
    isWatermarking,
    POSITIONS,
}) => {
    const fileInputRef = useRef(null)

    return (
        <SidebarSection
            eyebrow='Watermark'
            description='Add a text or logo watermark to your images.'
        >
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Text</label>
                    <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='© Your Brand'
                        disabled={isWatermarking}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 placeholder:text-neutral-600 outline-none focus:border-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Logo image (optional)</label>
                    {watermarkPreviewUrl ? (
                        <div className='relative w-full h-20 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700'>
                            <img src={watermarkPreviewUrl} alt='Watermark preview' className='w-full h-full object-contain' />
                            <button
                                type='button'
                                onClick={onRemoveWatermarkImage}
                                disabled={isWatermarking}
                                className='absolute top-1 right-1 rounded-full bg-neutral-900/80 p-1 text-neutral-300 hover:text-amber-47'
                            >
                                <X size={12} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type='button'
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isWatermarking}
                            className='w-full h-20 rounded-lg border border-dashed border-neutral-700 flex flex-col items-center justify-center gap-1 text-neutral-500 hover:text-amber-47 hover:border-amber-47 transition-colors'
                        >
                            <ImageIcon size={18} />
                            <span className='text-[11px]'>Upload logo</span>
                        </button>
                    )}
                    <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={onWatermarkImageChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Position</label>
                    <div className='grid grid-cols-3 gap-2'>
                        {POSITIONS.map((p) => (
                            <button
                                key={p.id}
                                type='button'
                                onClick={() => setPosition(p.id)}
                                disabled={isWatermarking}
                                className={`text-[11px] py-2 rounded-lg border transition-colors ${
                                    position === p.id
                                        ? 'bg-amber-47 text-neutral-950 border-amber-47'
                                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                                }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
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
                        disabled={isWatermarking}
                        className='w-full accent-amber-47'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-xs tracking-widest text-neutral-500 uppercase'>Font size</label>
                    <input
                        type='number'
                        min={1}
                        value={fontSize}
                        onChange={(e) => setFontSize(Math.max(1, Number(e.target.value) || 1))}
                        disabled={isWatermarking}
                        className='w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-47'
                    />
                </div>
            </div>
        </SidebarSection>
    )
}

export default WatermarkDevelopPanel
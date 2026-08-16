import React from 'react'
import { Eraser, Undo2, Redo2 } from 'lucide-react'
import { SidebarSection, StatRowList } from '../../components/tool-comps/ToolSidebar'

const DoodleDevelopPanel = ({
    brushColor,
    onColorChange,
    presets,
    brushSize,
    onBrushSizeChange,
    isErasing,
    onToggleErase,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    width,
    height,
    strokeCount,
}) => {
    return (
        <div className='flex flex-col gap-5'>
            <SidebarSection eyebrow='Brush' description='Pick a color and size, then sketch on the image.'>
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        {presets.map((color) => (
                            <button
                                key={color}
                                type='button'
                                aria-label={`Use ${color}`}
                                onClick={() => onColorChange(color)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${
                                    !isErasing && brushColor === color
                                        ? 'border-amber-47 scale-110'
                                        : 'border-neutral-700'
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <input
                            type='color'
                            value={brushColor}
                            onChange={(e) => onColorChange(e.target.value)}
                            className='w-6 h-6 rounded-full overflow-hidden border-2 border-neutral-700 bg-transparent cursor-pointer'
                            aria-label='Custom color'
                        />
                    </div>

                    <label className='flex flex-col gap-1.5 text-[11px] text-neutral-500'>
                        <span className='flex items-center justify-between'>
                            <span>Size</span>
                            <span className='text-neutral-300'>{brushSize}px</span>
                        </span>
                        <input
                            type='range'
                            min={1}
                            max={50}
                            value={brushSize}
                            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
                            className='w-full accent-amber-47'
                        />
                    </label>

                    <button
                        type='button'
                        onClick={onToggleErase}
                        aria-pressed={isErasing}
                        className={`flex items-center justify-center gap-2 text-[12px] py-2.5 rounded-xl border transition-all duration-200 ${
                            isErasing
                                ? 'bg-amber-47 text-black border-amber-47'
                                : 'bg-transparent text-neutral-300 border-neutral-700 hover:border-amber-47 hover:text-amber-47'
                        }`}
                    >
                        <Eraser size={13} />
                        {isErasing ? 'Erasing' : 'Eraser'}
                    </button>
                </div>
            </SidebarSection>

            <SidebarSection eyebrow='History'>
                <div className='flex items-center gap-2'>
                    <button
                        type='button'
                        onClick={onUndo}
                        disabled={!canUndo}
                        className='flex-1 flex items-center justify-center gap-1.5 text-[12px] py-2.5 rounded-xl border border-neutral-700 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-47 hover:text-amber-47 transition-all duration-200'
                    >
                        <Undo2 size={13} />
                        Undo
                    </button>
                    <button
                        type='button'
                        onClick={onRedo}
                        disabled={!canRedo}
                        className='flex-1 flex items-center justify-center gap-1.5 text-[12px] py-2.5 rounded-xl border border-neutral-700 text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-47 hover:text-amber-47 transition-all duration-200'
                    >
                        <Redo2 size={13} />
                        Redo
                    </button>
                </div>
            </SidebarSection>

            <SidebarSection eyebrow='Canvas'>
                <StatRowList
                    rows={[
                        { label: 'Dimensions', value: `${width} × ${height}px` },
                        { label: 'Strokes', value: strokeCount, highlight: strokeCount > 0 },
                    ]}
                />
            </SidebarSection>
        </div>
    )
}

export default DoodleDevelopPanel
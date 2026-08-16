import React from 'react'
import { Eraser, Undo2, Redo2 } from 'lucide-react'
import { SidebarSection } from '../../components/tool-comps/ToolSidebar'

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
        <>
            <SidebarSection title='Brush'>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex items-center gap-2'>
                        {presets.map((color) => (
                            <button
                                key={color}
                                type='button'
                                aria-label={`Use ${color}`}
                                onClick={() => onColorChange(color)}
                                className={`w-6 h-6 rounded-full border transition-all ${
                                    !isErasing && brushColor === color
                                        ? 'border-neutral-300 scale-110'
                                        : 'border-neutral-800'
                                }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <input
                            type='color'
                            value={brushColor}
                            onChange={(e) => onColorChange(e.target.value)}
                            className='w-6 h-6 rounded-full overflow-hidden border border-neutral-800 bg-transparent cursor-pointer'
                            aria-label='Custom color'
                        />
                    </div>

                    <label className='flex flex-col gap-1.5 text-[11px] text-neutral-500'>
                        <span className='flex items-center justify-between'>
                            <span>Size</span>
                            <span className='text-neutral-400'>{brushSize}px</span>
                        </span>
                        <input
                            type='range'
                            min={1}
                            max={50}
                            value={brushSize}
                            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
                            className='w-full accent-neutral-300'
                        />
                    </label>

                    <button
                        type='button'
                        onClick={onToggleErase}
                        aria-pressed={isErasing}
                        className={`flex items-center justify-center gap-2 text-[12px] py-2 rounded-lg border transition-colors ${
                            isErasing
                                ? 'bg-neutral-100 text-neutral-900 border-neutral-100'
                                : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                    >
                        <Eraser size={13} />
                        {isErasing ? 'Erasing' : 'Eraser'}
                    </button>
                </div>
            </SidebarSection>

            <SidebarSection title='History'>
                <div className='flex items-center gap-2 w-full'>
                    <button
                        type='button'
                        onClick={onUndo}
                        disabled={!canUndo}
                        className='flex-1 flex items-center justify-center gap-1.5 text-[12px] py-2 rounded-lg border border-neutral-800 text-neutral-400 disabled:opacity-30 hover:border-neutral-700 transition-colors'
                    >
                        <Undo2 size={13} />
                        Undo
                    </button>
                    <button
                        type='button'
                        onClick={onRedo}
                        disabled={!canRedo}
                        className='flex-1 flex items-center justify-center gap-1.5 text-[12px] py-2 rounded-lg border border-neutral-800 text-neutral-400 disabled:opacity-30 hover:border-neutral-700 transition-colors'
                    >
                        <Redo2 size={13} />
                        Redo
                    </button>
                </div>
            </SidebarSection>

            <SidebarSection title='Canvas'>
                <div className='flex justify-between w-full text-[11px] text-neutral-600'>
                    <span>{width} × {height}px</span>
                    <span>{strokeCount} {strokeCount === 1 ? 'stroke' : 'strokes'}</span>
                </div>
            </SidebarSection>
        </>
    )
}

export default DoodleDevelopPanel
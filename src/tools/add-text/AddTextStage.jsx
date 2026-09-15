import React, { useRef, useCallback } from 'react'
import { UploadCloud, X, RefreshCw } from 'lucide-react'

const LINE_HEIGHT_MULTIPLIER = 1.2

/**
 * Full-bleed single-image stage for the add-text tool. Mirrors ColorCorrectStage's
 * drop-zone/full-cover behavior, but overlays a draggable text layer whose styling
 * mirrors the backend's SVG output (same font, weight, stroke, alignment, rotation
 * semantics) so what's dragged here matches the exported result.
 */
const AddTextStage = ({
    previewUrl,
    fileName,
    text,
    x,
    y,
    onPositionChange,
    fontFamily,
    fontSize,
    bold,
    italic,
    align,
    color,
    strokeColor,
    strokeWidth,
    opacity,
    rotation,
    onFileSelected,
    onRemove,
}) => {
    const inputRef = useRef(null)
    const containerRef = useRef(null)
    const draggingRef = useRef(false)

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file) onFileSelected(file)
    }

    const handleInputChange = (e) => {
        const file = e.target.files?.[0]
        if (file) onFileSelected(file)
        e.target.value = ''
    }

    const updatePositionFromEvent = useCallback((clientX, clientY) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        const relX = ((clientX - rect.left) / rect.width) * 100
        const relY = ((clientY - rect.top) / rect.height) * 100
        onPositionChange(
            Math.min(100, Math.max(0, relX)),
            Math.min(100, Math.max(0, relY)),
        )
    }, [onPositionChange])

    const handlePointerDown = (e) => {
        e.preventDefault()
        draggingRef.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e) => {
        if (!draggingRef.current) return
        updatePositionFromEvent(e.clientX, e.clientY)
    }

    const handlePointerUp = (e) => {
        draggingRef.current = false
        e.currentTarget.releasePointerCapture(e.pointerId)
    }

    if (!previewUrl) {
        return (
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className='flex-1 min-h-[480px] rounded-2xl border border-dashed border-neutral-700 bg-neutral-900 flex flex-col items-center justify-center gap-3 text-neutral-500 hover:text-amber-47 hover:border-amber-47 transition-colors cursor-pointer'
            >
                <UploadCloud size={32} />
                <div className='text-center'>
                    <p className='text-sm'>Drop an image here or click to upload</p>
                    <p className='text-[11px] text-neutral-600 mt-1'>One image at a time</p>
                </div>
                <input
                    ref={inputRef}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleInputChange}
                />
            </div>
        )
    }

    const alignOffset = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0%'

    return (
        <div
            ref={containerRef}
            className='relative flex-1 min-h-[480px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900'
        >
            <img
                src={previewUrl}
                alt={fileName || 'Preview'}
                className='w-full h-full object-cover pointer-events-none select-none'
                draggable={false}
            />

            {text && (
                <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: '0 0',
                        touchAction: 'none',
                        cursor: 'move',
                    }}
                    className='group'
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: `translateX(${alignOffset})`,
                            whiteSpace: 'pre',
                            fontFamily,
                            fontSize: `${fontSize}px`,
                            fontWeight: bold ? 700 : 400,
                            fontStyle: italic ? 'italic' : 'normal',
                            color,
                            opacity: opacity / 100,
                            lineHeight: LINE_HEIGHT_MULTIPLIER,
                            textAlign: align,
                            WebkitTextStroke: strokeColor && strokeWidth > 0 ? `${strokeWidth}px ${strokeColor}` : undefined,
                        }}
                        className='outline-dashed outline-1 outline-transparent group-hover:outline-amber-47/60 px-0.5 -mx-0.5'
                    >
                        {text}
                    </div>
                </div>
            )}

            <div className='absolute top-3 right-3 flex gap-2'>
                <button
                    type='button'
                    onClick={() => inputRef.current?.click()}
                    className='p-2 rounded-full bg-neutral-900/80 text-neutral-300 hover:text-amber-47 backdrop-blur-sm'
                    aria-label='Replace image'
                >
                    <RefreshCw size={14} />
                </button>
                <button
                    type='button'
                    onClick={onRemove}
                    className='p-2 rounded-full bg-neutral-900/80 text-neutral-300 hover:text-amber-47 backdrop-blur-sm'
                    aria-label='Remove image'
                >
                    <X size={14} />
                </button>
            </div>

            {fileName && (
                <div className='absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-neutral-900/80 text-[11px] text-neutral-400 backdrop-blur-sm'>
                    {fileName}
                </div>
            )}

            <input
                ref={inputRef}
                type='file'
                accept='image/*'
                className='hidden'
                onChange={handleInputChange}
            />
        </div>
    )
}

export default AddTextStage
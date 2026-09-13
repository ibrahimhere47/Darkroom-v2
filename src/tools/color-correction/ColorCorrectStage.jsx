import React, { useRef } from 'react'
import { UploadCloud, X, RefreshCw } from 'lucide-react'

/**
 * Full-bleed single-image stage for the color correct tool.
 * Shows a drop zone when empty, otherwise fills the stage with the image
 * at object-fit: cover and applies a live CSS `filter` for instant preview.
 */
const ColorCorrectStage = ({ previewUrl, cssFilter, onFileSelected, onRemove, fileName }) => {
    const inputRef = useRef(null)

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

    return (
        <div className='relative flex-1 min-h-[480px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-900'>
            <img
                src={previewUrl}
                alt={fileName || 'Preview'}
                style={{ filter: cssFilter }}
                className='w-full h-full object-cover'
            />

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

export default ColorCorrectStage
import React from 'react'
import { Download, Trash2, ArrowRight } from 'lucide-react'

/**
 * One thumbnail in a tool's image grid. Shows the result once processed
 * (falling back to the original preview), with hover-revealed remove /
 * download actions and an optional badge (e.g. file size, dimensions).
 *
 * `hoverSize` (optional): { current: string, estimated: string } — shown
 * on hover before the image is processed, as "current → estimated".
 */
const ImageTile = ({ previewUrl, resultUrl, isProcessed, badge, hoverSize, onRemove, onDownload }) => {
    const shownUrl = resultUrl || previewUrl

    return (
        <div
            className={`result-frame group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 ${isProcessed ? '' : 'opacity-70'}`}
        >
            <img src={shownUrl} className='w-full h-40 object-contain' />

            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300' />

            {onRemove && (
                <button
                    onClick={onRemove}
                    className='absolute top-2 left-2 bg-black/70 hover:bg-red-500 hover:text-white text-neutral-300 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300'
                >
                    <Trash2 size={16} />
                </button>
            )}

            {isProcessed && (
                <>
                    {onDownload && (
                        <button
                            onClick={onDownload}
                            className='absolute top-2 right-2 bg-black/70 hover:bg-amber-47 hover:text-black text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200'
                        >
                            <Download size={16} />
                        </button>
                    )}
                    {badge && (
                        <span className='absolute top-3/4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] md:text-[15px] tracking-wider text-neutral-200 bg-black/70 px-2 py-0.5 rounded-full whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 transition-all duration-300'>
                            {badge}
                        </span>
                    )}
                </>
            )}

            {!isProcessed && hoverSize && (
                <span className='absolute top-3/4 left-1/2 -translate-x-1/2 flex items-center gap-1 text-[11px] md:text-[15px] tracking-wider text-neutral-200 bg-black/70 px-2 py-0.5 rounded-full whitespace-nowrap md:opacity-0 md:group-hover:opacity-100 transition-all duration-300'>
                    {hoverSize.current}
                    <ArrowRight className='text-amber-47 hidden md:text-[16px] md:block' />
                    <span className='hidden md:block'>{hoverSize.estimated}</span>
                </span>
            )}
        </div>
    )
}

export default ImageTile
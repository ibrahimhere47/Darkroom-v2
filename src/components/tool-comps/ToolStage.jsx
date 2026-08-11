import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Plus } from 'lucide-react'
import ImageTile from './ImageTile'

/**
 * The big left-hand panel used by every tool: a spinner while processing,
 * otherwise a grid of ImageTiles plus an "Add Images" control.
 *
 * @param {Array} items - [{ file, previewUrl, resultUrl, resultMeta }]
 * @param {boolean} isProcessing
 * @param {(e, idx) => void} [onRemove]
 * @param {(e, url, idx) => void} [onDownload] - called only for processed items
 * @param {(item, idx) => React.ReactNode} [getBadge] - per-tile badge, e.g. file size
 * @param {(fileList: FileList) => void} [onAddFiles] - omit to hide the add control
 * @param {string} [addLabel]
 * @param {React.ReactNode} [loadingContent] - override the default spinner
 */
const ToolStage = ({
    items,
    isProcessing,
    onRemove,
    onDownload,
    getBadge,
    getHoverSize,
    getHoverDimensions,
    getHoverFormat,
    onAddFiles,
    addLabel = 'Add Images',
    loadingContent,
}) => {
    const fileInputRef = useRef(null)

    // Re-run the entrance animation whenever items are added/removed or
    // results come in (previews -> processed swap).
    const revealSignature = `${items.length}:${items.map((item) => (item.resultUrl ? '1' : '0')).join('')}`
    const [revealed, setRevealed] = useState(false)

    useGSAP(() => {
        if (!isProcessing && items.length > 0 && !revealed) {
            gsap.fromTo(
                '.result-frame',
                { 
                    opacity: 0,
                    y: 14, 
                    scale: 0.97 
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.08,
                    onComplete: () => setRevealed(true),
                }
            )
        }
        else {
            gsap.to('.result-frame', {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                y: 0,
            })
        }
    }, [revealSignature, isProcessing])

    const handleInputChange = (e) => {
        onAddFiles(e.target.files)
        e.target.value = ''
    }

    return (
        <div className='relative flex-1 min-h-125 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 overflow-hidden'>
            <div className='pointer-events-none absolute top-20 right-80 w-72 h-72 rounded-full bg-amber-47/1 blur-3xl' />

            {isProcessing ? (
                <div className='relative z-10 w-full h-full min-h-92.5 flex flex-col items-center justify-center gap-3'>
                    {loadingContent || (
                        <div className='w-10 h-10 border-4 border-neutral-700 border-t-amber-47 rounded-full animate-spin' />
                    )}
                </div>
            ) : (
                <div className='min-w-full min-h-114 flex flex-col justify-between'>
                <div className='flex flex-col gap-8'>
                    <div className='relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {items.map((item, idx) => (
                            <ImageTile
                                key={idx}
                                previewUrl={item.previewUrl}
                                resultUrl={item.resultUrl}
                                isProcessed={Boolean(item.resultUrl)}
                                badge={getBadge ? getBadge(item, idx) : null}
                                hoverSize={!item.resultMeta && getHoverSize ? getHoverSize(item, idx) : null}
                                hoverDimensions={!item.resultMeta && getHoverDimensions ? getHoverDimensions(item, idx) : null}
                                hoverFormat={!item.resultMeta && getHoverFormat ? getHoverFormat(item, idx) : null}
                                onRemove={onRemove ? (e) => onRemove(e, idx) : undefined}
                                onDownload={onDownload && item.resultUrl ? (e) => onDownload(e, item.resultUrl, idx) : undefined}
                            />
                        ))}
                    </div>
                </div>
                {onAddFiles && (
                    <div className='flex flex-col items-center'>
                        <button
                            className='flex gap-1 font-mono font-semibold rounded-full bg-amber-47/95 mt-6 p-1.5 px-2 text-black cursor-pointer hover:bg-amber-47 transition-all duration-350'
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Plus /> {addLabel}
                        </button>
                        <input
                            type='file'
                            ref={fileInputRef}
                            onChange={handleInputChange}
                            accept='image/*'
                            multiple
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
                </div>
            )}
        </div>
    )
}

export default ToolStage
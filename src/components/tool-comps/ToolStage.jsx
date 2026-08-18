import React, { useRef } from 'react'
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
 * @param {(e, url, idx) => void} [onDownload]
 * @param {(item, idx) => React.ReactNode} [getBadge]
 * @param {(item, idx) => React.ReactNode} [getHoverSize]
 * @param {(item, idx) => React.ReactNode} [getHoverDimensions]
 * @param {(item, idx) => React.ReactNode} [getHoverFormat]
 * @param {(fileList: FileList) => void} [onAddFiles]
 * @param {string} [addLabel]
 * @param {React.ReactNode} [loadingContent]
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
    const stageRef = useRef(null)

    const revealSignature = `${items.length}:${items
        .map((item) => (item.resultUrl ? '1' : '0'))
        .join('')}`

    useGSAP(() => {
        // Don't try to animate while the loading state is displayed.
        if (isProcessing || items.length === 0) {
            return
        }

        const frames = gsap.utils.toArray('.result-frame', stageRef.current)

        // Safety check.
        if (!frames.length) {
            return
        }

        gsap.fromTo(
            frames,
            {
                opacity: 0,
                y: 14,
                scale: 0.97,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.08,
            }
        )
    }, {
        dependencies: [revealSignature, isProcessing],
        scope: stageRef,
    })

    const handleInputChange = (e) => {
        onAddFiles(e.target.files)
        e.target.value = ''
    }

    return (
        <div
            ref={stageRef}
            className='relative flex-1 h-fit md:h-155 rounded-2xl bg-neutral-950 border border-neutral-800 p-6 overflow-hidden'
        >
            <div className='pointer-events-none absolute top-20 right-80 w-72 h-72 rounded-full bg-amber-47/1 blur-3xl' />

            {isProcessing ? (
                <div className='relative z-10 w-full h-full min-h-92.5 flex flex-col items-center justify-center gap-3'>
                    {loadingContent || (
                        <div className='w-10 h-10 border-4 border-neutral-700 border-t-amber-47 rounded-full animate-spin' />
                    )}
                </div>
            ) : (
                <div className='min-w-full h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap-8'>
                        <div className='relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4'>
                            {items.map((item, idx) => (
                                <ImageTile
                                    key={idx}
                                    previewUrl={item.previewUrl}
                                    resultUrl={item.resultUrl}
                                    isProcessed={Boolean(item.resultUrl)}
                                    badge={
                                        getBadge
                                            ? getBadge(item, idx)
                                            : null
                                    }
                                    hoverSize={
                                        !item.resultMeta && getHoverSize
                                            ? getHoverSize(item, idx)
                                            : null
                                    }
                                    hoverDimensions={
                                        !item.resultMeta && getHoverDimensions
                                            ? getHoverDimensions(item, idx)
                                            : null
                                    }
                                    hoverFormat={
                                        !item.resultMeta && getHoverFormat
                                            ? getHoverFormat(item, idx)
                                            : null
                                    }
                                    onRemove={
                                        onRemove
                                            ? (e) => onRemove(e, idx)
                                            : undefined
                                    }
                                    onDownload={
                                        onDownload && item.resultUrl
                                            ? (e) =>
                                                    onDownload(
                                                        e,
                                                        item.resultUrl,
                                                        idx
                                                    )
                                            : undefined
                                    }
                                    className='result-frame'
                                />
                            ))}
                        </div>
                    </div>

                    {onAddFiles && (
                        <div className='flex flex-col items-center'>
                            <button
                                className='flex gap-1 font-mono font-semibold rounded-full bg-amber-47/95 mt-6 p-1.5 px-2 text-black cursor-pointer hover:bg-amber-47 transition-all duration-350'
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                            >
                                <Plus />
                                {addLabel}
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
import React, { useState, useMemo } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw } from 'lucide-react'
import extensionFromMime from '../../utils/extensionFromMime'
import useToolFiles from '../../hooks/useToolFiles'
import useAnimatedRemove from '../../hooks/useAnimatedRemove'
import ToolStage from '../../components/tool-comps/ToolStage'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'
import RemoveBackgroundDevelopedPanel from './RemoveBackgroundDevelopedPanel'
import RemoveBackgroundDevelopPanel from './RemoveBackgroundDevelopPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const REMOVE_BG_ENDPOINT = 'https://adjusture-backend.vercel.app/remove-background'

const RemoveBackgroundTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles

    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allProcessed,
        isProcessing,
        beginProcessing,
        setResult,
        finishProcessing,
        resetResults,
        addFiles,
        removeFile,
        downloadFile,
        downloadAll,
    } = useToolFiles(files, setFiles)

    const handleRemoveClick = useAnimatedRemove(removeFile)

    const originalTotal = useMemo(
        () => files.reduce((sum, f) => sum + f.size, 0),
        [files]
    )

    const resultTotal = useMemo(
        () => items.reduce((sum, item) => sum + (item.resultMeta?.size ?? 0), 0),
        [items]
    )

    const sizeDelta = originalTotal - resultTotal
    const resultRatio = originalTotal ? resultTotal / originalTotal : 0

    const handleRemoveBackground = async () => {
        if (files.length > maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage(`Our free tier only offers ${maxFilesPerBatch} files per batch`)
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('image', file)

            try {
                const response = await fetch(REMOVE_BG_ENDPOINT, { method: 'POST', body: formData })
                if (!response.ok) {
                    console.error('Background removal failed')
                    return
                }
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setResult(idx, url, { mime: blob.type, size: blob.size, format: 'png' })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const filename = (item, idx) => `no-bg-${idx + 1}.${extensionFromMime(item?.resultMeta?.mime)}`

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, filename(items[idx], idx))
    }

    const getHoverFormat = (item, idx) => {
        const file = files[idx]
        if (!file?.type) return null
        return extensionFromMime(file.type).toUpperCase()
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isProcessing}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? 'PNG' : null}
                getHoverFormat={(item, idx) => getHoverFormat(item, idx)}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allProcessed ? (
                    // ---- Result panel ----
                    <RemoveBackgroundDevelopedPanel
                        files={files}
                        resultRatio={resultRatio}
                        resultTotal={resultTotal}
                        originalTotal={originalTotal}
                        sizeDelta={sizeDelta}
                        allProcessed={allProcessed}
                    />
                ) : (
                    // ---- Pre-process settings panel ----
                    <RemoveBackgroundDevelopPanel
                        isProcessing={isProcessing}
                        fileCount={files.length}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allProcessed ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => filename(items[idx], idx))}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Remove background again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleRemoveBackground} disabled={isProcessing || files.length === 0}>
                            {isProcessing ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Removing background…
                                </>
                            ) : (
                                'Remove background'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} processed`}
                    </p>
                </div>
            </SidebarPanel>
        </div>
        <Popup isOpen={isPopup} title={'Oops!'} description={'It seems you have hit some sort of limit'} onClose={() => {setIsPopup(false)}} >
            <h1
                className='font-mono font-bold mt-2 mb-3'
            >
            {popupMessage}
            </h1>
            <HomePremiumAd isPopup={true} />
        </Popup>
        </>
    )
}

export default RemoveBackgroundTool
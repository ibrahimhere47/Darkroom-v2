import React, { useState, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw, Lock, Unlock } from 'lucide-react'
import formatBytes from '../../utils/formatBytes'
import extensionFromMime from '../../utils/extensionFromMime'
import getImageDimensions from '../../utils/getImageDimensions'
import useToolFiles from '../../hooks/useToolFiles'
import useAnimatedRemove from '../../hooks/useAnimatedRemove'
import ToolStage from '../../components/tool-comps/ToolStage'
import ActionButton from '../../components/tool-comps/ActionButton'
import {
    SidebarPanel,
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList,
} from '../../components/tool-comps/ToolSidebar'
import ResizeDevelopedPanel from './ResizeDevelopedPanel'
import ResizeDevelopPanel from './ResizeDevelopPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const RESIZE_ENDPOINT = 'https://adjusture-backend.vercel.app/resize'

const MODES = [
    { id: 'fit', label: 'Fit' },
    { id: 'crop', label: 'Crop' },
    { id: 'exact', label: 'Exact' },
]

const ResizeTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles

    const [width, setWidth] = useState(1024)
    const [height, setHeight] = useState(768)
    const [lockAspect, setLockAspect] = useState(true)
    const [aspectRatio, setAspectRatio] = useState(null)
    const [mode, setMode] = useState('fit')
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allResized,
        isProcessing: isResizing,
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

    useEffect(() => {
        if (files.length === 0) return
        let cancelled = false
        getImageDimensions(files[0]).then(({ width: w, height: h }) => {
            if (cancelled) return
            setWidth(w)
            setHeight(h)
            setAspectRatio(w / h)
        }).catch(() => {})
        return () => { cancelled = true }
    }, [files[0]])

    const [fileDimensions, setFileDimensions] = useState({}) // keyed by file name+size, or index

    useEffect(() => {
        if (files.length === 0) return
        let cancelled = false

        Promise.all(
            files.map((file) =>
                getImageDimensions(file)
                    .then((dims) => [file, dims])
                    .catch(() => [file, null])
            )
        ).then((results) => {
            if (cancelled) return
            const map = {}
            results.forEach(([file, dims], idx) => {
                if (dims) map[idx] = dims
            })
            setFileDimensions(map)
        })

        return () => { cancelled = true }
    }, [files])

    const handleWidthChange = (value) => {
        const next = Math.max(1, Number(value) || 0)
        setWidth(next)
        if (lockAspect && aspectRatio) setHeight(Math.round(next / aspectRatio))
    }

    const handleHeightChange = (value) => {
        const next = Math.max(1, Number(value) || 0)
        setHeight(next)
        if (lockAspect && aspectRatio) setWidth(Math.round(next * aspectRatio))
    }

    const toggleLockAspect = () => {
        if (!lockAspect && width && height) setAspectRatio(width / height)
        setLockAspect((prev) => !prev)
    }

    const originalTotal = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files])
    const resizedTotal = useMemo(
        () => items.reduce((sum, item) => sum + (item.resultMeta?.size || 0), 0),
        [items]
    )
    const sizeDelta = originalTotal - resizedTotal
    const resizedRatio = originalTotal > 0 ? resizedTotal / originalTotal : 0

    const handleResize = async () => {
        if (files.length >= maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage('Our free tier only offers 20 files per batch')
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('width', width)
            formData.append('height', height)
            formData.append('mode', mode)

            try {
                const response = await fetch(RESIZE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    console.error('Resize failed')
                    return
                }

                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const dims = await getImageDimensions(blob).catch(() => ({ width, height }))
                setResult(idx, url, { ...dims, size: blob.size, mime: blob.type })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const filename = (item, idx) => `resized-${idx + 1}.${extensionFromMime(item?.resultMeta?.mime)}`

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, filename(items[idx], idx))
    }

    const getHoverDimensions = (item, idx) => {
        const dims = fileDimensions[idx]
        return dims ? `${dims.width} × ${dims.height}` : '…'
    }

    const getOriginalDimensions = (file, idx) => {
        const dims = fileDimensions[idx]
        return dims ? `${dims.width} × ${dims.height}` : '…'
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isResizing}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? `${item.resultMeta.width} × ${item.resultMeta.height}` : null}
                getHoverDimensions={(item, idx) => getHoverDimensions(item, idx)}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allResized ? (
                    // ---- Resized panel ----
                    <ResizeDevelopedPanel 
                        width={width}
                        height={height}
                        originalDims={getOriginalDimensions}
                        files={files}
                        allResized={allResized}
                    />
                ) : (
                    // ---- Resize settings panel ----
                    <ResizeDevelopPanel
                        width={width}
                        height={height}
                        setWidth={handleWidthChange}
                        setHeight={handleHeightChange}
                        lockAspect={lockAspect}
                        setLockAspect={setLockAspect}
                        aspectRatio={aspectRatio}
                        mode={mode}
                        setMode={setMode}
                        isResizing={isResizing}
                        MODES={MODES}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allResized ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => filename(items[idx], idx))}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & resize again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleResize} disabled={isResizing || files.length === 0 || !width || !height}>
                            {isResizing ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Resizing…
                                </>
                            ) : (
                                'Resize'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} resized`}
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

export default ResizeTool
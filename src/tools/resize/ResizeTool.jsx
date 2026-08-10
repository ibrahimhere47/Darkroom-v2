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

const RESIZE_ENDPOINT = 'https://darkroom-v2-backend-production.up.railway.app/resize'

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
        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('File', file)
            formData.append('Width', width)
            formData.append('Height', height)
            formData.append('Mode', mode)

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

    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isResizing}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? `${item.resultMeta.width} × ${item.resultMeta.height}` : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allResized ? (
                    // ---- Resized panel ----
                    <div className='flex flex-col gap-6 mb-11'>
                        <SidebarSection
                            eyebrow='Resized'
                            description={`${files.length} ${files.length === 1 ? 'image' : 'images'} resized to ${width} × ${height}.`}
                        />

                        <StatHighlight value={`${width}×${height}`} label='target size' />

                        <ProgressBar
                            ratio={resizedRatio}
                            leftLabel={`${formatBytes(resizedTotal)} now`}
                            rightLabel={`${formatBytes(originalTotal)} original`}
                            animateKey={allResized}
                        />

                        <StatRowList
                            rows={[
                                { label: 'Original size', value: formatBytes(originalTotal) },
                                { label: 'Resized size', value: formatBytes(resizedTotal) },
                                {
                                    label: sizeDelta >= 0 ? 'Saved' : 'Added',
                                    value: formatBytes(Math.abs(sizeDelta)),
                                    highlight: true,
                                },
                            ]}
                        />
                    </div>
                ) : (
                    // ---- Resize settings panel ----
                    <div className='flex flex-col gap-6'>
                        <SidebarSection eyebrow='Resize' description='Set target dimensions, then resize your batch.' />

                        <div className='flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <span className='text-sm tracking-widest text-neutral-400 uppercase'>Dimensions</span>
                                <button
                                    onClick={toggleLockAspect}
                                    disabled={isResizing}
                                    className='text-neutral-400 hover:text-amber-47 disabled:opacity-40 cursor-pointer transition-colors duration-200'
                                    title={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                                >
                                    {lockAspect ? <Lock size={16} /> : <Unlock size={16} />}
                                </button>
                            </div>

                            <div className='flex items-center gap-2'>
                                <input
                                    type='number'
                                    min='1'
                                    value={width}
                                    onChange={(e) => handleWidthChange(e.target.value)}
                                    disabled={isResizing}
                                    className='w-full bg-neutral-900 border border-neutral-700 focus:border-amber-47 outline-none rounded-lg px-3 py-2 text-sm text-neutral-200 disabled:opacity-40'
                                />
                                <span className='text-neutral-600'>×</span>
                                <input
                                    type='number'
                                    min='1'
                                    value={height}
                                    onChange={(e) => handleHeightChange(e.target.value)}
                                    disabled={isResizing}
                                    className='w-full bg-neutral-900 border border-neutral-700 focus:border-amber-47 outline-none rounded-lg px-3 py-2 text-sm text-neutral-200 disabled:opacity-40'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <span className='text-sm tracking-widest text-neutral-400 uppercase'>Mode</span>
                            <div className='flex gap-2'>
                                {MODES.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setMode(m.id)}
                                        disabled={isResizing}
                                        className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200 disabled:opacity-40 ${
                                            mode === m.id
                                                ? 'bg-amber-47 text-black font-semibold'
                                                : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-amber-47 hover:text-amber-47'
                                        }`}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
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
    )
}

export default ResizeTool
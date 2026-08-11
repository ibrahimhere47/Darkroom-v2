import React, { useState, useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw } from 'lucide-react'
import formatBytes from '../../utils/formatBytes'
import extensionFromMime from '../../utils/extensionFromMime'
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
import ConvertDevelopedPanel from './ConvertDevelopedPanel'
import ConvertDevelopPanel from './ConvertDevelopPanel'

const CONVERT_ENDPOINT = 'https://darkroom-v2-backend-production.up.railway.app/convert'

const FORMATS = [
    { id: 'image/jpeg', label: 'JPEG', value: 'jpeg' },
    { id: 'image/png', label: 'PNG', value: 'png' },
    { id: 'image/webp', label: 'WebP', value: 'webp' },
]

const ConvertTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles

    const [quality, setQuality] = useState(80)
    const [format, setFormat] = useState('image/jpeg')

    const {
        items,
        hasResults,
        allDone: allConverted,
        isProcessing: isConverting,
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
        return () => { cancelled = true }
    }, [files[0]])

    const originalTotal = useMemo(
        () => files.reduce((sum, f) => sum + f.size, 0),
        [files]
    )

    const convertedTotal = useMemo(
        () => items.reduce((sum, item) => sum + (item.resultMeta?.size ?? 0), 0),
        [items]
    )

    const sizeDelta = originalTotal - convertedTotal
    const convertedRatio = originalTotal ? convertedTotal / originalTotal : 0

    const handleConvert = async () => {
        beginProcessing()

        const targetValue = FORMATS.find(f => f.id === format)?.value

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('File', file)
            formData.append('Quality', quality)
            formData.append('Format', targetValue)

            try {
                const response = await fetch(CONVERT_ENDPOINT, { method: 'POST', body: formData })
                if (!response.ok) {
                    console.error('Convert failed')
                    return
                }
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setResult(idx, url, { mime: blob.type, size: blob.size, format: targetValue })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const filename = (item, idx) => `converted-${idx + 1}.${extensionFromMime(item?.resultMeta?.mime)}`

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, filename(items[idx], idx))
    }

    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isConverting}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? `${item.resultMeta.format}` : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allConverted ? (
                    // ---- Converted panel ----
                    <ConvertDevelopedPanel 
                        files={files}
                        format={format}
                        convertedRatio={convertedRatio}
                        convertedTotal={convertedTotal}
                        originalTotal={originalTotal}
                        sizeDelta={sizeDelta}
                        FORMATS={FORMATS}
                        allConverted={allConverted}
                    />
                ) : (
                    // ---- Convert settings panel ----
                    <ConvertDevelopPanel
                        quality={quality}
                        setQuality={setQuality}
                        format={format}
                        setFormat={setFormat}
                        isConverting={isConverting}
                        FORMATS={FORMATS}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allConverted ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => filename(items[idx], idx))}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & convert again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleConvert} disabled={isConverting || files.length === 0 || !format}>
                            {isConverting ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Converting…
                                </>
                            ) : (
                                'Convert'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} converted`}
                    </p>
                </div>
            </SidebarPanel>
        </div>
    )
}

export default ConvertTool
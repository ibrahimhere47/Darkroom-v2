import React, { useState, useMemo } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw } from 'lucide-react'
import formatBytes from '../../utils/formatBytes'
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
import CompressDevelopedPanel from './CompressDevelopedPanel'
import CompressDevelopPanel from './CompressDevelopPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const CompressTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [quality, setQuality] = useState(70)
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allDeveloped,
        isProcessing: isCompressing,
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

    const originalTotal = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files])
    const compressedTotal = useMemo(
        () => items.reduce((sum, item) => sum + (item.resultMeta?.size || 0), 0),
        [items]
    )
    const savedBytes = Math.max(originalTotal - compressedTotal, 0)
    const savedPercent = originalTotal > 0 ? Math.round((savedBytes / originalTotal) * 100) : 0
    const compressedRatio = originalTotal > 0 ? compressedTotal / originalTotal : 0

    const handleCompress = async () => {
        if (files.length >= maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage('Our free tier only offers 20 files per batch')
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("quality", quality)

            try {
                const response = await fetch("https://adjusture-backend.vercel.app/compress", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    const { error } = await response.json()
                    throw new Error(error)
                }

                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setResult(idx, url, { size: blob.size })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, `compressed-${idx + 1}.jpg`)
    }

    const estimateRatio = (quality) => {
        const q = Math.min(Math.max(quality, 1), 100) / 100
        return 0.12 + 0.75 * Math.pow(q, 1.4)
    }

    const getHoverSize = (item, file) => ({
        current: formatBytes(file.size),
        estimated: `~${formatBytes(file.size * estimateRatio(quality))}`,
    })

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isCompressing}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? formatBytes(item.resultMeta.size) : null}
                getHoverSize={(item, idx) => getHoverSize(item, files[idx])}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allDeveloped ? (
                    // ---- Developed panel ----
                    <CompressDevelopedPanel
                        files={files}
                        quality={quality}
                        originalTotal={originalTotal}
                        compressedTotal={compressedTotal}
                        savedBytes={savedBytes}
                        savedPercent={savedPercent}
                        compressedRatio={compressedRatio}
                        allDeveloped={allDeveloped}
                    />
                ) : (
                    // ---- Develop panel ----
                    <CompressDevelopPanel
                        quality={quality}
                        setQuality={setQuality}
                        isCompressing={isCompressing}
                        originalTotal={originalTotal}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allDeveloped ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => `compressed-${idx + 1}.jpg`)}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & recompress
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleCompress} disabled={isCompressing || files.length === 0}>
                            {isCompressing ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Compressing…
                                </>
                            ) : (
                                'Compress'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} developed`}
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

export default CompressTool
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

const CompressTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [quality, setQuality] = useState(70)

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
        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append("File", file)
            formData.append("Quality", quality)

            try {
                const response = await fetch("https://darkroom-v2-backend-production.up.railway.app/compress", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    console.error("Compress failed")
                    return
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

    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isCompressing}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? formatBytes(item.resultMeta.size) : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allDeveloped ? (
                    // ---- Developed panel ----
                    <div className='flex flex-col gap-6 mb-11'>
                        <SidebarSection
                            eyebrow='Developed'
                            description={`${files.length} ${files.length === 1 ? 'image' : 'images'} processed at ${quality}% quality.`}
                        />

                        <StatHighlight value={`${savedPercent}%`} label='smaller' />

                        <ProgressBar
                            ratio={compressedRatio}
                            leftLabel={`${formatBytes(compressedTotal)} now`}
                            rightLabel={`${formatBytes(originalTotal)} original`}
                            animateKey={allDeveloped}
                        />

                        <StatRowList
                            rows={[
                                { label: 'Original size', value: formatBytes(originalTotal) },
                                { label: 'Compressed size', value: formatBytes(compressedTotal) },
                                { label: 'Saved', value: formatBytes(savedBytes), highlight: true },
                            ]}
                        />
                    </div>
                ) : (
                    // ---- Develop panel ----
                    <div className='flex flex-col gap-6'>
                        <SidebarSection eyebrow='Develop' description='Adjust quality, then compress your batch.' />

                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-sm tracking-widest text-neutral-400 uppercase'>Quality</span>
                                <span className='text-amber-47 text-lg font-semibold font-mono'>{quality}</span>
                            </div>
                            <input
                                type='range'
                                min='10'
                                max='100'
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                disabled={isCompressing}
                                className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-47 cursor-pointer disabled:opacity-40'
                            />
                            <div className='flex justify-between text-[14px] text-neutral-300 mt-1 font-mono'>
                                <span>10</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
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
    )
}

export default CompressTool
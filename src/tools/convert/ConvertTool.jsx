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
                    <div className='flex flex-col gap-6 mb-11'>
                        <SidebarSection
                            eyebrow='Converted'
                            description={`${files.length} ${files.length === 1 ? 'image' : 'images'} converted to ${FORMATS.find(f => f.id === format)?.label}.`}
                        />

                        <StatHighlight value={FORMATS.find(f => f.id === format)?.label} label='target format' />

                        <ProgressBar
                            ratio={convertedRatio}
                            leftLabel={`${formatBytes(convertedTotal)} now`}
                            rightLabel={`${formatBytes(originalTotal)} original`}
                            animateKey={allConverted}
                        />

                        <StatRowList
                            rows={[
                                { label: 'Original size', value: formatBytes(originalTotal) },
                                { label: 'Converted size', value: formatBytes(convertedTotal) },
                                {
                                    label: sizeDelta >= 0 ? 'Saved' : 'Added',
                                    value: formatBytes(Math.abs(sizeDelta)),
                                    highlight: true,
                                },
                            ]}
                        />
                    </div>
                ) : (
                    // ---- Convert settings panel ----
                    <div className='flex flex-col gap-6'>
                        <SidebarSection eyebrow='Develop' description='Adjust quality, select format, then convert your batch.' />

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
                                disabled={isConverting}
                                className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-47 cursor-pointer disabled:opacity-40'
                            />
                            <div className='flex justify-between text-[14px] text-neutral-300 mt-1 font-mono'>
                                <span>10</span>
                                <span>100</span>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2'>
                                {FORMATS.map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => setFormat(m.id)}
                                        disabled={isConverting}
                                        className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200 disabled:opacity-40 ${
                                            format === m.id
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
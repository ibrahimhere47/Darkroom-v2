import React, { useState } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw } from 'lucide-react'
import extensionFromMime from '../../utils/extensionFromMime'
import getImageDimensions from '../../utils/getImageDimensions'
import useToolFiles from '../../hooks/useToolFiles'
import useAnimatedRemove from '../../hooks/useAnimatedRemove'
import ToolStage from '../../components/tool-comps/ToolStage'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'
import WatermarkDevelopedPanel from './WatermarkDevelopedPanel'
import WatermarkDevelopPanel from './WatermarkDevelopPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const WATERMARK_ENDPOINT = 'http://localhost:8080/watermark'

const POSITIONS = [
    { id: 'topleft', label: 'Top left' },
    { id: 'topright', label: 'Top right' },
    { id: 'center', label: 'Center' },
    { id: 'bottomleft', label: 'Bottom left' },
    { id: 'bottomright', label: 'Bottom right' },
]

const WatermarkTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles

    const [text, setText] = useState('')
    const [position, setPosition] = useState('bottomright')
    const [opacity, setOpacity] = useState(60)
    const [fontSize, setFontSize] = useState(32)
    const [watermarkImage, setWatermarkImage] = useState(null)
    const [watermarkPreviewUrl, setWatermarkPreviewUrl] = useState(null)
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allWatermarked,
        isProcessing: isWatermarking,
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

    const handleWatermarkImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setWatermarkImage(file)
        setWatermarkPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return URL.createObjectURL(file)
        })
        e.target.value = ''
    }

    const handleRemoveWatermarkImage = () => {
        setWatermarkImage(null)
        setWatermarkPreviewUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev)
            return null
        })
    }

    const handleWatermark = async () => {
        if (files.length > maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage(`Our free tier only offers ${maxFilesPerBatch} files per batch`)
            return
        }

        if (!text.trim() && !watermarkImage) {
            setIsPopup(true)
            setPopupMessage('Add some watermark text or a logo image first')
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('file', file)
            if (watermarkImage) formData.append('watermarkFile', watermarkImage)
            if (text.trim()) formData.append('text', text.trim())
            formData.append('position', position)
            formData.append('opacity', opacity)
            formData.append('fontSize', fontSize)

            try {
                const response = await fetch(WATERMARK_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    console.error('Watermark failed')
                    return
                }

                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const dims = await getImageDimensions(blob).catch(() => ({}))
                setResult(idx, url, { ...dims, size: blob.size, mime: blob.type })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const filename = (item, idx) => `watermarked-${idx + 1}.${extensionFromMime(item?.resultMeta?.mime)}`

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, filename(items[idx], idx))
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isWatermarking}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta?.width ? `${item.resultMeta.width} × ${item.resultMeta.height}` : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allWatermarked ? (
                    // ---- Watermarked panel ----
                    <WatermarkDevelopedPanel
                        files={files}
                        position={position}
                        opacity={opacity}
                        watermarkedCount={items.filter((item) => item.resultUrl).length}
                    />
                ) : (
                    // ---- Watermark settings panel ----
                    <WatermarkDevelopPanel
                        text={text}
                        setText={setText}
                        position={position}
                        setPosition={setPosition}
                        opacity={opacity}
                        setOpacity={setOpacity}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        watermarkPreviewUrl={watermarkPreviewUrl}
                        onWatermarkImageChange={handleWatermarkImageChange}
                        onRemoveWatermarkImage={handleRemoveWatermarkImage}
                        isWatermarking={isWatermarking}
                        POSITIONS={POSITIONS}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allWatermarked ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => filename(items[idx], idx))}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & watermark again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton
                            onClick={handleWatermark}
                            disabled={isWatermarking || files.length === 0 || (!text.trim() && !watermarkImage)}
                        >
                            {isWatermarking ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Watermarking…
                                </>
                            ) : (
                                'Watermark'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} watermarked`}
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

export default WatermarkTool
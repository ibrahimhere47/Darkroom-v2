import React, { useState, useMemo } from 'react'
import gsap from 'gsap'
import { DownloadCloud, Loader2, RotateCcw } from 'lucide-react'
import useToolFiles from '../../hooks/useToolFiles'
import useAnimatedRemove from '../../hooks/useAnimatedRemove'
import ToolStage from '../../components/tool-comps/ToolStage'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'
import AddBackgroundDevelopPanel from './AddBackgroundDevelopPanel'
import AddBackgroundDevelopedPanel from './AddBackgroundDevelopedPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const AddBackgroundTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [color, setColor] = useState('#FFFFFF')
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allDeveloped,
        isProcessing: isFilling,
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

    const processedCount = items.filter((item) => item.resultUrl).length
    const outputTotal = useMemo(
        () => items.reduce((sum, item) => sum + (item.resultMeta?.size || 0), 0),
        [items]
    )

    const handleAddBackground = async () => {
        if (files.length > maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage(`Our free tier only offers ${maxFilesPerBatch} files per batch`)
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("color", color)

            try {
                const response = await fetch("https://adjusture-backend.vercel.app/add-background", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    const { error } = await response.json()
                    throw new Error(error)
                }

                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setResult(idx, url, { size: blob.size, color })
            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, `bg-${idx + 1}.png`)
    }

    const getBadge = (item) => {
        if (!item.resultMeta) return null
        return (
            <span
                className='inline-block w-3 h-3 rounded-full border border-white/20'
                style={{ backgroundColor: item.resultMeta.color }}
            />
        )
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono mt-12'>

            <ToolStage
                items={items}
                isProcessing={isFilling}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={getBadge}
                getHoverFormat={() => 'PNG'}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allDeveloped ? (
                    // ---- Developed panel ----
                    <AddBackgroundDevelopedPanel
                        files={files}
                        color={color}
                        processedCount={processedCount}
                        outputTotal={outputTotal}
                    />
                ) : (
                    // ---- Develop panel ----
                    <AddBackgroundDevelopPanel
                        color={color}
                        setColor={setColor}
                        isProcessing={isFilling}
                        fileCount={files.length}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allDeveloped ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => `bg-${idx + 1}.png`)}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Pick a new color
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleAddBackground} disabled={isFilling || files.length === 0}>
                            {isFilling ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Filling…
                                </>
                            ) : (
                                'Add Background'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${processedCount} developed`}
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

export default AddBackgroundTool
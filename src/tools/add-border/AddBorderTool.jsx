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
import AddBorderDevelopedPanel from './AddBorderDevelopedPanel'
import AddBorderDevelopPanel from './AddBorderDevelopPanel'
import { maxFilesPerBatch } from '../toolsRegistry'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const BORDER_ENDPOINT = 'https://adjusture-backend.vercel.app/border'

const AddBorderTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles

    const [width, setWidth] = useState(16)
    const [color, setColor] = useState('#000000')
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const {
        items,
        hasResults,
        allDone: allBordered,
        isProcessing: isBordering,
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

    const handleAddBorder = async () => {
        if (files.length >= maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage('Our free tier only offers 20 files per batch')
            return
        }

        if (!color.trim()) {
            setIsPopup(true)
            setPopupMessage('Pick a border color first')
            return
        }

        beginProcessing()

        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('width', width)
            formData.append('color', color.trim())

            try {
                const response = await fetch(BORDER_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    console.error('Add border failed')
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

    const filename = (item, idx) => `bordered-${idx + 1}.${extensionFromMime(item?.resultMeta?.mime)}`

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, filename(items[idx], idx))
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isBordering}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta?.width ? `${item.resultMeta.width} × ${item.resultMeta.height}` : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allBordered ? (
                    // ---- Bordered panel ----
                    <AddBorderDevelopedPanel
                        files={files}
                        width={width}
                        color={color}
                        borderedCount={items.filter((item) => item.resultUrl).length}
                    />
                ) : (
                    // ---- Add border settings panel ----
                    <AddBorderDevelopPanel
                        width={width}
                        setWidth={setWidth}
                        color={color}
                        setColor={setColor}
                        isBordering={isBordering}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allBordered ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => filename(items[idx], idx))}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & add border again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleAddBorder} disabled={isBordering || files.length === 0 || width <= 0}>
                            {isBordering ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Adding border…
                                </>
                            ) : (
                                'Add border'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} bordered`}
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

export default AddBorderTool
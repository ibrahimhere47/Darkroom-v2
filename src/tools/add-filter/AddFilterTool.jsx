import React, { useState } from 'react'
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
import { maxFilesPerBatch } from '../toolsRegistry'
import AddFilterDevelopPanel from './AddFilterDevelopPanel'
import AddFilterDevelopedPanel from './AddFilterDevelopedPanel'
import gsap from 'gsap'
import { Loader2, DownloadCloud, RotateCcw } from 'lucide-react'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const FILTERS = [
    'vintage',
    'sepia',
    'grayscale',
    'invert',
]

const AddFilterTool = (props) => {
    const files = props.files || []
    const setFiles = props.setFiles
    const [filter, setFilter] = useState('vintage')
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState(false)
    
    const {
        items,
        hasResults,
        allDone: allFiltered,
        isProcessing: isFiltering,
        beginProcessing,
        setResult,
        finishProcessing,
        resetResults,
        addFiles,
        removeFile,
        downloadFile,
        downloadAll,
    } = useToolFiles(files, setFiles)

    const handleFilter = async () => {
        if (files.length > maxFilesPerBatch) {
            setIsPopup(true)
            setPopupMessage(`Our free tier only offers ${maxFilesPerBatch} files per batch`)
            return
        }

        beginProcessing()

        const targetFilter = FILTERS.find(f => f === filter)
        
        await Promise.all(files.map(async (file, idx) => {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('filter', targetFilter)

            try {
                const response = await fetch('https://adjusture-backend.vercel.app/add-filter', { method: 'POST', body: formData })
                if (!response.ok) {
                    const { error } = response.json()
                    throw new Error(error)
                }
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                setResult(idx, url, { filter: targetFilter })

            } catch (err) {
                console.error(err)
            }
        }))

        finishProcessing()
    }

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        downloadFile(url, `filtered-${idx + 1}.jpg`)
    }

    const handleRemoveClick = useAnimatedRemove(removeFile)

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ToolStage
                items={items}
                isProcessing={isFiltering}
                onRemove={handleRemoveClick}
                onDownload={handleDownloadClick}
                getBadge={(item) => item.resultMeta ? `${item.resultMeta.width} × ${item.resultMeta.height}` : null}
                onAddFiles={addFiles}
            />

            <SidebarPanel>

                {allFiltered ? (
                    // ---- Resized panel ----
                    <AddFilterDevelopedPanel
                        files={files}
                        filter={filter}
                        FILTERS={FILTERS}
                        allFiltered={allFiltered}
                    />
                ) : (
                    // ---- Resize settings panel ----
                    <AddFilterDevelopPanel
                        filter={filter}
                        setFilter={setFilter}
                        isFiltering={isFiltering}
                        FILTERS={FILTERS}
                    />
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allFiltered ? (
                        <>
                            <ActionButton onClick={() => downloadAll((idx) => `filtered-${idx + 1}.jpg`)}>
                                <DownloadCloud size={16} />
                                Download all
                            </ActionButton>
                            <ActionButton variant='secondary' onClick={resetResults}>
                                <RotateCcw size={14} />
                                Adjust & resize again
                            </ActionButton>
                        </>
                    ) : (
                        <ActionButton onClick={handleFilter} disabled={isFiltering || files.length === 0 || !filter}>
                            {isFiltering ? (
                                <>
                                    <Loader2 size={16} className='animate-spin' />
                                    Filtering...
                                </>
                            ) : (
                                'Filter'
                            )}
                        </ActionButton>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${items.filter((item) => item.resultUrl).length} filtered`}
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

export default AddFilterTool
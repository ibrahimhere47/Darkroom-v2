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

    const handleFilter = async () => {
        if (files.length >= maxFilesPerBatch) {
            alert(`You can only convert up to ${maxFilesPerBatch} files at a time. Please remove some files and try again.`)
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
    }

    return (
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
                    <AddFilterDevelopedPanel />
                ) : (
                    // ---- Resize settings panel ----
                    <AddFilterDevelopPanel />
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

export default AddFilterTool
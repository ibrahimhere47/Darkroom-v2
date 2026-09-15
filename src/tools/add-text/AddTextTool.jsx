import React, { useState, useEffect } from 'react'
import { DownloadCloud, Loader2, Check } from 'lucide-react'
import extensionFromMime from '../../utils/extensionFromMime'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'
import AddTextStage from './AddTextStage'
import AddTextDevelopPanel from './AddTextDevelopPanel'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const ADD_TEXT_ENDPOINT = 'https://adjusture-backend.vercel.app/add-text'

// No shared frontend util for this yet — trims a trailing ".ext" off a filename.
const stripExtension = (name) => name.replace(/\.[^./\\]+$/, '')

const DEFAULTS = {
    text: 'Your text here',
    x: 50,
    y: 50,
    fontFamily: 'Inter',
    fontSize: 32,
    bold: false,
    italic: false,
    align: 'left',
    color: '#ffffff',
    strokeEnabled: false,
    strokeColor: '#000000',
    strokeWidth: 2,
    opacity: 100,
    rotation: 0,
}

const AddTextTool = (props) => {

    // This tool only ever operates on a single image, same as ColorCorrectTool.
    const files = props.files || []
    const setFiles = props.setFiles
    const file = files[0] || null

    const [previewUrl, setPreviewUrl] = useState(null)
    const [state, setState] = useState(DEFAULTS)
    const [isExporting, setIsExporting] = useState(false)
    const [justExported, setJustExported] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null)
            return
        }
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setState(DEFAULTS)
        setJustExported(false)
        return () => URL.revokeObjectURL(url)
    }, [file])

    const setField = (key, value) => {
        setState((prev) => ({ ...prev, [key]: value }))
        setJustExported(false)
    }

    const handlePositionChange = (x, y) => {
        setState((prev) => ({ ...prev, x, y }))
        setJustExported(false)
    }

    const handleFileSelected = (newFile) => setFiles([newFile])
    const handleRemove = () => setFiles([])

    const handleExport = async () => {
        if (!file || !state.text.trim()) return

        setIsExporting(true)
        setJustExported(false)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('text', state.text)
        formData.append('x', state.x)
        formData.append('y', state.y)
        formData.append('fontFamily', state.fontFamily)
        formData.append('fontSize', state.fontSize)
        formData.append('bold', state.bold ? 'true' : 'false')
        formData.append('italic', state.italic ? 'true' : 'false')
        formData.append('align', state.align)
        formData.append('color', state.color)
        if (state.strokeEnabled) {
            formData.append('strokeColor', state.strokeColor)
            formData.append('strokeWidth', state.strokeWidth)
        }
        formData.append('opacity', state.opacity)
        formData.append('rotation', state.rotation)

        try {
            const response = await fetch(ADD_TEXT_ENDPOINT, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                setIsPopup(true)
                setPopupMessage('Something went wrong while adding text')
                return
            }

            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const baseName = stripExtension(file.name)

            const link = document.createElement('a')
            link.href = url
            link.download = `${baseName}-text.${extensionFromMime(blob.type)}`
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)

            setJustExported(true)
        } catch (err) {
            console.error(err)
            setIsPopup(true)
            setPopupMessage('Something went wrong while adding text')
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <AddTextStage
                previewUrl={previewUrl}
                fileName={file?.name}
                text={state.text}
                x={state.x}
                y={state.y}
                onPositionChange={handlePositionChange}
                fontFamily={state.fontFamily}
                fontSize={state.fontSize}
                bold={state.bold}
                italic={state.italic}
                align={state.align}
                color={state.color}
                strokeColor={state.strokeEnabled ? state.strokeColor : null}
                strokeWidth={state.strokeWidth}
                opacity={state.opacity}
                rotation={state.rotation}
                onFileSelected={handleFileSelected}
                onRemove={handleRemove}
            />

            <SidebarPanel>

                <AddTextDevelopPanel
                    text={state.text}
                    setText={(v) => setField('text', v)}
                    fontFamily={state.fontFamily}
                    setFontFamily={(v) => setField('fontFamily', v)}
                    fontSize={state.fontSize}
                    setFontSize={(v) => setField('fontSize', v)}
                    bold={state.bold}
                    setBold={(v) => setField('bold', v)}
                    italic={state.italic}
                    setItalic={(v) => setField('italic', v)}
                    align={state.align}
                    setAlign={(v) => setField('align', v)}
                    color={state.color}
                    setColor={(v) => setField('color', v)}
                    strokeColor={state.strokeColor}
                    setStrokeColor={(v) => setField('strokeColor', v)}
                    strokeWidth={state.strokeWidth}
                    setStrokeWidth={(v) => setField('strokeWidth', v)}
                    strokeEnabled={state.strokeEnabled}
                    setStrokeEnabled={(v) => setField('strokeEnabled', v)}
                    opacity={state.opacity}
                    setOpacity={(v) => setField('opacity', v)}
                    rotation={state.rotation}
                    setRotation={(v) => setField('rotation', v)}
                    disabled={!file || isExporting}
                />

                <div className='w-full flex flex-col gap-3 items-center'>
                    <ActionButton onClick={handleExport} disabled={!file || !state.text.trim() || isExporting}>
                        {isExporting ? (
                            <>
                                <Loader2 size={16} className='animate-spin' />
                                Processing…
                            </>
                        ) : justExported ? (
                            <>
                                <Check size={16} />
                                Downloaded
                            </>
                        ) : (
                            <>
                                <DownloadCloud size={16} />
                                Download image
                            </>
                        )}
                    </ActionButton>

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {file ? '1 image loaded' : 'No image loaded'}
                    </p>
                </div>
            </SidebarPanel>
        </div>
        <Popup isOpen={isPopup} title={'Oops!'} description={'It seems something went wrong'} onClose={() => {setIsPopup(false)}} >
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

export default AddTextTool
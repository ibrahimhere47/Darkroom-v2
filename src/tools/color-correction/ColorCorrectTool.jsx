import React, { useState, useEffect, useMemo } from 'react'
import { DownloadCloud, Loader2, Check } from 'lucide-react'
import extensionFromMime from '../../utils/extensionFromMime'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'
import ColorCorrectStage from './ColorCorrectStage'
import ColorCorrectDevelopPanel from './ColorCorrectDevelopPanel'
import Popup from '../../components/Popup'
import HomePremiumAd from '../../components/home-comps/HomePremiumAd'

const COLOR_CORRECT_ENDPOINT = 'https://adjusture-backend.vercel.app/color-correct'

const DEFAULT_VALUES = { brightness: 1, contrast: 1, saturation: 1, hue: 0 }
const DEFAULT_GAMMA = 1.8

// No shared frontend util for this yet — trims a trailing ".ext" off a filename.
const stripExtension = (name) => name.replace(/\.[^./\\]+$/, '')

const ColorCorrectTool = (props) => {

    // This tool only ever operates on a single image, unlike the batch tools.
    const files = props.files || []
    const setFiles = props.setFiles
    const file = files[0] || null

    const [previewUrl, setPreviewUrl] = useState(null)
    const [values, setValues] = useState(DEFAULT_VALUES)
    const [gammaEnabled, setGammaEnabled] = useState(false)
    const [gamma, setGamma] = useState(DEFAULT_GAMMA)
    const [isExporting, setIsExporting] = useState(false)
    const [justExported, setJustExported] = useState(false)
    const [isPopup, setIsPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    // Keep a fresh object URL for whichever file is currently loaded, and
    // reset the sliders whenever a new image comes in.
    useEffect(() => {
        if (!file) {
            setPreviewUrl(null)
            return
        }
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setValues(DEFAULT_VALUES)
        setGammaEnabled(false)
        setGamma(DEFAULT_GAMMA)
        setJustExported(false)
        return () => URL.revokeObjectURL(url)
    }, [file])

    const cssFilter = useMemo(() => {
        // Direct analogs of the backend's modulate()/linear() math, so what you
        // see here matches the exported result (gamma excluded, see panel note).
        return `brightness(${values.brightness}) contrast(${values.contrast}) saturate(${values.saturation}) hue-rotate(${values.hue}deg)`
    }, [values])

    const setValue = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }))
        setJustExported(false)
    }

    const handleReset = () => {
        setValues(DEFAULT_VALUES)
        setGammaEnabled(false)
        setGamma(DEFAULT_GAMMA)
        setJustExported(false)
    }

    const handleFileSelected = (newFile) => {
        setFiles([newFile])
    }

    const handleRemove = () => {
        setFiles([])
    }

    const handleExport = async () => {
        if (!file) return

        setIsExporting(true)
        setJustExported(false)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('brightness', values.brightness)
        formData.append('contrast', values.contrast)
        formData.append('saturation', values.saturation)
        formData.append('hue', values.hue)
        if (gammaEnabled) formData.append('gamma', gamma)

        try {
            const response = await fetch(COLOR_CORRECT_ENDPOINT, {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                setIsPopup(true)
                setPopupMessage('Something went wrong while correcting the image')
                return
            }

            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const baseName = stripExtension(file.name)

            const link = document.createElement('a')
            link.href = url
            link.download = `${baseName}-corrected.${extensionFromMime(blob.type)}`
            document.body.appendChild(link)
            link.click()
            link.remove()
            URL.revokeObjectURL(url)

            setJustExported(true)
        } catch (err) {
            console.error(err)
            setIsPopup(true)
            setPopupMessage('Something went wrong while correcting the image')
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <>
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <ColorCorrectStage
                previewUrl={previewUrl}
                cssFilter={cssFilter}
                onFileSelected={handleFileSelected}
                onRemove={handleRemove}
                fileName={file?.name}
            />

            <SidebarPanel>

                <ColorCorrectDevelopPanel
                    values={values}
                    setValue={setValue}
                    onReset={handleReset}
                    gammaEnabled={gammaEnabled}
                    setGammaEnabled={setGammaEnabled}
                    gamma={gamma}
                    setGamma={setGamma}
                    disabled={!file || isExporting}
                />

                <div className='w-full flex flex-col gap-3 items-center'>
                    <ActionButton onClick={handleExport} disabled={!file || isExporting}>
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
                                Download corrected image
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

export default ColorCorrectTool
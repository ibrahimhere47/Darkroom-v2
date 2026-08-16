import React, { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { Save, RotateCcw } from 'lucide-react'
import DoodleCanvas from './DoodleCanvas'
import DoodleStage from './DoodleStage'
import DoodleDevelopPanel from './DoodleDevelopPanel'
import getImageDimensions from '../../utils/getImageDimensions'
import ActionButton from '../../components/tool-comps/ActionButton'
import { SidebarPanel } from '../../components/tool-comps/ToolSidebar'

const BRUSH_PRESETS = ['#000000', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ffffff']

const DoodleTool = (props) => {
    const files = props.files
    const setFiles = props.setFiles

    const [imageUrl, setImageUrl] = useState(null)
    const [width, setWidth] = useState(1024)
    const [height, setHeight] = useState(724)
    const [brushColor, setBrushColor] = useState('#000000')
    const [brushSize, setBrushSize] = useState(6)
    const [isErasing, setIsErasing] = useState(false)
    const [canUndo, setCanUndo] = useState(false)
    const [canRedo, setCanRedo] = useState(false)
    const [strokeCount, setStrokeCount] = useState(0)
    const [isSaving, setIsSaving] = useState(false)
    const [justSaved, setJustSaved] = useState(false)

    const canvasRef = useRef(null)
    const saveTimeoutRef = useRef(null)

    useEffect(() => {
        if (!files || files.length === 0) {
            setImageUrl(null)
            return
        }
        const url = URL.createObjectURL(files[0])
        setImageUrl(url)
        return () => URL.revokeObjectURL(url)
    }, [files])

    useEffect(() => {
        if (!files || files.length === 0) return
        let cancelled = false
        getImageDimensions(files[0])
            .then(({ width: w, height: h }) => {
                if (cancelled) return
                setWidth(w)
                setHeight(h)
            })
            .catch(() => {})
        return () => { cancelled = true }
    }, [files])

    useEffect(() => () => clearTimeout(saveTimeoutRef.current), [])

    const handleUndo = useCallback(() => canvasRef.current?.undo(), [])
    const handleRedo = useCallback(() => canvasRef.current?.redo(), [])

    const handleClear = useCallback(() => {
        canvasRef.current?.clear()
        setJustSaved(false)
    }, [])

    const handleColorChange = useCallback((color) => {
        setBrushColor(color)
        setIsErasing(false)
    }, [])

    const handleSave = useCallback(async (e) => {
        if (!files?.[0]) return

        if (e?.currentTarget) {
            gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        }

        setIsSaving(true)

        const blob = await canvasRef.current?.exportComposite()

        if (!blob) {
            setIsSaving(false)
            return
        }

        const originalName = files[0].name.replace(/\.[^.]+$/, '')

        const doodledFile = new File(
            [blob],
            `${originalName}-doodled.png`,
            { type: 'image/png' }
        )

        setFiles([doodledFile, ...files.slice(1)])

        setIsSaving(false)
        setJustSaved(true)

        clearTimeout(saveTimeoutRef.current)
        saveTimeoutRef.current = setTimeout(() => setJustSaved(false), 2200)
    }, [files, setFiles])

    if (!files || files.length === 0) {
        return (
            <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>
                <DoodleStage imageUrl={null} />
            </div>
        )
    }

    return (
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <DoodleStage imageUrl={imageUrl}>
                {imageUrl && (
                    <DoodleCanvas
                        ref={canvasRef}
                        imageUrl={imageUrl}
                        imageWidth={width}
                        imageHeight={height}
                        brushColor={brushColor}
                        brushSize={brushSize}
                        isErasing={isErasing}
                        onHistoryChange={({ canUndo, canRedo, strokeCount }) => {
                            setCanUndo(canUndo)
                            setCanRedo(canRedo)
                            if (typeof strokeCount === 'number') setStrokeCount(strokeCount)
                        }}
                    />
                )}
            </DoodleStage>

            <SidebarPanel>
                <DoodleDevelopPanel
                    brushColor={brushColor}
                    onColorChange={handleColorChange}
                    presets={BRUSH_PRESETS}
                    brushSize={brushSize}
                    onBrushSizeChange={setBrushSize}
                    isErasing={isErasing}
                    onToggleErase={() => setIsErasing((v) => !v)}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    onUndo={handleUndo}
                    onRedo={handleRedo}
                    width={width}
                    height={height}
                    strokeCount={strokeCount}
                />

                <div className='w-full flex flex-col gap-4 items-center'>
                    <ActionButton onClick={handleSave} disabled={isSaving || !imageUrl}>
                        <Save size={16} />
                        {isSaving ? 'Saving…' : justSaved ? 'Saved ✓' : 'Save doodle'}
                    </ActionButton>

                    <ActionButton variant='secondary' onClick={handleClear} disabled={!canUndo && strokeCount === 0}>
                        <RotateCcw size={14} />
                        Clear canvas
                    </ActionButton>

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {width} × {height}px
                        {strokeCount > 0 && ` · ${strokeCount} ${strokeCount === 1 ? 'stroke' : 'strokes'}`}
                    </p>
                </div>
            </SidebarPanel>
        </div>
    )
}

export default DoodleTool
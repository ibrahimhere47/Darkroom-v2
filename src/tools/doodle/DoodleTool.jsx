import React, { useState, useEffect, useRef, useCallback } from 'react'
import DoodleCanvas from './DoodleCanvas'
import getImageDimensions from '../../utils/getImageDimensions'

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

    const canvasRef = useRef(null)

    // Object URLs are the bridge between a File and something <img> can render
    useEffect(() => {
        if (!files || files.length === 0) {
            setImageUrl(null)
            return
        }
        const url = URL.createObjectURL(files[0])
        setImageUrl(url)
        return () => URL.revokeObjectURL(url) // avoid leaking a URL per file change
    }, [files])

    // Full-resolution dimensions, so strokes aren't captured at preview resolution
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

    const handleUndo = useCallback(() => canvasRef.current?.undo(), [])
    const handleRedo = useCallback(() => canvasRef.current?.redo(), [])
    const handleClear = useCallback(() => canvasRef.current?.clear(), [])

    const handleSave = useCallback(async () => {
        if (!files?.[0]) return

        const blob = await canvasRef.current?.exportComposite()

        if (!blob) return

        const originalName = files[0].name
            .replace(/\.[^.]+$/, '')

        const doodledFile = new File(
            [blob],
            `${originalName}-doodled.png`,
            {
                type: 'image/png',
            }
        )

        setFiles([
            doodledFile,
            ...files.slice(1),
        ])
    })


    if (!files || files.length === 0) {
        return <p>Upload an image to start doodling.</p>
    }

    return (
        <div className="doodle-tool">
            <div className="doodle-toolbar">
                <label>
                    Color
                    <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => { setBrushColor(e.target.value); setIsErasing(false) }}
                    />
                </label>

                <label>
                    Size
                    <input
                        type="range"
                        min={1}
                        max={50}
                        value={brushSize}
                        onChange={(e) => setBrushSize(Number(e.target.value))}
                    />
                    <span>{brushSize}px</span>
                </label>

                <button type="button" onClick={() => setIsErasing((v) => !v)} aria-pressed={isErasing}>
                    {isErasing ? 'Erasing' : 'Eraser'}
                </button>

                <button type="button" onClick={handleUndo} disabled={!canUndo}>Undo</button>
                <button type="button" onClick={handleRedo} disabled={!canRedo}>Redo</button>
                <button type="button" onClick={handleClear}>Clear</button>
                <button type="button" onClick={handleSave}>Save</button>
            </div>

            {imageUrl && (
                <DoodleCanvas
                    ref={canvasRef}
                    imageUrl={imageUrl}
                    imageWidth={width}
                    imageHeight={height}
                    brushColor={brushColor}
                    brushSize={brushSize}
                    isErasing={isErasing}
                    onHistoryChange={({ canUndo, canRedo }) => {
                        setCanUndo(canUndo)
                        setCanRedo(canRedo)
                    }}
                />
            )}
        </div>
    )
}

export default DoodleTool
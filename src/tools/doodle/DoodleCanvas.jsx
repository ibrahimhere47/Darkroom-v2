import { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'

const DoodleCanvas = forwardRef(function DoodleCanvas({ imageUrl, imageWidth, imageHeight, brushColor, brushSize, isErasing, onHistoryChange }, ref) {
    const displayRef = useRef(null)
    const exportCanvasRef = useRef(null)
    const imgElRef = useRef(null)
    const [strokes, setStrokes] = useState([])
    const [redoStack, setRedoStack] = useState([])
    const currentStroke = useRef(null)

    useEffect(() => {
        onHistoryChange?.({ canUndo: strokes.length > 0, canRedo: redoStack.length > 0 })
    }, [strokes, redoStack, onHistoryChange])

    const toImageCoords = (e) => {
        const rect = displayRef.current.getBoundingClientRect()
        const scaleX = imageWidth / rect.width
        const scaleY = imageHeight / rect.height
        return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
        }
    }

    const drawStroke = (ctx, stroke, scaleX, scaleY) => {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.globalCompositeOperation = stroke.erase ? 'destination-out' : 'source-over'
        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.size * scaleX
        ctx.beginPath()
        stroke.points.forEach((p, i) => {
        const x = p.x * scaleX
        const y = p.y * scaleY
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        })
        ctx.stroke()
    }

    const redrawPreview = useCallback(() => {
        const canvas = displayRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const scaleX = rect.width / imageWidth
        const scaleY = rect.height / imageHeight

        for (const stroke of [...strokes, currentStroke.current].filter(Boolean)) {
        drawStroke(ctx, stroke, scaleX, scaleY)
        }
    }, [strokes, imageWidth, imageHeight])

    useEffect(() => { redrawPreview() }, [redrawPreview])

    useEffect(() => {
        window.addEventListener('resize', redrawPreview)
        return () => window.removeEventListener('resize', redrawPreview)
    }, [redrawPreview])

    const handlePointerDown = (e) => {
        displayRef.current.setPointerCapture(e.pointerId)
        currentStroke.current = {
        color: brushColor,
        size: brushSize,
        erase: isErasing,
        points: [toImageCoords(e)],
        }
    }

    const handlePointerMove = (e) => {
        if (!currentStroke.current) return
        currentStroke.current.points.push(toImageCoords(e))
        redrawPreview()
    }

    const handlePointerUp = () => {
        if (!currentStroke.current) return
        setStrokes((prev) => [...prev, currentStroke.current])
        setRedoStack([])
        currentStroke.current = null
    }

    useImperativeHandle(ref, () => ({
        undo: () => {
        setStrokes((prev) => {
            if (prev.length === 0) return prev
            const last = prev[prev.length - 1]
            setRedoStack((r) => [...r, last])
            return prev.slice(0, -1)
        })
        },
        redo: () => {
        setRedoStack((prev) => {
            if (prev.length === 0) return prev
            const last = prev[prev.length - 1]
            setStrokes((s) => [...s, last])
            return prev.slice(0, -1)
        })
        },
        clear: () => {
        setStrokes([])
        setRedoStack([])
        },
        // Flattens the original image + strokes at FULL resolution, regardless of preview size
        exportComposite: () => new Promise((resolve) => {
        const canvas = exportCanvasRef.current
        canvas.width = imageWidth
        canvas.height = imageHeight
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, imageWidth, imageHeight)
        ctx.drawImage(imgElRef.current, 0, 0, imageWidth, imageHeight)
        for (const stroke of strokes) {
            drawStroke(ctx, stroke, 1, 1) // already in image-space, no scaling needed
        }
        canvas.toBlob(resolve, 'image/png')
        }),
    }), [strokes, imageWidth, imageHeight])

    return (
        <div style={{ position: 'relative', width: '100%' }}>
        <img
            ref={imgElRef}
            src={imageUrl}
            width={imageWidth}
            height={imageHeight}
            alt=""
            style={{ width: '100%', display: 'block' }}
            onLoad={redrawPreview}
        />
        <canvas
            ref={displayRef}
            style={{ position: 'absolute', inset: 0, touchAction: 'none', cursor: 'crosshair' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        />
        <canvas ref={exportCanvasRef} style={{ display: 'none' }} />
        </div>
    )
})

export default DoodleCanvas
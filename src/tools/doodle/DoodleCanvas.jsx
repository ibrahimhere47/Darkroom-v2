import {
    useRef,
    useState,
    useCallback,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react'

const DoodleCanvas = forwardRef(function DoodleCanvas(
    {
        imageUrl,
        imageWidth,
        imageHeight,
        brushColor,
        brushSize,
        isErasing,
        onHistoryChange,
    },
    ref
) {
    const canvasRef = useRef(null)
    const imageRef = useRef(null)

    const [strokes, setStrokes] = useState([])
    const [redoStack, setRedoStack] = useState([])

    const currentStroke = useRef(null)
    const isDrawing = useRef(false)

    const drawStroke = useCallback((ctx, stroke) => {
        if (!stroke || stroke.points.length === 0) return

        ctx.save()

        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.globalCompositeOperation = stroke.erase
            ? 'destination-out'
            : 'source-over'

        ctx.strokeStyle = stroke.color
        ctx.lineWidth = stroke.size

        ctx.beginPath()

        const first = stroke.points[0]
        ctx.moveTo(first.x, first.y)

        for (let i = 1; i < stroke.points.length; i++) {
            const point = stroke.points[i]
            ctx.lineTo(point.x, point.y)
        }

        if (stroke.points.length === 1) {
            ctx.arc(
                first.x,
                first.y,
                stroke.size / 2,
                0,
                Math.PI * 2
            )
            ctx.fillStyle = stroke.color
            ctx.fill()
        } else {
            ctx.stroke()
        }

        ctx.restore()
    }, [])

    const redraw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        ctx.clearRect(
            0,
            0,
            imageWidth,
            imageHeight
        )

        for (const stroke of strokes) {
            drawStroke(ctx, stroke)
        }

        if (currentStroke.current) {
            drawStroke(ctx, currentStroke.current)
        }
    }, [strokes, imageWidth, imageHeight, drawStroke])

    useEffect(() => {
        redraw()
    }, [redraw])

    const getImagePoint = useCallback((event) => {
        const canvas = canvasRef.current
        if (!canvas) return null

        const rect = canvas.getBoundingClientRect()

        const scaleX = imageWidth / rect.width
        const scaleY = imageHeight / rect.height

        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY,
        }
    }, [imageWidth, imageHeight])

    const handlePointerDown = (event) => {
        if (event.button !== 0) return

        event.preventDefault()

        const point = getImagePoint(event)
        if (!point) return

        const canvas = canvasRef.current

        canvas.setPointerCapture(event.pointerId)

        isDrawing.current = true

        currentStroke.current = {
            color: brushColor,
            size: brushSize,
            erase: isErasing,
            points: [point],
        }

        redraw()
    }

    const handlePointerMove = (event) => {
        if (!isDrawing.current || !currentStroke.current) return

        event.preventDefault()

        const point = getImagePoint(event)
        if (!point) return

        currentStroke.current.points.push(point)

        redraw()
    }

    const finishStroke = (event) => {
        if (!isDrawing.current) return

        event.preventDefault()

        const canvas = canvasRef.current

        if (
            event.pointerId !== undefined &&
            canvas.hasPointerCapture(event.pointerId)
        ) {
            canvas.releasePointerCapture(event.pointerId)
        }

        isDrawing.current = false

        const finishedStroke = currentStroke.current

        if (!finishedStroke) return

        currentStroke.current = null

        setStrokes((prev) => [
            ...prev,
            finishedStroke,
        ])

        setRedoStack([])
    }

    useEffect(() => {
        onHistoryChange?.({
            canUndo: strokes.length > 0,
            canRedo: redoStack.length > 0,
            strokeCount: strokes.length,
        })
    }, [strokes.length, redoStack.length, onHistoryChange])

    useImperativeHandle(
        ref,
        () => ({
            undo() {
                setStrokes((prev) => {
                    if (prev.length === 0) return prev

                    const lastStroke = prev[prev.length - 1]

                    setRedoStack((redo) => [
                        ...redo,
                        lastStroke,
                    ])

                    return prev.slice(0, -1)
                })
            },

            redo() {
                setRedoStack((prev) => {
                    if (prev.length === 0) return prev

                    const lastStroke = prev[prev.length - 1]

                    setStrokes((current) => [
                        ...current,
                        lastStroke,
                    ])

                    return prev.slice(0, -1)
                })
            },

            clear() {
                setStrokes([])
                setRedoStack([])
                currentStroke.current = null
                isDrawing.current = false
            },

            async exportComposite() {
                const image = imageRef.current

                if (!image) return null

                const exportCanvas = document.createElement('canvas')

                exportCanvas.width = imageWidth
                exportCanvas.height = imageHeight

                const ctx = exportCanvas.getContext('2d')

                ctx.drawImage(
                    image,
                    0,
                    0,
                    imageWidth,
                    imageHeight
                )

                for (const stroke of strokes) {
                    drawStroke(ctx, stroke)
                }

                return new Promise((resolve) => {
                    exportCanvas.toBlob(
                        resolve,
                        'image/png'
                    )
                })
            },
        }),
        [
            strokes,
            imageWidth,
            imageHeight,
            drawStroke,
        ]
    )

    const handleImageLoad = () => {
        redraw()
    }

    return (
        <div className="relative w-full overflow-hidden rounded-xl">
            <img
                ref={imageRef}
                src={imageUrl}
                alt=""
                draggable={false}
                className="block w-full h-auto select-none"
                onLoad={handleImageLoad}
            />

            <canvas
                ref={canvasRef}
                width={imageWidth}
                height={imageHeight}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishStroke}
                onPointerCancel={finishStroke}
            />
        </div>
    )
})

export default DoodleCanvas
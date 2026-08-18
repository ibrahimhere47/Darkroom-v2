import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Upload } from 'lucide-react'

const ToolPageDropZone = (props) => {
    const fileInputRef = useRef(null)
    const containerRef = useRef(null)
    const iconRef = useRef(null)
    const buttonRef = useRef(null)
    const dragCounter = useRef(0)
    const [isDragging, setIsDragging] = useState(false)
    const setFiles = props.setFiles

    const handleFiles = (fileList) => {
        const files = Array.from(fileList)
        if (files.length === 0) return
        setFiles(files)
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleInputChange = (e) => {
        handleFiles(e.target.files)
        e.target.value = ''
    }

    // dragenter/dragleave counter — fixes the bubbling flicker
    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current += 1
        if (dragCounter.current === 1) {
            setIsDragging(true)
            props.onDragEnter?.()
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current -= 1
        if (dragCounter.current === 0) {
            setIsDragging(false)
            props.onDragLeave?.()
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCounter.current = 0
        setIsDragging(false)
        props.onDragLeave?.()
        handleFiles(e.dataTransfer.files)
    }

    // drag-state driven animation — border pulse + icon bounce
    useGSAP(() => {
        if (isDragging) {
            gsap.to(containerRef.current, {
                scale: 1.015,
                duration: 0.35,
                ease: 'power3.out',
            })
            gsap.to(iconRef.current, {
                y: -6,
                duration: 0.6,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            })
        } else {
            gsap.killTweensOf(iconRef.current)
            gsap.to(containerRef.current, {
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
            })
            gsap.to(iconRef.current, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }, [isDragging])

    const handleButtonEnter = () => {
        gsap.to(buttonRef.current, { scale: 1.04, duration: 0.25, ease: 'power2.out' })
    }
    const handleButtonLeave = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    const handleButtonDown = () => {
        gsap.to(buttonRef.current, { scale: 0.96, duration: 0.1, ease: 'power2.out' })
    }
    const handleButtonUp = () => {
        gsap.to(buttonRef.current, { scale: 1.04, duration: 0.15, ease: 'power2.out' })
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-115 rounded-2xl flex flex-col gap-4 justify-center items-center border-6 border-solid transition-colors duration-300 ${
                isDragging
                    ? 'bg-amber-transparent-dim border-black'
                    : 'bg-amber-transparent border-amber-transparent-dim'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Upload color='black' strokeWidth={3} size={45} ref={iconRef} />

            <button
                ref={buttonRef}
                onClick={handleBrowseClick}
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                onMouseDown={handleButtonDown}
                onMouseUp={handleButtonUp}
                className="bg-black px-6 py-4 rounded-2xl h-max text-2xl font-mono cursor-pointer text-white"
            >
                Browse Images
            </button>

            <h1 className="text-black font-mono font-bold text-xl">
                {isDragging ? 'Drop it' : 'Or Drag and Drop'}
            </h1>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
            />
        </div>
    )
}

export default ToolPageDropZone
import React from 'react'
import { useRef, useState } from 'react'

const ToolPageDropZone = (props) => {

    const fileInputRef = useRef(null)
    const containerRef = useRef(null)
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

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const handleMouseEnter = () => {
        return
    }

    const handleMouseLeave = () => {
        return
    }

    return (
        <div 
            className='bg-amber-transparent w-1/2 h-full rounded-2xl flex flex-col gap-3 justify-center items-center border-6 border-solid border-amber-transparent-dim'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            <button onClick={handleBrowseClick} className='bg-black p-4 rounded-2xl h-max text-3xl font-mono cursor-pointer'>Browse Images</button>
            <h1 className='text-black font-mono font-bold text-2xl'>Or Drag and Drop</h1>
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
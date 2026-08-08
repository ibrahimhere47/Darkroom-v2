import React, { Suspense, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../Layout'
import { getTool } from '../../tools/toolsRegistry'
import ToolPageNotFound from './ToolPageNotFound'
import ToolPageHeader from './ToolPageHeader'

const FirstToolAppearance = (props) => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    if (!tool) return <ToolPageNotFound/>

    const fileInputRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleFiles = (fileList) => {
        const files = Array.from(fileList)
        if (files.length === 0) return
        console.log(files)
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }

    const handleInputChange = (e) => {
        console.log(e)
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

    return (
        <Layout>
        <ToolPageHeader />
        <Suspense fallback={<p className="mono">Loading tool…</p>}>
            <div className='flex w-full h-[80vh] justify-center my-16'>
                <div className='w-1/2 h-full flex flex-col justify-center'>
                    <video src={props.video}></video>
                    <h1>Drag or Browse Files to compress</h1>
                </div>
                <div 
                    className='bg-amber-47 w-1/3 h-full rounded-2xl opacity-85 flex justify-center'
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <button onClick={handleBrowseClick}>Browse Images</button>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleInputChange}
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </Suspense>
        </Layout>
    )
}

export default FirstToolAppearance
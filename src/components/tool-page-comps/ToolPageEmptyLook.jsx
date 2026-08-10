import React, { Suspense, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Layout from '../Layout'
import { getTool } from '../../tools/toolsRegistry'
import ToolPageNotFound from './ToolPageNotFound'
import ToolPageHeader from './ToolPageHeader'
import ToolPageDropZone from './ToolPageDropZone'

gsap.registerPlugin(useGSAP)

const ToolPageEmptyLook = (props) => {
    const { toolId } = useParams()
    const tool = getTool(toolId)

    const containerRef = useRef(null)
    const blobRef = useRef(null)

    useGSAP(() => {
        if (!blobRef.current) return;

        gsap.to(blobRef.current, {
            x: 80,
            y: -50,
            scale: 1.15,
            duration: 14,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        })
    }, { scope: containerRef })

    if (!tool) return <ToolPageNotFound />

    return (
        <Layout>
            <ToolPageHeader />
                <div
                    ref={containerRef}
                    className="relative flex flex-col items-center justify-center w-full min-h-[80vh] mb-4 sm:px-6 overflow-hidden isolate"
                >
                    <div
                        ref={blobRef}
                        className="pointer-events-none absolute inset-0 flex items-start justify-center z-0"
                    >
                        <div
                            className="w-150 h-150 rounded-full blur-3xl opacity-25"
                            style={{
                                background: 'radial-gradient(circle, rgba(217,143,58,0.7), transparent 70%)',
                            }}
                        />
                    </div>

                    <div className="text-center max-w-lg mb-5 md:mb-8 xl:mb-10">
                        <h1 className="text-3xl sm:text-5xl font-zilla flex flex-wrap justify-center gap-x-3 gap-y-1">
                            Drag or Browse Files to {tool.id}
                        </h1>
                    </div>

                    <div className='w-full md:w-5/6 h-full'>
                        <ToolPageDropZone setFiles={props.setFiles} />
                    </div>
                </div>
        </Layout>
    )
}

export default ToolPageEmptyLook
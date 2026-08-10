import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/hero-comps/Hero'
import Loader from '../components/Loader'
import { tools } from '../tools/toolsRegistry'
import gsap from 'gsap'

const LOADER_SEEN_KEY = 'hasSeenLoader'

const Home = () => {
    // Only show the loader if it hasn't been shown yet this session
    const [showLoader, setShowLoader] = useState(
        () => typeof window !== 'undefined' && !sessionStorage.getItem(LOADER_SEEN_KEY)
    )
    const loaderRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!loaderRef.current) return;

            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    setShowLoader(false)
                    sessionStorage.setItem(LOADER_SEEN_KEY, 'true')
                }
            })
        }, 1500)

        return () => {
            clearTimeout(timer)
        }
    }, [showLoader])

    return (
        <>
            <Layout>
                <div className='py-8 md:py-10 w-full'>
                    <Hero />
                    <div className='bg-neutral-900 rounded-2xl p-5 md:p-10 md:border border-neutral-700'>
                        <div className='flex flex-wrap gap-4'>
                            {tools.map((tool, idx) => (
                                <div
                                    key={idx}
                                    className='w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-12px)] [@media(min-width:2560px)]:w-[calc(20%-13px)] min-w-0 shrink-0'
                                >
                                    <ToolCard tool={tool} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>

            {showLoader ? <Loader ref={loaderRef} /> : null}
        </>
    )
}

export default Home
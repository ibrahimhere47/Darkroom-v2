import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/hero-comps/Hero'
import Loader from '../components/Loader'
import HomePremiumAd from '../components/home-comps/HomePremiumAd'
import HomeCategoryBtns from '../components/home-comps/HomeCategoryBtns'
import { tools } from '../tools/toolsRegistry'
import gsap from 'gsap'

const LOADER_SEEN_KEY = 'hasSeenLoader'

const Home = () => {
    const [showLoader, setShowLoader] = useState(
        () => typeof window !== 'undefined' && !sessionStorage.getItem(LOADER_SEEN_KEY)
    )
    const loaderRef = useRef(null)
    const [activeCategory, setActiveCategory] = useState('All')

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

    const categories = [
        {
            name: 'All',
            tools: tools
        },
        {
            name: 'Optimize',
            tools: tools.filter(tool => ['compress', 'remove-background', 'upscale'].includes(tool.id))
        },
        {
            name: 'Edit',
            tools: tools.filter(tool => ['add-background', 'remove-background', 'add-text', 'remove-text', 'add-border', 'doodle'].includes(tool.id))
        },
        {
            name: 'Properties',
            tools: tools.filter(tool => ['convert', 'resize', 'rotate', 'round-corners'].includes(tool.id))
        },
        {
            name: 'Effects',
            tools: tools.filter(tool => ['add-filter', 'color-correction'].includes(tool.id))
        },
        {
            name: 'Security',
            tools: tools.filter(tool => ['watermark', 'remove-watermark'].includes(tool.id))
        },
    ]

    const activeTools = categories.find(c => c.name === activeCategory)?.tools ?? []

    return (
        <>
            <Layout>
                <div className='py-8 md:py-10 w-full'>
                    <Hero />
                    <HomeCategoryBtns
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />

                    <div className='bg-neutral-900 rounded-2xl p-5 md:p-10 md:border border-neutral-700'>
                        <div className='flex flex-wrap gap-4'>
                            {activeTools.map((tool, toolIdx) => (
                                <div
                                    key={toolIdx}
                                    className='w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-12px)] [@media(min-width:2560px)]:w-[calc(20%-13px)] min-w-0 shrink-0'
                                >
                                    <ToolCard tool={tool} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <HomePremiumAd />
                </div>
            </Layout>

            {showLoader ? <Loader ref={loaderRef} /> : null}
        </>
    )
}

export default Home
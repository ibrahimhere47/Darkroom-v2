import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/hero-comps/Hero'
import Loader from '../components/Loader'
import HomePremiumAd from '../components/home-comps/HomePremiumAd'
import HomeCategoryBtns from '../components/home-comps/HomeCategoryBtns'
import HomeToolSearchBar from '../components/home-comps/HomeToolSearchBar'
import { tools, CATEGORIES } from '../tools/toolsRegistry'
import gsap from 'gsap'
import PremiumBanner from '../components/PremiumBanner'
import { AlertTriangleIcon } from 'lucide-react'

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

    const [searchInput, setSearchInput] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const categoryTools = CATEGORIES.find(c => c.name === activeCategory)?.tools ?? []
    const activeTools = categoryTools.filter(t => {
        const name = t.name.toLowerCase()
        return (
            name.includes(isSearching ? searchInput : name)
        )
    }) ?? []

    return (
        <>
            <Layout>
                <div className='py-8 md:py-10 w-full'>
                    <Hero />
                    <HomeToolSearchBar
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        isSearching={isSearching}
                        setIsSearching={setIsSearching}
                    />
                    <HomeCategoryBtns
                        CATEGORIES={CATEGORIES}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />

                    <div className='rounded-2xl p-5 md:pb-2 md:px-9 md:pt-4'>
                            {activeTools.length > 0 ?
                                <div className='flex flex-wrap gap-4'>
                                    {activeTools.map((tool) => (
                                        <div
                                            key={tool.id}
                                            className='w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-12px)] [@media(min-width:2560px)]:w-[calc(20%-13px)] min-w-0 shrink-0'
                                        >
                                            <ToolCard tool={tool} color={tool.categoryColor} />
                                        </div>
                                    ))}
                            </div>
                            : <h1 className='flex justify-center items-center gap-3 font-mono text-neutral-400 font-bold text-2xl w-full mt-4'>No tools were found matching your selection<AlertTriangleIcon size={30} /></h1>}
                    </div>
                </div>
                <div className='flex justify-center'>
                    <PremiumBanner />
                </div>
            </Layout>

            {showLoader ? <Loader ref={loaderRef} /> : null}
        </>
    )
}

export default Home
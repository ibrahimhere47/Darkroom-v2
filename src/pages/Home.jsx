import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/Hero'
import Loader from '../components/Loader'
import { tools } from '../tools/toolsRegistry'
import gsap from 'gsap'

const Home = () => {

    //Animating Loader
    const [loading, setLoading] = useState(true);
    const loaderRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                    setLoading(false)
                }
            })
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        <Layout>
            <div className='py-10 w-full'>
                <Hero />
                <div className='bg-neutral-900 rounded-2xl p-10 border border-neutral-700'>
                    <div className='flex flex-wrap gap-4'>
                    {tools.map((tool, idx) => (
                        <div key={idx} className='w-[calc(25%-12px)] min-w-0 shrink-0'>
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </Layout>

        {loading && (
            <Loader ref={loaderRef} />
        )}
        </>
    )
}

export default Home
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/Hero'
import Loader from '../components/Loader'
import { tools } from '../tools/toolsRegistry'

const Home = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setLoading(false);
        };

        window.addEventListener("load", handleLoad);

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
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
    )
}

export default Home
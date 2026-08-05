import React from 'react'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import Hero from '../components/Hero'
import { tools } from '../tools/toolsRegistry'

const Home = () => {
    return (
        <Layout>
            <div className='py-10 w-full'>
                <Hero />
                <div className='flex flex-wrap gap-4'>
                    {tools.map((tool, idx) => (
                        <div key={idx} className='w-[calc(25%-12px)] min-w-0 shrink-0'>
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Home
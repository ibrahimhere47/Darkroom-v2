import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const GuideButton = () => {
    const { toolId } = useParams()
    
    return (
        <Link to={`/guides/${toolId}`}>
            <div className='flex p-4 rounded-2xl -bg-linear-50 from-neutral-900 to-neutral-950 border border-neutral-800 text-neutral-200 w-full justify-self-center mt-4'>
                <div className='w-1/2 flex flex-col gap-2'>
                    <h1 className='font-mono font-bold text-xl'>See how it works</h1>
                    <p className='font-body text-base leading-5.5'>Learn the compress tool and exactly how to use it like a pro. This guide covers what happens to your data and our backend process to give you only the highest quality compression.</p>
                    <ArrowUpRight />
                </div>
            </div>
        </Link>
    )
}

export default GuideButton
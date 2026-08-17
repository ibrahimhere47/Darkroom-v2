import React from 'react'
import Headers from './layout-comps/Headers'

const Layout = ({ children }) => {
    
    return (
        <div className='min-h-screen flex flex-col bg-[#121212] text-white no-scrollbar'>
            <Headers />
            <main className='flex-1 mx-8'>
                <div className='bg-[#121212] py-7'></div>
                {children}
            </main>
            <footer className='flex flex-col items-center gap-8 mb-4 bg-[#121212] py-6 px-8'>
                <div className='border-t border-neutral-300 w-5/6' />
                <p className='font-mono text-neutral-300'>Copyright@2026 Darkroom | Your image toolkit</p>
            </footer>
        </div>
    )
}

export default Layout
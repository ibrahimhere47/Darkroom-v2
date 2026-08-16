import React from 'react'
import Headers from './layout-comps/Headers'

const Layout = ({ children }) => {
    
    return (
        <div className='min-h-screen flex flex-col bg-neutral-900 text-white no-scrollbar'>
            <Headers />
            <main className='flex-1 mx-8'>
                <div className='bg-neutral-900 py-7'></div>
                {children}
            </main>
            <footer className='flex bg-neutral-900 items-baseline justify-between py-6 px-8 border-t border-neutral-400'>
                <p className='mono'>Copyright@2026 Darkroom | Your image toolkit</p>
            </footer>
        </div>
    )
}

export default Layout
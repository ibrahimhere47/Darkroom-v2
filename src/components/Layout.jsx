import React from 'react'
import Headers from './layout-comps/Headers'
import { Link } from 'react-router-dom'

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
                <div className='flex flex-col items-center gap-2'>
                    <p className='font-mono text-neutral-300'>Copyright@2026 Darkroom | Your image toolkit</p>
                    <Link to='/privacy-policy' className='font-body'>Privacy Policy</Link>
                    <Link to='/terms-and-conditions' className='font-body'>Terms and Conditions</Link>
                </div>
            </footer>
        </div>
    )
}

export default Layout
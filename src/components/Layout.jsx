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
            <footer className='flex flex-col items-center gap-8 bg-linear-180 from-[#121212] to-[#0a0a0a] mt-6 pb-8 px-8'>
                <div className='border-t border-dashed border-neutral-600 w-7/8' />
                <div className='flex flex-col items-center gap-2 w-3/4'>
                    <div className='flex justify-between w-full'>
                        <Link to='/privacy-policy' className='font-body text-sm md:text-lg text-neutral-300 hover:text-amber-47 transition-all duration-400'>Privacy Policy</Link>
                        <Link to='/terms-and-conditions' className='font-body text-sm md:text-lg text-neutral-300 hover:text-amber-47 transition-all duration-400'>Terms and Conditions</Link>
                        <Link to='/about-us' className='font-body text-sm md:text-lg text-neutral-300 hover:text-amber-47 transition-all duration-400'>About Us</Link>
                    </div>
                    <p className='font-mono text-neutral-400 mt-4 text-xs md:text-base'>Copyright@2026 Darkroom | Your image toolkit</p>
                    <h1 className='font-mono text-neutral-400 -mt-2 text-xs md:text-base'><span className='hidden md:inline-block'>Having issues?</span> Contact us at anonymous.goat222@gmail.com</h1>
                </div>
            </footer>
        </div>
    )
}

export default Layout
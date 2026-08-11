import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Headers from './Headers'

const Layout = ({ children }) => {
    return (
        <div className='bg-neutral-800 text-white no-scrollbar'>
            <Headers />
            <main className='mx-8'>
                <div className='bg-neutral-800 py-12'></div>
                {children}
            </main>
            <footer className='flex items-baseline justify-between py-12 mx-8 border-t-neutral-400 border-t'>
                <p className='mono'>Copyright@2026 Darkroom | Your image toolkit</p>
            </footer>
        </div>
    )
}
export default Layout
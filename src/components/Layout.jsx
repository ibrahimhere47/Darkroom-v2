import React from 'react'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <div className='bg-neutral-800 text-white no-scrollbar'>
            <header className='flex items-baseline justify-between py-9 mx-8 border-b-neutral-400 border-b'>
                <Link to='/' className='no-underline flex items-center gap-1 font-body'>
                    <span className='bg-amber-47 w-3 h-3 rounded-full'></span>
                    <span>Darkroom</span>
                </Link>
                <p className='mono'>Your image toolkit</p>
            </header>
            <main className='mx-8'>{children}</main>
            <footer className='flex items-baseline justify-between py-12 mx-8 border-t-neutral-400 border-t'>
                <p className='mono'>Copyright@2027 Darkroom</p>
            </footer>
        </div>
    )
}

export default Layout
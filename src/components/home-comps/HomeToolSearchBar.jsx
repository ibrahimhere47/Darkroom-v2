import React, { useEffect } from 'react'
import { Search } from 'lucide-react'

const HomeToolSearchBar = (props) => {

    const { searchInput, setSearchInput, isSearching, setIsSearching } = props

    useEffect(() => {    
        if (searchInput != '') {
            setIsSearching(true)
        }
        else {
            setIsSearching(false)
        }
    }, [searchInput])

    return (
        <div className='flex justify-center items-center mt-6 -mb-3 gap-2'>
            <Search color='#777777' />
            <input 
                type='text' 
                className='bg-neutral-800 rounded-lg py-1.5 px-5 w-9/12' 
                placeholder='Search through our tools...'
                value={searchInput}
                onInput={(e) => setSearchInput(e.target.value.toLowerCase())}
            />
        </div>
    )
}

export default HomeToolSearchBar
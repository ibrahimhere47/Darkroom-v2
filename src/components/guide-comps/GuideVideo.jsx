import React from 'react'

const GuideVideo = ({ video }) => {
    return (
        <video src={video} autoPlay muted loop className='w-10/11'></video>
    )
}

export default GuideVideo
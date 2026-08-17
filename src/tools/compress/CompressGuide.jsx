import React from 'react'
import GuideHeading from '../../components/guide-comps/GuideHeading'
import GuideBody from '../../components/guide-comps/GuideBody'
import GuideImage from '../../components/guide-comps/GuideImage'
import GuideVideo from '../../components/guide-comps/GuideVideo'
import Image from '../../assets/guide-images/download.png'
import Video from '../../assets/guide-videos/background-video.mp4'

const CompressGuide = () => {
    return (
        <>
        <div className='flex flex-col gap-3 w-full items-center'>
            <GuideHeading text='Your ultimate guide to compression' />
            <GuideBody text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi.' />
            <GuideBody bold={true} text='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore molestias fugiat, repudiandae laboriosam amet repellendus cupiditate sunt nostrum harum impedit dicta ea atque similique, incidunt quo eaque voluptates, ex animi.' />
            <GuideImage image={Image} />
            <GuideVideo video={Video} />
        </div>
        </>
    ) 
}

export default CompressGuide
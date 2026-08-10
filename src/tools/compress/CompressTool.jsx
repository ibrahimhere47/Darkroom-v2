import React, { useState, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Download, DownloadCloud, Loader2, SlidersHorizontal } from 'lucide-react'

const CompressTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [imageUrl, setImageUrl] = useState([])
    const [quality, setQuality] = useState(70)
    const [isCompressing, setIsCompressing] = useState(false)

    const stageRef = useRef(null)
    const compressBtnRef = useRef(null)
    const downloadAllRef = useRef(null)

    const previewUrls = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files]
    )

    const hasResults = imageUrl.length > 0
    const displayUrls = hasResults ? imageUrl : previewUrls

    const handleCompress = async () => {
        setIsCompressing(true)
        setImageUrl([])

        await Promise.all(files.map(async (file) => {
            const formData = new FormData()
            formData.append("File", file)
            formData.append("Quality", quality)

            try {
                const response = await fetch("https://darkroom-v2-backend-production.up.railway.app/compress", {
                    method: "POST",
                    body: formData,
                })

                if (!response.ok) {
                    console.error("Compress failed")
                    return
                }

                const blob = await response.blob()
                setImageUrl(prev => [...prev, URL.createObjectURL(blob)])
            } catch (err) {
                console.error(err)
            }
        }))

        setIsCompressing(false)
    }

    const handleDownload = (url, idx) => {
        const link = document.createElement('a')
        link.href = url
        link.download = `compressed-${idx + 1}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const handleDownloadAll = () => {
        imageUrl.forEach((url, idx) => {
            setTimeout(() => handleDownload(url, idx), idx * 200)
        })
    }

    useGSAP(() => {
        if (imageUrl.length > 0) {
            gsap.fromTo(
                '.result-frame',
                { opacity: 0, y: 14, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
            )
        }
    }, [imageUrl])

    const magnetHover = (ref, scale = 1.03) => ({
        onMouseEnter: () => gsap.to(ref.current, { scale, duration: 0.25, ease: 'power2.out' }),
        onMouseLeave: () => gsap.to(ref.current, { scale: 1, duration: 0.3, ease: 'power2.out' }),
        onMouseDown: () => gsap.to(ref.current, { scale: 0.96, duration: 0.1, ease: 'power2.out' }),
        onMouseUp: () => gsap.to(ref.current, { scale, duration: 0.15, ease: 'power2.out' }),
    })

    const handleDownloadClick = (e, url, idx) => {
        gsap.fromTo(e.currentTarget, { scale: 0.85 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' })
        handleDownload(url, idx)
    }

    return (
        <div className='flex flex-col lg:flex-row gap-6 w-full font-mono my-12'>

            <div
                ref={stageRef}
                className='relative flex-1 min-h-105 rounded-2xl bg-black border border-neutral-800 p-6 overflow-hidden'
            >

                <div className='pointer-events-none absolute top-20 right-80 w-72 h-72 rounded-full bg-amber-47/5 blur-3xl' />

                    <div className='relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {displayUrls.map((elem, idx) => (
                            <div
                                key={idx}
                                className={`result-frame group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 ${hasResults ? '' : 'opacity-70'}`}
                            >
                                <img src={elem} className='w-full h-40 object-cover' />

                                {hasResults && (
                                    <>
                                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300' />
                                        <button
                                            onClick={(e) => handleDownloadClick(e, elem, idx)}
                                            className='absolute top-2 right-2 bg-black/70 hover:bg-amber-500 hover:text-black text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200'
                                        >
                                            <Download size={16} />
                                        </button>
                                        <span className='absolute bottom-2 left-2 text-[10px] tracking-wider text-amber-400/90 bg-black/60 px-2 py-0.5 rounded-full'>
                                            developed
                                        </span>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
            </div>

            <div className='w-full lg:w-72 shrink-0 rounded-2xl bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-3'>
                        <div>
                            <p className='text-sm tracking-widest text-neutral-500 uppercase mb-1'>Develop</p>
                            <p className='text-sm text-neutral-400'>Adjust quality, then compress your batch.</p>
                        </div>
                        <div className='border-b border-b-neutral-600' />
                    </div>

                    <div>
                        <div className='flex justify-between items-center mb-2'>
                            <span className='text-sm tracking-widest text-neutral-500 uppercase'>Quality</span>
                            <span className='text-amber-400 text-lg font-semibold font-mono'>{quality}</span>
                        </div>
                        <input
                            type='range'
                            min='10'
                            max='100'
                            value={quality}
                            onChange={(e) => setQuality(Number(e.target.value))}
                            disabled={isCompressing}
                            className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-500 cursor-pointer disabled:opacity-40'
                        />
                        <div className='flex justify-between text-[14px] text-neutral-600 mt-1 font-mono'>
                            <span>10</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-4 items-center'>
                    <button
                        ref={compressBtnRef}
                        {...magnetHover(compressBtnRef)}
                        onClick={handleCompress}
                        disabled={isCompressing || files.length === 0}
                        className='w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-700 disabled:text-neutral-500 text-black font-semibold py-3 rounded-xl cursor-pointer disabled:cursor-not-allowed transition-colors duration-200'
                    >
                        {isCompressing ? (
                            <>
                                <Loader2 size={16} className='animate-spin' />
                                Compressing…
                            </>
                        ) : (
                            'Compress'
                        )}
                    </button>

                    {hasResults && (
                        <button
                            ref={downloadAllRef}
                            {...magnetHover(downloadAllRef)}
                            onClick={handleDownloadAll}
                            className='w-full flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:border-amber-500 text-neutral-300 hover:text-amber-400 px-4 py-2.5 rounded-xl cursor-pointer transition-colors duration-200'
                        >
                            <DownloadCloud size={16} />
                            Download all
                        </button>
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${imageUrl.length} developed`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CompressTool
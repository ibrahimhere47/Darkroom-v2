import React, { useState, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Download, DownloadCloud, Loader2, Trash2, RotateCcw } from 'lucide-react'
import formatBytes from '../../utils/formatBytes'

const CompressTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [imageUrl, setImageUrl] = useState([])
    const [resultSizes, setResultSizes] = useState([])
    const [quality, setQuality] = useState(70)
    const [isCompressing, setIsCompressing] = useState(false)

    const stageRef = useRef(null)
    const compressBtnRef = useRef(null)
    const downloadAllRef = useRef(null)
    const recompressRef = useRef(null)
    const barFillRef = useRef(null)

    const previewUrls = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files]
    )

    const hasResults = imageUrl.some(Boolean)
    const allDeveloped = files.length > 0 && !isCompressing && imageUrl.length === files.length && imageUrl.every(Boolean)

    const items = files.map((file, idx) => ({
        file,
        previewUrl: previewUrls[idx],
        resultUrl: imageUrl[idx] || null,
        resultSize: resultSizes[idx] ?? null,
    }))

    const originalTotal = useMemo(() => files.reduce((sum, f) => sum + f.size, 0), [files])
    const compressedTotal = useMemo(
        () => resultSizes.reduce((sum, s) => sum + (s || 0), 0),
        [resultSizes]
    )
    const savedBytes = Math.max(originalTotal - compressedTotal, 0)
    const savedPercent = originalTotal > 0 ? Math.round((savedBytes / originalTotal) * 100) : 0
    const compressedRatio = originalTotal > 0 ? compressedTotal / originalTotal : 0

    const handleCompress = async () => {
        setIsCompressing(true)
        setImageUrl(new Array(files.length).fill(null))
        setResultSizes(new Array(files.length).fill(null))

        await Promise.all(files.map(async (file, idx) => {
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
                const url = URL.createObjectURL(blob)

                setImageUrl(prev => {
                    const next = [...prev]
                    next[idx] = url
                    return next
                })
                setResultSizes(prev => {
                    const next = [...prev]
                    next[idx] = blob.size
                    return next
                })
            } catch (err) {
                console.error(err)
            }
        }))

        setIsCompressing(false)
    }

    const handleRecompress = () => {
        setImageUrl([])
        setResultSizes([])
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
        items.forEach((item, idx) => {
            if (item.resultUrl) {
                setTimeout(() => handleDownload(item.resultUrl, idx), idx * 200)
            }
        })
    }

    const removeFile = (idx) => {
        setFiles(prev => prev.filter((_, i) => i !== idx))
        setImageUrl(prev => prev.filter((_, i) => i !== idx))
        setResultSizes(prev => prev.filter((_, i) => i !== idx))
    }

    const handleRemoveClick = (e, idx) => {
        const frame = e.currentTarget.closest('.result-frame')
        gsap.to(frame, {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => removeFile(idx),
        })
    }

    useGSAP(() => {
        if (hasResults) {
            gsap.fromTo(
                '.result-frame',
                { opacity: 0, y: 14, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
            )
        }
    }, [imageUrl])

    // animate the savings bar filling in once the developed panel appears
    useGSAP(() => {
        if (allDeveloped && barFillRef.current) {
            gsap.fromTo(
                barFillRef.current,
                { width: '0%' },
                { width: `${compressedRatio * 100}%`, duration: 0.8, ease: 'power3.out', delay: 0.15 }
            )
        }
    }, [allDeveloped])

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
        <div className='flex flex-col lg:flex-row gap-5 w-full font-mono my-12'>

            <div
                ref={stageRef}
                className='relative flex-1 min-h-125 rounded-2xl bg-neutral-950 border border-neutral-800 p-6 overflow-hidden'
            >
                <div className='pointer-events-none absolute top-20 right-80 w-72 h-72 rounded-full bg-amber-47/5 blur-3xl' />

                {isCompressing ? (
                    <div className='relative z-10 w-full h-full min-h-92.5 flex flex-col items-center justify-center gap-3'>
                        <div className='w-10 h-10 border-4 border-neutral-700 border-t-amber-47 rounded-full animate-spin' />
                    </div>
                ) : (
                    <div className='relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {items.map((item, idx) => {
                            const shownUrl = item.resultUrl || item.previewUrl
                            const isDeveloped = Boolean(item.resultUrl)

                            return (
                                <div
                                    key={idx}
                                    className={`result-frame group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 ${isDeveloped ? '' : 'opacity-70'}`}
                                >
                                    <img src={shownUrl} className='w-full h-40 object-cover' />

                                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300' />

                                    <button
                                        onClick={(e) => handleRemoveClick(e, idx)}
                                        className='absolute top-2 left-2 bg-black/70 hover:bg-red-500 hover:text-white text-neutral-300 p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300'
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    {isDeveloped && (
                                        <>
                                            <button
                                                onClick={(e) => handleDownloadClick(e, item.resultUrl, idx)}
                                                className='absolute top-2 right-2 bg-black/70 hover:bg-amber-47 hover:text-black text-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200'
                                            >
                                                <Download size={16} />
                                            </button>
                                            <span className='absolute bottom-2 left-2 text-[10px] tracking-wider text-amber-47/90 bg-black/60 px-2 py-0.5 rounded-full'>
                                                {formatBytes(item.resultSize)}
                                            </span>
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <div className='w-full lg:w-85 shrink-0 rounded-2xl bg-neutral-950 border border-neutral-800 p-6 flex flex-col justify-between'>

                {allDeveloped ? (
                    // ---- Developed panel ----
                    <div className='flex flex-col gap-6 mb-11'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center gap-2'>
                                <p className='text-sm tracking-widest text-neutral-400 uppercase'>Developed</p>
                            </div>
                            <p className='text-sm text-neutral-300'>
                                {files.length} {files.length === 1 ? 'image' : 'images'} processed at {quality}% quality.
                            </p>
                            <div className='border-b border-b-neutral-600' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='text-5xl font-semibold text-amber-47 leading-none font-body'>
                                {savedPercent}%
                            </span>
                            <span className='text-xs tracking-widest text-neutral-500 uppercase'>
                                smaller
                            </span>
                        </div>

                        <div>
                            <div className='w-full h-3 rounded-full bg-neutral-800 overflow-hidden'>
                                <div
                                    ref={barFillRef}
                                    className='h-full rounded-full bg-amber-47'
                                    style={{ width: 0 }}
                                />
                            </div>
                            <div className='flex justify-between text-[11px] text-neutral-500 mt-2'>
                                <span>{formatBytes(compressedTotal)} now</span>
                                <span>{formatBytes(originalTotal)} original</span>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 text-[11px] text-neutral-500'>
                            <div className='flex justify-between'>
                                <span>Original size</span>
                                <span className='text-neutral-300'>{formatBytes(originalTotal)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Compressed size</span>
                                <span className='text-neutral-300'>{formatBytes(compressedTotal)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Saved</span>
                                <span className='text-amber-47'>{formatBytes(savedBytes)}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // ---- Develop panel ----
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <p className='text-sm tracking-widest text-neutral-400 uppercase mb-1'>Develop</p>
                                <p className='text-sm text-neutral-300'>Adjust quality, then compress your batch.</p>
                            </div>
                            <div className='border-b border-b-neutral-600' />
                        </div>

                        <div>
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-sm tracking-widest text-neutral-400 uppercase'>Quality</span>
                                <span className='text-amber-47 text-lg font-semibold font-mono'>{quality}</span>
                            </div>
                            <input
                                type='range'
                                min='10'
                                max='100'
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                disabled={isCompressing}
                                className='w-full h-1.5 rounded-full appearance-none bg-neutral-700 accent-amber-47 cursor-pointer disabled:opacity-40'
                            />
                            <div className='flex justify-between text-[14px] text-neutral-300 mt-1 font-mono'>
                                <span>10</span>
                                <span>100</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className='w-full flex flex-col gap-4 items-center'>
                    {allDeveloped ? (
                        <>
                            <button
                                ref={downloadAllRef}
                                {...magnetHover(downloadAllRef)}
                                onClick={handleDownloadAll}
                                className='w-full flex items-center justify-center gap-2 bg-amber-47 hover:brightness-110 text-black font-semibold py-4 rounded-xl cursor-pointer transition-all duration-200'
                            >
                                <DownloadCloud size={16} />
                                Download all
                            </button>
                            <button
                                ref={recompressRef}
                                {...magnetHover(recompressRef)}
                                onClick={handleRecompress}
                                className='w-full flex items-center justify-center gap-2 bg-transparent border border-neutral-700 hover:border-amber-47 text-neutral-300 hover:text-amber-47 py-4 rounded-xl cursor-pointer transition-colors duration-200'
                            >
                                <RotateCcw size={14} />
                                Adjust & recompress
                            </button>
                        </>
                    ) : (
                        <button
                            ref={compressBtnRef}
                            {...magnetHover(compressBtnRef)}
                            onClick={handleCompress}
                            disabled={isCompressing || files.length === 0}
                            className='w-full flex items-center justify-center gap-2 bg-amber-47 hover:brightness-110 disabled:bg-neutral-700 disabled:text-neutral-500 text-black font-semibold py-4 rounded-xl cursor-pointer disabled:cursor-not-allowed transition-all duration-200'
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
                    )}

                    <p className='text-[11px] text-neutral-600 leading-relaxed'>
                        {files.length} {files.length === 1 ? 'image' : 'images'} loaded
                        {hasResults && ` · ${imageUrl.filter(Boolean).length} developed`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CompressTool
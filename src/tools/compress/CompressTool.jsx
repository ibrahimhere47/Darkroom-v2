import React, { useState, useMemo } from 'react'
import { Download } from 'lucide-react'

const CompressTool = (props) => {

    const files = props.files || []
    const setFiles = props.setFiles
    const [imageUrl, setImageUrl] = useState([])
    const [quality, setQuality] = useState(70)

    const previewUrls = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files]
    )

    const handleCompress = () => {
        files.map(async (file) => {
            const formData = new FormData();
                formData.append("File", file);
                formData.append("Quality", quality);

            const response = await fetch("https://darkroom-v2-backend-production.up.railway.app/compress", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("Compress failed");
                return;
            }

            const blob = await response.blob();
            setImageUrl(prev => [...prev, URL.createObjectURL(blob)]);
        })
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

    return (
        <div className='flex'>
            <div className='w-3/4 bg-black'>
                {imageUrl.length > 0
                    ? imageUrl.map((elem, idx) => (
                        <img key={idx} src={elem} />
                    ))
                    : previewUrls.map((elem, idx) => (
                        <img key={idx} src={elem} />
                    ))
                }
            </div>
            <div className='w-1/4 bg-amber-47'>
                <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={quality} 
                    onChange={(e) => setQuality(Number(e.target.value))} 
                />
                <span>Quality: {quality}</span>
                <button onClick={handleCompress}>Compress</button>

                {imageUrl.length > 0 && (
                    <button
                        onClick={handleDownloadAll}
                        className='mt-2 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg cursor-pointer'
                    >
                        <Download size={16} />
                        Download All
                    </button>
                )}
            </div>
        </div>
    )
}

export default CompressTool
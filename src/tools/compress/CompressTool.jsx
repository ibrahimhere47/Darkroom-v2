import React, { useState, useMemo } from 'react'

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
            </div>
        </div>
    )
}

export default CompressTool
import React, { useState } from 'react'

const CompressTool = (props) => {

    const files = props.files
    const setFiles = props.setFiles
    const [imageUrl, setImageUrl] = useState(null)
    const [quality, setQuality] = useState(70) // default compression quality

    const handleCompress = async () => {
        const formData = new FormData();
            formData.append("File", files[0]);
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
        setImageUrl(URL.createObjectURL(blob));
    }

    return (
        <div>
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={quality} 
                onChange={(e) => setQuality(Number(e.target.value))} 
            />
            <span>Quality: {quality}</span>
            <button onClick={handleCompress}>Compress</button>
            {imageUrl && <img src={imageUrl} alt="Processed result" />}
        </div>
    )
}

export default CompressTool
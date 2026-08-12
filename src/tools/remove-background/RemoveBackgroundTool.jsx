import { useState, useRef } from "react";

export default function BackgroundRemover() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [resultUrl, setResultUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);
        setPreviewUrl(URL.createObjectURL(selected));
        setResultUrl(null);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("https://adjusture-backend.vercel.app/remove-background", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || "Failed to remove background");
        }

        const blob = await res.blob();
        setResultUrl(URL.createObjectURL(blob));
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
        <h2>Background Remover</h2>

        {/* TEMP: hidden input triggered by styled button — remove/replace with your own dropzone later */}
        <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
        />
        <button onClick={() => fileInputRef.current.click()}>
            Select File
        </button>

        {file && <span style={{ marginLeft: 10 }}>{file.name}</span>}

        <button
            onClick={handleSubmit}
            disabled={!file || loading}
            style={{ marginLeft: 10 }}
        >
            {loading ? "Processing..." : "Remove Background"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            {previewUrl && (
            <div>
                <p>Original</p>
                <img src={previewUrl} alt="original" style={{ maxWidth: 250 }} />
            </div>
            )}

            {resultUrl && (
            <div>
                <p>Result</p>
                <img
                src={resultUrl}
                alt="background removed"
                style={{
                    maxWidth: 250,
                    background:
                    "repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 50% / 20px 20px",
                }}
                />
                <a href={resultUrl} download="result.png">
                <button style={{ marginTop: 8 }}>Download</button>
                </a>
            </div>
            )}
        </div>
        </div>
    );
}
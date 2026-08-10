import { useState, useMemo, useCallback } from 'react'

/**
 * Shared state/behavior for any "upload images -> process -> download" tool.
 * Handles preview URLs, per-file results, and add/remove of files, so each
 * tool only needs to supply its own processing logic (the actual API call).
 *
 */

const useToolFiles = (files, setFiles) => {
    const [resultUrls, setResultUrls] = useState([])
    const [resultMeta, setResultMeta] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    const previewUrls = useMemo(
        () => files.map((file) => URL.createObjectURL(file)),
        [files]
    )

    const items = useMemo(
        () => files.map((file, idx) => ({
            file,
            previewUrl: previewUrls[idx],
            resultUrl: resultUrls[idx] || null,
            resultMeta: resultMeta[idx] ?? null,
        })),
        [files, previewUrls, resultUrls, resultMeta]
    )

    const hasResults = resultUrls.some(Boolean)
    const allDone = files.length > 0 && !isProcessing && resultUrls.length === files.length && resultUrls.every(Boolean)

    // Call at the start of a processing run to reset per-file result slots
    const beginProcessing = useCallback(() => {
        setIsProcessing(true)
        setResultUrls(new Array(files.length).fill(null))
        setResultMeta(new Array(files.length).fill(null))
    }, [files.length])

    // Call once a single file finishes processing
    const setResult = useCallback((idx, url, meta = null) => {
        setResultUrls(prev => {
            const next = [...prev]
            next[idx] = url
            return next
        })
        setResultMeta(prev => {
            const next = [...prev]
            next[idx] = meta
            return next
        })
    }, [])

    const finishProcessing = useCallback(() => setIsProcessing(false), [])

    // Clears results so the tool can go back to the "adjust settings" view
    const resetResults = useCallback(() => {
        setResultUrls([])
        setResultMeta([])
    }, [])

    const addFiles = useCallback((fileList) => {
        const newFiles = Array.from(fileList)
        if (newFiles.length === 0) return
        setFiles((prev) => [...prev, ...newFiles])
    }, [setFiles])

    const removeFile = useCallback((idx) => {
        setFiles(prev => prev.filter((_, i) => i !== idx))
        setResultUrls(prev => prev.filter((_, i) => i !== idx))
        setResultMeta(prev => prev.filter((_, i) => i !== idx))
    }, [setFiles])

    const downloadFile = useCallback((url, filename) => {
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }, [])

    const downloadAll = useCallback((namer = (idx) => `result-${idx + 1}.jpg`) => {
        items.forEach((item, idx) => {
            if (item.resultUrl) {
                setTimeout(() => downloadFile(item.resultUrl, namer(idx)), idx * 200)
            }
        })
    }, [items, downloadFile])

    return {
        items,
        previewUrls,
        hasResults,
        allDone,
        isProcessing,
        beginProcessing,
        setResult,
        finishProcessing,
        resetResults,
        addFiles,
        removeFile,
        downloadFile,
        downloadAll,
    }
}

export default useToolFiles
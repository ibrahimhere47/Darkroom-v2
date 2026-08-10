/**
 * Resolves the pixel dimensions of an image File/Blob by loading it.
 * Useful after a processing step (resize, crop, convert) to report the
 * actual output dimensions rather than trusting the requested ones.
 *
 */
const getImageDimensions = (blob) => new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()

    img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
        URL.revokeObjectURL(url)
    }
    img.onerror = (err) => {
        URL.revokeObjectURL(url)
        reject(err)
    }
    img.src = url
})

export default getImageDimensions
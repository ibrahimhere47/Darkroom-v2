const MIME_EXTENSIONS = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/gif': 'gif',
}

/** Maps a returned blob's mime type to a sensible download extension. */
const extensionFromMime = (mime, fallback = 'jpg') => MIME_EXTENSIONS[mime] || fallback

export default extensionFromMime
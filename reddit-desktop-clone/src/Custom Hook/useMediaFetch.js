import { useEffect, useState } from "react";

const useMediaFetch = (url) => {
    const [mediaBlob, setMediaBlob] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController()
        fetch(url, {
            method: "GET",
            // mode: 'no-cors',

            // headers: {
            //     // "Content-Type": "application/json"
            //     // "Content-Type": "video",
            //     // "Authorization": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImFjNzFlNjY2LTFkNzAtNDdiMy05MDhmLTJhZDYxNjMwOThmOCIsInN1YiI6ImFiZWwiLCJlbWFpbCI6ImFiZWwiLCJqdGkiOiI1MDkyYzM3MC05ZDQyLTRjZWYtYmFkNy0zYWFkYTY1NjJjZmEiLCJuYmYiOjE3MDM3NDQ4NDgsImV4cCI6MTcwMzc0NTE0OCwiaWF0IjoxNzAzNzQ0ODQ4fQ.tTKCEBiIbEbWHE1Th6nEzsvQXCgRvHDziY0_HvIngzdwpHBaFXQsaP-Qx8dVDcciXVv8wHnMDJRd7f9JFAzB9g"
            // }
        }, { signal: abortCont.signal })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log(response.status);
            // console.log(response.headers.get('Content-Type'));
            return response.blob()
        })
        .then((blob) => {
            const objectUrl = URL.createObjectURL(blob);
            setMediaBlob(objectUrl);
            setIsPending(false)
        })
        .catch((error) => {
            setError(error.message);
            setIsPending(false)
            console.error(error.messa);
            throw error;
        })        
        return () => abortCont.abort()
    }, [url])

    return { mediaUrl: mediaBlob, isPending, error};
}

export default useMediaFetch;
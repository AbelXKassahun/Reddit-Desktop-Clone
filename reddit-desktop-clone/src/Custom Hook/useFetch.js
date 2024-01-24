import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null);

    // const [tryAgain, setTryAgain] = useState(0)

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
            .then((response) => {
                if(!response.ok){
                    throw Error('Error fetching posts');
                }
                return response.json();
            })
            .then((data) => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    setError("Fetch Aborted");
                    setIsPending(false);
                }
                else{
                    setError(err.message);
                    setIsPending(false)
                }
            })
        }, 1500)

        return () => abortCont.abort()
    }, [url]);
    return { data, isPending, error };
}

export default useFetch;
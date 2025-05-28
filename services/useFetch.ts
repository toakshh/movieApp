import { useEffect, useState } from "react";


const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch: boolean = true ) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFunction();
            setData(response);
        } catch (e: any) {
            // @ts-ignore
            setError(e instanceof Error ? e : new Error("Something went wrong"));
        } finally {
            setLoading(false);
        }
    };

    const reset = ()=>{
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
       if(autoFetch){
            fetchData();
       }
    },[])

    return { data, loading, error, refetch: fetchData, reset };
}


export default useFetch
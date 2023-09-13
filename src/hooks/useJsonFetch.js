import { useState, useEffect } from 'react';

export default function useData(url, options) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, options)
            .then(response => {
                response.status > 300 && setError(response);
                return response.json()
            })
            .then(res => {
                setData(res);
                setLoading(false);

            })
            .catch(error => {
                setError(error);
            })

    }, [url, options]);

    return [data, loading, error];
}

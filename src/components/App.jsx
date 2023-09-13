/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import useJsonFetch from "../hooks/useJsonFetch";

export default function App() {
    const [result, isLoading, err] = useJsonFetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json');
    const [active, setActive] = useState(null);

    function handleClick(item) {
        setActive(item);
    }

    return (
        <div className="d-flex container p-5" style={{ minHeight: '50vh' }}>
            {err ? <div>{err}</div> : isLoading ? <div className="spinner-border m-auto " role="status">
            </div> :
                <ul className="list-group-flush w-50">
                    {result?.map((item) => (
                        <li key={item.id} className="list-group-item " style={{ cursor: 'pointer' }} onClick={() => handleClick(item)}>{item.name}</li>
                    ))}
                </ul>
            }
            {active && <Details info={active} />}
        </div >
    )
}

function Details({ info }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
        return () => {
            setData(null);
            setLoading(true);
        }
    }, [info.id])

    return (
        loading ? <div className="spinner-border m-auto " role="status" /> : data && <div className="w-50 m-auto px-5">
            <img src={data.avatar} alt={'Avatar' + data.id} />
            <ul className="list-group-flush w-50 text-center">
                <li className="list-group-item">Name: {data.name}</li>
                <li className="list-group-item">City: {data.details.city}</li>
                <li className="list-group-item">Company: {data.details.company}</li>
                <li className="list-group-item">Position: {data.details.position}</li>
            </ul>
        </div>


    )
}
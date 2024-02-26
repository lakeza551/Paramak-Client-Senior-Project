import { useEffect } from 'react'
import './css/global.css'
import { useLocation } from 'react-router-dom'

function Record(props) {
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    useEffect(async () => {
        try {
            const res = await fetch(`/patient_data?token=${token}`)
            const {data} = await res.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <h1>{token}</h1>
    )
}

export default Record
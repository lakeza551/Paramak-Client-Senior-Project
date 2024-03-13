import { useEffect, useState } from 'react'
import './css/global.css'
import { useLocation } from 'react-router-dom'
import { GridLoader } from 'react-spinners'

function Record(props) {
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    const [patientData, setPatientData] = useState(null)
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`https://medrecords.sc.su.ac.th/patient_data?token=${token}`)
                const { data } = await res.json()
                data.records.reverse()
                setPatientData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    if(patientData === null)
        return (
            <div style={{height: '100vh'}} className="center">
                <GridLoader color='rgb(6, 109, 177)' size={40} />
            </div>
        )
    return (
        <div className="page-container">
            <h1 className='patient-pid'>รหัสประจำตัวประชาชน <span style={{color: "rgb(6, 99, 165)"}}>{patientData.pid}</span></h1>
            {patientData.records.map(record => {
                return (
                    <div className="table-container">
                        <label className="table-date">วันที่ {record.date}</label>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{
                                        width: '30%'
                                    }}>
                                        Name
                                    </th>
                                    <th style={{
                                        width: '50%'
                                    }}>
                                        Dosage
                                    </th>
                                    <th style={{
                                        width: '20%'
                                    }}>
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.medicines.map(med => {
                                    return (
                                        <>
                                            <tr>
                                                <td style={{
                                                    width: '30%'
                                                }}>
                                                    {med.trade_name} {med.dosage_form} {med.dose}
                                                </td>
                                                <td style={{
                                                    width: '50%'
                                                }}>
                                                    {med.frequency}
                                                </td>
                                                <td style={{
                                                    width: '20%'
                                                }}>
                                                    {med.quantity}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

export default Record
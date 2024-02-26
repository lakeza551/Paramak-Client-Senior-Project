import { useEffect, useState } from 'react'
import './css/global.css'
import { useLocation } from 'react-router-dom'

function Record(props) {
    const search = useLocation().search
    const params = new URLSearchParams(search)
    const token = params.get('token')
    const [patientData, setPatientData] = useState(null)
    useEffect(async () => {
        try {
            const res = await fetch(`/patient_data?token=${token}`)
            const { data } = await res.json()
            setPatientData(data)
        } catch (error) {
            console.log(error)
        }
    }, [])
    if(patientData === null)
        return <h1>กำลังโหลดข้อมูล</h1>
    return (
        <div className="page-container">
            <h1 className='patient-pid'>รหัสประจำตัวประชาชน {patientData.pid}</h1>
            {patientData.records.map(record => {
                return (
                    <div className="table-container">
                        <label className="table-date">วันที่ {record.date}</label>
                        <table>
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
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

export default Record
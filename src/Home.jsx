import './css/global.css'

function Home(props) {
    return (
        <div className="center" style={{
            height: '100vh'
        }}>
            <a className="auth-button" href="https://medrecords.sc.su.ac.th/thaid-auth">
                ยืนยันตัวตนด้วย ThaiD
            </a>
        </div>
    )
}
export default Home
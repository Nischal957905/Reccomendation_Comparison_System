import { useNavigate} from "react-router-dom"

export default function PublicHeader() {

    const value = localStorage.getItem('login')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/auth/login')
    }

    return (
        <>
            <header className="header-user">
                <div className="logo-con">
                    <img src='/logo.png'></img>
                </div>
                <div className="menu-holder">
                    <div className="home-menu">Home</div>
                    <div className="list-menu">Listings</div>
                    <div className="compare-menu">Comparison</div>
                </div>
                <div></div>
                {
                    value ?  <div className="btn-signup" onClick={logout}>Logout</div>
                    :<div className="btn-signup">Sign up</div>

                }
            </header>
        </>
    )
}
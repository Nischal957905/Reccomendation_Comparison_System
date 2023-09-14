import { useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"

export default function PublicHeader() {

    const value = localStorage.getItem('login')
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/auth/login')
    }
    const login = () => {
        navigate('/auth/login')
    }
    const admin = localStorage.getItem('role')

    return (
        <>
            <header className="header-user">
                <div className="logo-con">
                    <img src='/logo.png'></img>
                </div>
                <div className="menu-holder">
                    <div className="home-menu">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="list-menu">
                        <div className="liter">Listings</div>
                        <div className="menu-optionss">
                            <a href="/college">College</a>
                            <a href="/school">School</a>
                            <a href="/institution">Consultancy</a>
                        </div>
                    </div>
                    <div className="compare-menu">
                        <div className="compr">
                            Comparison
                        </div>
                        <div className="menu-optionssp">
                            <a href="/comparison/college">College</a>
                            <a href="/comparison/school">School</a>
                            <a href="/comparison">Consultancy</a>
                        </div>
                    </div>
                    {admin === "admin" &&
                        <div className="a-menu"><a href="/admin">Admin</a></div>
                    }
                    <div className="a-menu"><a href="/discussion">Discussion</a></div>
                </div>
                <div></div>
                {
                    value ?  <div className="btn-signup" onClick={logout}>Logout</div>
                    :<div className="btn-signup" onClick={login}>Log in</div>

                }
            </header>
        </>
    )
}
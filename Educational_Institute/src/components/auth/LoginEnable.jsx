import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";

const LoginEnable = () => {

    const role = localStorage.getItem('login')
    const location = useLocation()

    return (
        !role ? <Outlet/> : <Navigate to="/institution" state={{from: location}} replace/>
    )
}

export default LoginEnable

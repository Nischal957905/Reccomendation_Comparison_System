import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";

const RoleBasedAuth = () => {

    const role = localStorage.getItem('role')
    const location = useLocation()

    return (
        role && role === 'admin'
            ?  <Outlet/>  : <Navigate to="/institution" state={{from: location}} replace/>
    )
}

export default RoleBasedAuth

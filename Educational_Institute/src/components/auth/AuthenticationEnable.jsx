import useAuthentication from "../hooks/useAuthentication";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthenticationEnable = () => {

    const { valueForAuth } = useAuthentication()
    const location = useLocation()

    return (
        valueForAuth?.username
            ?   <Outlet/>
            : <Navigate to="/auth/login" state={{from: location}} replace/>
    )
}

export default AuthenticationEnable

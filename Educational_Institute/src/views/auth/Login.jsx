import { useEffect, useState } from "react"
import { usePostLoginQuery } from "../../auth/authSlice"
import { useNavigate, useLocation, Link } from 'react-router-dom'
import useAuthentication from "../../components/hooks/useAuthentication"

export default function Login(){

    const {setValueForAuth, valueForAuth} = useAuthentication()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [delayedValue, setDelayedValue] = useState()
    const [dataError, setDataError] = useState(false)

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = usePostLoginQuery(delayedValue)
    console.log(data)

    useEffect(() => {
        if (isSuccess) {
            if(data === "No user found"){
                setDataError(true)
            }
            else{
                setDataError(false)
                const token = data?.tokenForAccess;
                const userVerify = data?.userVerify;
                const username = data?.user?.username;
                const roles = data?.roles?.role_name;
                if(data.userVerify){
                    localStorage.clear()
                    localStorage.setItem('username', username);
                    localStorage.setItem('login',true)
                    localStorage.setItem('role', roles)
                    setValueForAuth({'username': username,'login':true,})
                    setFormData({
                        username: '',
                        password: '',
                    })
                    navigate(from, {replace: true})
                }
            }
        }
    }, [data]);

    console.log(data && data)

    const handleSubmit = (event) => {
        event.preventDefault()
        setDelayedValue(formData)
    }

    const handleLoginValueChange = (event) => {
        const {value, name} = event.target;
        setFormData(prevVal => {
            setDataError(false)
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }
    
    return (
        <div>
            <div className="logost">
                <img src='/logo.png'></img>
            </div>
            <div className="form-parent">
                <form onSubmit= {handleSubmit} >
                    <div className="header-pp">
                    🆂🅸🅶🅽 🅸🅽 🆃🅾 🅲🅾🅽🆂🆄🅻🆃🅼🅴
                    </div>
                    <div className="login-username">
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleLoginValueChange}
                            required
                        />
                    </div>
                    <div className="login-password">
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleLoginValueChange}
                            required
                        />
                    </div>
                    {
                        dataError && 
                        <div className="login-error">
                            <p>Wrong Credentials</p>
                        </div>
                    }
                    <div className="format-btn">
                        <button type="submit">Log in</button>
                    </div>
                    <div className="format-signup">
                        No account?<p><a href="/auth/register">Create acc</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
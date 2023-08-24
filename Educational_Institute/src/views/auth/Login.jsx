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
    const [dataError, setDataError] = useState()

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = usePostLoginQuery(delayedValue)

    useEffect(() => {
        if (isSuccess) {
            const token = data?.tokenForAccess;
            const userVerify = data?.userVerify;
            const username = data?.user?.username;
            const password = data?.user?.password;
            if(data.userVerify){
                localStorage.setItem('username', JSON.stringify(username));
                setValueForAuth({'username': username})
                //localStorage.clear()
                setFormData({
                    username: '',
                    password: '',
                })
                navigate(from, {replace: true})
            }
        }
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault()
        setDelayedValue(formData)
    }

    const handleLoginValueChange = (event) => {
        const {value, name} = event.target;
        setFormData(prevVal => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }
    
    return (
        <div>
            <form onSubmit= {handleSubmit} >
                    <div className="login-username">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleLoginValueChange}
                        />
                    </div>
                    <div className="login-password">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleLoginValueChange}
                        />
                    </div>
                <button>Login</button>
            </form>
        </div>
    )
}
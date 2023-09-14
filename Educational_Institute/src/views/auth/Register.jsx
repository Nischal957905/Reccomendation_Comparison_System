import { useEffect, useState } from "react"
import { usePostRegisterQuery } from "../../auth/authSlice"
import { useNavigate } from "react-router-dom"

 
export default function Register(){

    const [formData, setFormData] = useState({
        location: false
    })
    const [delayedData, setDelayedData] = useState({})
    const [dataError, setDataError] = useState(false)

    const navigate = useNavigate()

    const {
        data,
        isSuccess
    } = usePostRegisterQuery(delayedData)

    useEffect(() => {
        if(data && isSuccess){
            if(data === "user found"){
                setDataError(true)
            }
            else{
                setDataError(false)
                localStorage.setItem('username', data.username)
                localStorage.setItem('login',true)
                localStorage.setItem('role', "non-admin")
                navigate('/')
            }
        }
    },[data])
 
    const handleFormDataChange = (event) => {
        const {name, value} = event.target
        if(dataError === true){
            setDataError(false)
        }
        setFormData((prevVal) => {
            return{
                ...prevVal,
                [name] : value
            }
        })
    }

    const locationFinder = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            setFormData((prevVal) => {
                return {
                    ...prevVal,
                    'longitude': longitude,
                    'latitude' : latitude
                }
            })
        })
    }

    useEffect(() => {
        if(formData.location){
            if(!formData.latitude || formData.latitude === '')
            locationFinder()
        }
    },[formData.location])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(formData.location === true){
            setDelayedData(formData)
        }
    }

    const handleLocationConfirm = (event) => {
        const {checked,name} = event.target
        setFormData((prevVal) => {
            return {
                ...prevVal,
                [name] : checked
            }
        })
    }

    return (
        <div>
            <div className="logost">
                <img src='/logo.png'></img>
            </div>
            <div className="form-parent">
                <form onSubmit={handleSubmit}>
                    <div className="header-pp">
                    🆂🅸🅶🅽🆄🅿 🅸🅽🆃🅾 🅲🅾🅽🆂🆄🅻🆃🅼🅴
                    </div>
                    <div className="login-username">
                        <input 
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            placeholder="Username"
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="login-pass">
                        <input 
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleFormDataChange}
                        />
                    </div>
                    <div className="login-email">
                        <input 
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleFormDataChange}
                            placeholder="Email"
                        />
                    </div>
                    <div className="pivot-box">
                        <input 
                            name="location"
                            type="checkbox"
                            required
                            checked={formData.location}
                            onChange={handleLocationConfirm}
                        />
                        <label>Location</label>
                    </div>
                    {
                        dataError && 
                        <div className="login-error">
                            <p>User with this username exists</p>
                        </div>
                    }
                    <div className="format-btn">
                        <button type="submit">Sign up</button>
                    </div>
                    <div className="format-signup">
                        Already have an account?<p><a href="/auth/login">Login</a></p>
                    </div>
                </form>
            </div>
            
        </div>
    )
}
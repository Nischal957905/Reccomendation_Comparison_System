import { useEffect, useState } from "react"
import { useEditPostInstitutionQuery} from "../../app/api/adminSlice"
import { useParams, useNavigate } from "react-router-dom"
import MessageProp from '../../components/utilities/MessageProp';

export default function EditConsultancy(){

    const [delayedData, setDelayedValue] = useState()
    const { institution } = useParams()
    const navigation = useNavigate()

    const [postData, setPostData] = useState({})

    const {
        data,
        isSuccess,
        isError
    } = useEditPostInstitutionQuery({institution,delayedData})

    useEffect(() => {
        if(isError){
            navigation('/error')
        }
    },[isError])

    const handleChangePostData = (event) => {
        const {value, name} = event.target
        setPostData((prevVal) => {
            return {
                ...prevVal,
                [name] : value
            }
        })
    }

    const [messagePop, setMessagePop] = useState(false)
    const [display, setDisplay] = useState({
        message: '',
        severity: '',
    })
    const destroyPopMessage = (event,reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setMessagePop(false)
    }

    const showPopMessage = () => {
        setMessagePop(true)
    }

    const handleMessageType = (value, severity) => {
        setDisplay({
            message: value,
            severity: severity
        })
    }


    useEffect(() => {
        if(data && data.up){
            handleMessageType('Saved Changes', 'success')
            showPopMessage()
        }
        else if(data && data.down){
            handleMessageType('Already exists', 'error')
            showPopMessage()
        }
    },[data])

    useEffect(() => {
        if(isSuccess){
            setPostData({
                name: data.initialArray.name,
                address: data.initialArray.address,
                platform: data.initialArray.platform,
                latitude: data.initialArray.latitude,
                longitude: data.initialArray.longitude,
                experience: data.initialArray.experience,
                phone: data.initialArray.phone,
                email: data.initialArray.email,
                website: data.initialArray.website,
                success: data.initialArray.success,
                university: data.initialArray.universities,
                edit: true,
                id: data.initialArray._id,
                online: data.initialArray.online === true ? "Online" : "Offline"
            })
        }
    },[data])

    const handlePostSubmit = (event) => {
        event.preventDefault()
        setDelayedValue(postData)
    }

    return (
        <div className="parent-post">
            <div className="bar-parent">
                <p>Editing your consultancy</p>
            </div>            
            <div className="con-form">
                <form onSubmit={handlePostSubmit}>
                    <div className="parent-divvs">
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={postData.name}
                                onChange={handleChangePostData}
                                required
                                disabled
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={postData.address}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Platform</label>
                            <input
                                type="text"
                                name="platform"
                                value={postData.platform}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Latitude</label>
                            <input
                                type="number"
                                name="latitude"
                                value={postData.latitude}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input
                                type="number"
                                name="longitude"
                                value={postData.longitude}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Experience</label>
                            <input
                                type="number"
                                name="experience"
                                value={postData.experience}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={postData.phone}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>email</label>
                            <input
                                type="email"
                                name="email"
                                value={postData.email}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Website</label>
                            <input
                                type="text"
                                name="website"
                                value={postData.website}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Success</label>
                            <input
                                type="number"
                                name="success"
                                value={postData.success}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>University</label>
                            <input
                                type="number"
                                name="university"
                                value={postData.university}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div className="acc-in">
                            <label>Online</label>
                            <select name="online" value={postData.online} onChange={handleChangePostData}>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                        </div>
                    </div>
                    <button className="post-the">Update</button>
                </form>
            </div>
            <MessageProp 
            stateValue={messagePop}
            destroy={destroyPopMessage}
            messageType={display.severity}
            message={display.message}
        />
        </div>
    )
}
import { useState, useEffect } from "react"
import { useEditPostSchoolQuery } from "../../app/api/adminSlice"
import { useParams, useNavigate } from "react-router-dom"
import MessageProp from '../../components/utilities/MessageProp';

export default function EditSchool(){

    const {institution} = useParams();

    const [postData, setPostData] = useState({})
    const [delayedData, setDelayedData] = useState({})
    const navigation = useNavigate()

    const {
        data,
        isSuccess,
        isError
    } = useEditPostSchoolQuery({institution, delayedData})

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

    const handlePostSubmit = (event) => {
        event.preventDefault()
        setDelayedData(postData)
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
                address: data.initialArray.location,
                latitude: data.initialArray.latitude,
                longitude: data.initialArray.longitude,
                experience: data.initialArray.experience,
                phone: data.initialArray.phone,
                email: data.initialArray.email,
                website: data.initialArray.website_url,
                success: data.initialArray.success,
                edit: true,
                id: data.initialArray._id,
                opening: data.initialArray.opening_time,
                closing: data.initialArray.closing_time,
                ownership: data.initialArray.ownership === " community Institution " ? "Public" : "Private",
                accreditation: data.initialArray.accreditation
            })
        }
    },[data])

    return (
        <div className="parent-post">
            <div className="bar-parent">
                <p>Editing your school</p>
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
                            <label>Opening Time</label>
                            <input
                                type="time"
                                name="opening"
                                value={postData.opening}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div>
                            <label>Closing Time</label>
                            <input
                                type="time"
                                name="closing"
                                value={postData.closing}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div className="acc-in">
                            <label>Accreditation</label>
                            <select name="accreditation" value={postData.accreditation} onChange={handleChangePostData}>
                                <option value="National Examinations Board">NEB</option>
                                <option value="Cambridge GCE A Levels">Cambridge</option>
                                <option  value="CTEVT">CTEVT</option>
                                <option value="International Baccalaureate">International Baccalaureate</option>
                            </select>
                        </div>
                        <div className="acc-in">
                            <label>Ownership</label>
                            <select name="ownership" value={postData.ownership} onChange={handleChangePostData}>
                                <option value="Private">Private</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                    </div>
                    <button className="post-the">Post Data</button>
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
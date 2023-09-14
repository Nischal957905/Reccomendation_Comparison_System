import { useState , useEffect} from "react"
import { usePostCollegeNewQuery } from "../../app/api/adminSlice"
import MessageProp from '../../components/utilities/MessageProp';
import {useNavigate} from 'react-router-dom'
import {Divider, TextField} from '@mui/material'
import axios from 'axios'

export default function CollegePost(){

    const [postData, setPostData] = useState({
        name: '',
        accreditation: 'None',
        ownership: 'Public',
    })

    const [imageData, setImageData] = useState({
        image: '',
        name: ''
    })

    const navigation = useNavigate()

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('image', imageData.image);
        formData.append('name', imageData.name);
      
        axios.post('http://localhost:8800/admin/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {})
        .catch(err => console.log(err));
    };
      

    const [delayedValue, setDelayedValue] = useState({

    })

    const {
        data,
    } = usePostCollegeNewQuery(delayedValue)

    const mapToAdmin = () =>{
        navigation('/admin')
    }

    useEffect(() => {
        if(data && data === "Created"){
            handleMessageType('Created new College', 'success')
            showPopMessage()
            uploadImage()
            setTimeout(mapToAdmin, 2000)
        }
        if(data && data === "Exists"){
            handleMessageType('College Already Exists','error')
            showPopMessage()
        }
    },[data])

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
        setImageData((prevVal) => {
            return{
                ...prevVal,
                'name': postData.name
            }
        })
        setDelayedValue(postData)
    }

    console.log(imageData);

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

    const handleImageChange = (event) =>{
        setImageData({
            'image': event.target.files[0],
            'name': 'aero'
        })
    }

    return (
        <>
        <div className="parent-post">
            <div className="bar-parent">
                <p>Creating your college</p>
            </div>            
            <div className="con-form">
                <form onSubmit={handlePostSubmit}>
                    <div className="parent-divvs">
                        <div>
                            <TextField 
                                type="text"
                                name="name"
                                value={postData.name}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="name"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="address"
                                value={postData.address}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="address"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="number"
                                name="latitude"
                                value={postData.latitude}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="latitude"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField
                                type="number"
                                name="longitude"
                                value={postData.longitude}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="longitude"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="number"
                                name="experience"
                                value={postData.experience}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="experience"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="phone"
                                value={postData.phone}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="phone"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="email"
                                name="email"
                                value={postData.email}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="email"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="website"
                                value={postData.website}
                                onChange={handleChangePostData}
                                required
                                size="small"
                                label="website"
                                variant="standard"
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
                        <div>
                            <label>Established at</label>
                            <input
                                type="date"
                                name="established"
                                value={postData.established}
                                onChange={handleChangePostData}
                                required
                            />
                        </div>
                        <div className="acc-in">
                            <label>Accreditation</label>
                            <select name="accreditation" value={postData.accreditation} onChange={handleChangePostData}>
                                <option value="Ugc">Ugc</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="online-dvi">
                        <select name="ownership" value={postData.ownership} onChange={handleChangePostData}>
                            <option value="Private">Private</option>
                            <option value="Public">Public</option>
                        </select>
                    </div>
                    <div className="img-divs">
                        <input 
                            type="file"
                            required
                            onChange={handleImageChange}
                        />
                    </div>
                    <button className="post-the">Post Data</button>
                </form>
            </div>
        </div>
        <MessageProp 
            stateValue={messagePop}
            destroy={destroyPopMessage}
            messageType={display.severity}
            message={display.message}
        />
        </>
    )
}
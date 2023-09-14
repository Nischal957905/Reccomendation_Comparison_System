import { usePostConsultancyNewQuery }  from "../../app/api/adminSlice"
import MessageProp from '../../components/utilities/MessageProp';
import {Divider, Input, TextField} from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {IconButton} from "@mui/material";
import { useEffect, useState } from "react"
import FileSaver from 'file-saver'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function ConsultancyPost(){

    const [delayedData, setDelayedValue] = useState()

    
    const navigation = useNavigate()


    const [imageData, setImageData] = useState({
        image: '',
        name: ''
    })

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

    const [postData, setPostData] = useState({
        name: '',
        online: 'Offline',
    })

    const {
        data,
        error,
        refetch
    } = usePostConsultancyNewQuery(delayedData)

    const mapToAdmin = () =>{
        navigation('/admin')
    }

    useEffect(() => {
        if(data && data === "Created"){
            handleMessageType('Created new Consultancy', 'success')
            showPopMessage()
            uploadImage()
            setTimeout(mapToAdmin, 2000)
        }
        if(data && data === "Exists"){
            handleMessageType('Consultancy Already Exists','error')
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

    const handleImageChange = (event) =>{
        setImageData({
            'image': event.target.files[0],
            'name': 'aero'
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

    return (
        <div  className="parent-post">
            <div className="bar-parent">
                <p>Creating your consultancy</p>
            </div>            
            <div className="con-form">
                <form onSubmit={handlePostSubmit}>
                    <div className="parent-divvs">
                        <div>
                            <TextField
                                size="small"
                                variant="standard"
                                label="Name"
                                name="name"
                                value={postData.name}
                                onChange={handleChangePostData}
                                required
                                type="text"
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                name="address"
                                value={postData.address}
                                onChange={handleChangePostData}
                                required
                                label="Address"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField
                                type="text"
                                name="platform"
                                value={postData.platform}
                                onChange={handleChangePostData}
                                required
                                label="platform"
                                size="small"
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
                                label="Latitude"
                                size="small"
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
                                label="Longitude"
                                size="small"
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
                                label="Experience"
                                size="small"
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
                                label="phone"
                                size="small"
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
                                label="email"
                                size="small"
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
                                label="website"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="specialization"
                                value={postData.specialization}
                                onChange={handleChangePostData}
                                required
                                label="specialization"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="country"
                                value={postData.country}
                                onChange={handleChangePostData}
                                required
                                label="country"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="number"
                                name="success"
                                value={postData.success}
                                onChange={handleChangePostData}
                                required
                                label="success"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="number"
                                name="university"
                                value={postData.university}
                                onChange={handleChangePostData}
                                required
                                label="university"
                                size="small"
                                variant="standard"
                            />
                        </div>
                        <div>
                            <TextField 
                                type="text"
                                name="holidays"
                                value={postData.holidays}
                                onChange={handleChangePostData}
                                required
                                label="holidays"
                                size="small"
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
                    </div>
                    <div className="online-dvi">
                        <select name="online" value={postData.online} onChange={handleChangePostData}>
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
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
            <MessageProp 
            stateValue={messagePop}
            destroy={destroyPopMessage}
            messageType={display.severity}
            message={display.message}
        />
        </div>
    )
}
import { usePostUserDiscussionsQuery, useDeleteUserDiscussionsQuery } from '../../app/api/discussionSlice'
import PopUpForm from '../../components/utilities/PopUpForm';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useEffect, useState } from "react";
import { Divider } from '@mui/material';
import {LinearProgress} from '@mui/material'
import MessageProp from '../../components/utilities/MessageProp';
import DeleteConfirm from '../../components/form/DeleteConfirm';


export default function UserPosts(){

    const username = localStorage.getItem('username')


    const [formData, setFormData] = useState({
        'username': username
    })

    const [formState, setFormState] = useState(false)
    const [deleteState, setDeleteState] = useState(false)
    const [delayedDeleteValue, setDelayedDeleteValue] = useState({})

    const [delayedData, setDelayedData] = useState({
        'username': username,
    })

    const [deleteValue, setDeleteValue] = useState()

    const {
        data,
        isSuccess,
        isLoading,
        refetch
    } = usePostUserDiscussionsQuery(delayedData)

    useEffect(() => {
        refetch()
    },[data])

    const {
        data: isData,
        isSuccess: success
    } = useDeleteUserDiscussionsQuery(deleteValue)

    const formHandler = (event) => {
        event.preventDefault()
        setFormState(false)
        if(formData.post !== '' && formData.tag !== ''){
            setDelayedData(formData)
            handleMessageType('changes saved', 'success')
            showPopMessage()
        }
    }

    const changeStateValues = (event) => {
        const {name, value} = event.target;
        setFormData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const handlePopUpForm = (values) => {
        setFormData({
            'username': username,
            'post' : values.post,
            'tag' : values.tag,
            'id' : values._id,
        })
        setFormState(true)
    }

    const closePopUp = () => {
        setDelayedDeleteValue({})
        setFormState(false)
    }

    const closeDeletePopUp = () => {
        setDeleteState(false)
    }
    
    const deletePost = (values) => {
        setDeleteState(true)
        setDelayedDeleteValue({
            'deleteVal': values
        })
    }

    const deletionConfirmation = () => {
        setDeleteValue(delayedDeleteValue)
        setDeleteState(false)
        handleMessageType('deleted', 'success')
        showPopMessage()
    }

    useEffect(() => {
        if(success){
            refetch()
        }
    },[isData])

    const dateFormat = (date) =>{
        const tos = date
        if(date){
            const val = tos.substr(0, 10).split("-");
            return val[2] + "/" + val[1] + "/" + val[0];
        }
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

    return(
        <>
        {
            isLoading &&
            <LinearProgress/>
        }
        <MessageProp 
            stateValue={messagePop}
            destroy={destroyPopMessage}
            messageType={display.severity}
            message={display.message}
        />
        <div className='user-dis-parent'>
            <div className='create-post-div'>
                <div className='create-section'>
                    <p>
                        🆄🆂🅴🆁 🅿🅾🆂🆃🆂
                    </p>
                </div>
                <div className='post-btn'>
                    <button disabled>your posts</button>
                    <button><a href='/discussion'>Posts</a></button>
                </div>
                <Divider/>
            </div>
            <div className='post-section'>
            {
                isSuccess &&
                data.map((item) => {
                    const date = dateFormat(item.date)
                    return (
                        <div key={item._id} className='each-div-user'>
                            <div className='user-tag'>
                                <div className='tag-divv'>Tag: {item.tag}</div>
                                <div className='icons-user'>
                                    <IconButton color='primary' onClick={() => handlePopUpForm(item)}><EditIcon/></IconButton>
                                    <IconButton color='secondary' onClick={() => deletePost(item._id)}><DeleteSweepIcon/></IconButton>
                                </div>
                                </div>
                            <div className='date-fo-hold'>
                                <p>{date}</p>
                                
                            </div>
                            <div className='hold-user-post'>{item.post}</div>
                        </div>
                    )
                })
            }
            </div>
            <PopUpForm 
                formPopStatus={formState}
                formSubmit={formHandler}
                formValueChange={changeStateValues}
                formValue={formData}
                closeForm={closePopUp}
            />
            <DeleteConfirm
                closeForm={closeDeletePopUp}
                formPopStatus={deleteState}
                formSubmit={deletionConfirmation}
            />
        </div>
        </>
    )
}
import { useEffect, useState } from 'react'
import {useGetDiscussionsQuery, usePostDiscussionsQuery} from '../../app/api/discussionSlice'
import useAuthentication from '../../components/hooks/useAuthentication'
import NewPostForm from '../../components/form/NewPostForm'
import { Divider, IconButton } from '@mui/material'
import {LinearProgress} from '@mui/material'
import MessageProp from '../../components/utilities/MessageProp';

export default function Post(){

    const [filter, setFilter] = useState({
        tag: '',
        dateSort: 'Latest',
        popular: 'none'
    })

    const {
        data,
        isSuccess,
        isLoading,
        refetch
    } = useGetDiscussionsQuery(filter)

    const { structuredData } = data ? data : []

    const [showValue, setShowValue] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const { valueForAuth } = useAuthentication()
    const [formValue, setFormValue] = useState({
        'username': valueForAuth.username,
        'post': '',
        'tag': '',
    })
    const [delayedValue, setDelayedValue] = useState({})
    const [commentTrack, setCommentTrack] = useState()

    const setUpdatedValues = (event) => {
        const {value,name} = event.target;
        setFilter((prevVal) => {
            return {
                ...prevVal,
                [name] : value,
            }
        })
    }

    const {
        data: newData,
        isSuccess: succcess,
    } = usePostDiscussionsQuery(delayedValue)

    useEffect(() => {
        if(newData){
            setFormValue({
                'username': valueForAuth.username,
                'post': '',
                'tag': '',
            })
            refetch()
        }
    },[newData])
    const handleOnClick = (index) => {
        if(commentTrack !== null && index === commentTrack){
            setCommentTrack(null)
        }
        else if(commentTrack !== null && index !== commentTrack){
            setCommentTrack(index)
        }
        else{
            setCommentTrack(index)
        }
    }

    
    const [formState, setFormState] = useState(false)
    const fromStateHandler = ()=> {
        setFormState(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleMessageType('you just posted', 'success')
        showPopMessage()
        setDelayedValue(formValue)
        setFormState(false)
        setFormValue({
            'username': valueForAuth.username,
            'post': '',
            'tag': '',
        })
    }

    const [dataComment,setDataComent] = useState({
        'username': valueForAuth.username,
        'comment' : '',
        'commentStatus'  : false
    })

    const commentCreation = (event) => {
        event.preventDefault();
        setDelayedValue(dataComment)
        setDataComent({
            'username': valueForAuth.username,
            'comment' : '',
            'commentStatus'  : false
        })
        handleMessageType('you just commented', 'success')
        showPopMessage()
    }

    const handleOnShow = () => {
        setFormState(true)
    }

    const commentData = (event, ins) => {
        const {value, name} = event.target;
        setDataComent((prevVal) => {
            return {
                ...prevVal,
                'comment' : value,
                'commentStatus' : true,
                'institution' : ins
            }
        })
    }

    const onChangeHandle = (event) => {
        const {value, name} = event.target;
        setFormValue((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
                'posting': true,
            }
        })
    }

    const dateFormat = (date) =>{
        const tos = date
        if(date){
            const val = tos.substr(0, 10).split("-");
            return val[2] + "/" + val[1] + "/" + val[0];
        }
    }

    const tagsRender = data ? data?.uniqueTags.map((item, index) => {
        return (
            <option value={item}>{item}</option>
        )
    }) : null

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

    const dataRender = isSuccess ? 
        structuredData.map((item,index) => {
            const date = dateFormat(item.post.date)

            const comments = item?.comments.map((element,prop) => {
                return (
                    <div key={prop} className='comment-div'>
                        <div className='comment-user'>{element.username}</div>
                        <div className='popo'><p>{element.comment}</p></div>
                    </div>
                )
            })
            return (
                <div key={index} className='post-each'>
                    <div className='content-post'>
                        <div className='dateuser'>
                            <div className='user'>
                                {item.user}
                            </div>
                            <div className='dateo'>
                                {date}
                            </div>
                        </div>
                        <Divider/>
                        <div className='post-con'>
                            {item.post.post}
                        </div>
                        <Divider/>
                        {
                            index === commentTrack &&
                            <div>
                                <div className='add-new'>
                                    <form onSubmit={commentCreation}>
                                        <div className='form-sadiv'>
                                            <input
                                                type='text'
                                                name='comment'
                                                value={dataComment.comment}
                                                onChange={(event) => commentData(event,item.post._id)}
                                                required
                                            />
                                            <button className='save-des'>Save Comment</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='p'>
                                    {comments}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='btn-show-cm'>
                        <button onClick={() => handleOnClick(index)}>{item.comments.length > 0 ? item.comments.length : null} Comments</button>
                    </div>
                </div>
            )
        })
    : null

    return(
        <>
        {
            isLoading &&
            <LinearProgress />
        }
        <MessageProp 
            stateValue={messagePop}
            destroy={destroyPopMessage}
            messageType={display.severity}
            message={display.message}
        />
        <div className='dis-body'>
            <div className='create-post-div'>
                <div className='create-section'>
                    <p>
                        🅳🅸🆂🅲🆄🆂🆂🅸🅾🅽
                    </p>
                </div>
                <div className='post-btn'>
                    <button onClick={handleOnShow}>Create A post</button>
                    <button><a href='/discussion/user/post'>Users posts</a></button>
                </div>
                <div>
                    <NewPostForm 
                        formState={formState}
                        formOnClose={fromStateHandler}
                        formOnSubmit={handleSubmit}
                        onChangeHandle={onChangeHandle}
                        formValue={formValue}
                    />
                </div>
                <Divider
                />
            </div>
            <div className='post-section'>
                <div className='post-filter-section'>
                    <div>
                        <label>Date</label>
                        <select name='dateSort' value={filter.dateSort} onChange={setUpdatedValues}>
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                    </div>
                    <div>
                        <label>Popularity</label>
                        <select name='popular' value={filter.popular} onChange={setUpdatedValues}>
                            <option value="Popular">Popular</option>
                            <option value="Unpopular">Unpopular</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    <div>
                        <label>Tag</label>
                        <select name='tag' value={filter.tag} onChange={setUpdatedValues}>
                            <option value="None">None</option>
                            {tagsRender}
                        </select>
                    </div>    
                </div>
                <div className='post-contents'>
                    {dataRender}
                </div>
            </div>
        </div>
        </>
    )
}
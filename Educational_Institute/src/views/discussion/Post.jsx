import { useEffect, useState } from 'react'
import {useGetDiscussionsQuery, usePostDiscussionsQuery} from '../../app/api/discussionSlice'
import useAuthentication from '../../components/hooks/useAuthentication'

export default function Post(){

    const [filter, setFilter] = useState({
        tag: 'None',
        dateSort: 'Latest',
        popular: 'none'
    })

    const {
        data,
        isSuccess,
        refetch
    } = useGetDiscussionsQuery(filter)

    const { structuredData } = data ? data : []

    const [showValue, setShowValue] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const { valueForAuth } = useAuthentication()
    const [formValue, setFormValue] = useState({
        'username': valueForAuth.username,
        'post': '',
        'tag': 'basbas',
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setDelayedValue(formValue)
    }

    const [dataComment,setDataComent] = useState({
        'username': valueForAuth.username,
        'comment' : '',
        'commentStatus'  : false
    })

    const commentCreation = (event) => {
        event.preventDefault();
        setDelayedValue(dataComment)
    }

    const handleOnShow = () => {
        setShowNew(!showNew)
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

    const tagsRender = data ? data?.uniqueTags.map((item, index) => {
        return (
            <option value={item}>{item}</option>
        )
    }) : null

    const dataRender = isSuccess ? 
        structuredData.map((item,index) => {

            const comments = item?.comments.map((element,prop) => {
                return (
                    <div key={prop} className='comment-div'>
                        <div>{element.username}</div>
                        <div>{element.comment}</div>
                    </div>
                )
            })
            return (
                <div key={index}>
                    <div className='content-post'>
                        <div className='user'>
                            {item.user}
                        </div>
                        <div>
                            date
                        </div>
                        <div>
                            {item.post.post}
                        </div>
                        {
                            index === commentTrack &&
                            <div>
                                <div className='add-new'>
                                    <form onSubmit={commentCreation}>
                                        <div>
                                            <label>Comment:</label>
                                            <input
                                                type='text'
                                                name='comment'
                                                value={dataComment.comment}
                                                onChange={(event) => commentData(event,item.post._id)}
                                                required
                                            />
                                            <button>Save Comment</button>
                                        </div>
                                    </form>
                                </div>
                                <div className='p'>
                                    {comments}
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <button onClick={() => handleOnClick(index)}>{item.comments.length > 0 ? item.comments.length : null} Comments</button>
                    </div>
                </div>
            )
        })
    : null

    

    return(
        <div>
            <div>
                <div>
                    <button onClick={handleOnShow}>Create A post</button>
                </div>
                <div>
                    <div>Settings</div>
                    <div>
                        <label>Tags</label>
                        <select name='tag' value={filter.tag} onChange={setUpdatedValues}>
                            <option value="None">None</option>
                            {tagsRender}
                        </select>
                    </div>
                    <div>
                        <label>Sort By date</label>
                        <select name='dateSort' value={filter.dateSort} onChange={setUpdatedValues}>
                            <option value="Latest">Latest</option>
                            <option value="Oldest">Oldest</option>
                        </select>
                    </div>
                    <div>
                        <label>Sort By Popularity</label>
                        <select name='popular' value={filter.popular} onChange={setUpdatedValues}>
                            <option value="Popular">Popular</option>
                            <option value="Unpopular">Unpopular</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {
                    showNew &&
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type='text' 
                                name='post' 
                                value={formValue.post} 
                                onChange={onChangeHandle}/>
                        </div>
                        <div>
                            <label>Tags</label>
                            <select name='tag' onChange={onChangeHandle} value={formValue.tag}>
                                <option value='Study lane International Education Consultancy'>Study</option>
                                <option value='basbas'>basbas</option>
                            </select>
                        </div>
                        <button>Post</button>
                    </form>
                }
            </div>
            <div>
                {dataRender}
            </div>
        </div>
    )
}
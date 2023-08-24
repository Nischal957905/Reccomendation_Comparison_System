import { useState } from 'react'
import {useGetDiscussionsQuery, usePostDiscussionsQuery} from '../../app/api/discussionSlice'
import useAuthentication from '../../components/hooks/useAuthentication'

export default function Post(){

    const {
        data,
        isSuccess
    } = useGetDiscussionsQuery()

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

    const {
        data: newData,
        isSuccess: succcess,
    } = usePostDiscussionsQuery(delayedValue)

    const handleOnClick = () => {
        setShowValue(!showValue)
    }

    const handleOnShow = () => {
        setShowNew(!showNew)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setDelayedValue(formValue)
    }

    const onChangeHandle = (event) => {
        const {value, name} = event.target;
        setFormValue((prevVal) => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }

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
                        <div className='likes-holder'>
                            Likes
                        </div>
                        {
                            showValue &&
                                <div className='p'>
                                    {comments}
                                </div>
                        }
                    </div>
                    <div>
                        <button onClick={handleOnClick}>Show Comments</button>
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
import PostsTable from "../../../components/utilities/PostsTable"
import { useEditPostUserQuery } from '../../../app/api/adminSlice'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserPost(){


    const {institution} = useParams()
    const [delayedData, setDelayedData] = useState()
    const navigation = useNavigate()

    const {
        data,
        isSuccess,
        isError
    } = useEditPostUserQuery({institution,delayedData})
    
    useEffect(() => {
        if(isError){
            navigation('/error')
        }
    },[isError])

    return (
        <div className="body-tab">
            {
                isSuccess &&
                <PostsTable
                    props={data}
                />
            }
        </div>
    )

}
import PostsTable from "../../../components/utilities/PostsTable"
import { useEditPostUserQuery } from '../../../app/api/adminSlice'
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function UserPost(){


    const {institution} = useParams()
    const [delayedData, setDelayedData] = useState()

    const {
        data,
        isSuccess
    } = useEditPostUserQuery({institution,delayedData})

    return (
        <div>
            {
                isSuccess &&
                <PostsTable
                    props={data}
                />
            }
        </div>
    )

}
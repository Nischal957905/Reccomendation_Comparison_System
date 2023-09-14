import { useGetUserListQuery, useInactivateUserQuery } from '../../../app/api/adminSlice'
import AdminUserTable from '../../../components/utilities/AdminUserTable'
import { useEffect, useState } from "react"

export default function User(){

    const {
        data,
        isSuccess,
        refetch
    } = useGetUserListQuery()

    const [user, setUser] = useState({
        user: ''
    })

    const {
        data: sucData,
        isLoading: loading,
    } = useInactivateUserQuery(user)

    const handleInactivate = (data) => {
        setUser({
            user: data
        })
    }

    useEffect(() =>{
        if(isSuccess){
            setUser({
                user: ''
            })
        }
        refetch()
    }, [loading])

    return(
        <div className='body-tab'>
            {
                isSuccess && 
                <AdminUserTable
                    props={data}
                    deletion={handleInactivate}
                />
            }
        </div>
    )
}
import { useGetCompanyQuery } from "../../app/api/comparisonSlice"
import  { useParams } from 'react-router-dom'

export default function ComparisonPage(){


    const { id } = useParams();
    const {
        data,
    } = useGetCompanyQuery(id)

    return(
        <>
        hello
        </>
    )
}
import { usePostRegisterQuery } from "../../auth/authSlice"
 
export default function Register(){

    const {
        data,
        isSuccess
    } = usePostRegisterQuery()

    return (
        <div>das</div>
    )
}
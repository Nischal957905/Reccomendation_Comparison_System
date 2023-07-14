// import {useSelector} from 'react-redux'
// import { selectInstitutionById } from '../../features/institution/restInstitutionApi'
// import { useNavigate } from 'react-router-dom'

// export default function Institution({institutionId}) {


//     const institution = useSelector(state => selectInstitutionById(state, institutionId))

//     const navigate = useNavigate()

//     if(institution){
//         return (
//             <tr>
//                 <td>
//                     {institution.name}
//                 </td>
//             </tr>
//         )
//     } else return null
// }
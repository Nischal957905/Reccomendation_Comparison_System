// import { useGetInstitutionsQuery } from "../../features/institution/restInstitutionApi"
// import Institution from "./Institution"
// import { useSelector } from 'react-redux';
// import { selectInstitutionsResult } from "../../features/institution/restInstitutionApi"

// export default function InstitutionList(){

//     const institutionsResult = useSelector(selectInstitutionsResult);

//   console.log('Institutions Result:', institutionsResult);

//     const {
//         data: institutions,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetInstitutionsQuery()

//     let content
//     if(isError) {
//         content = <p className={isError ? "errmsg" : "offscreen"}>{error ?.data?.message}</p>
//     }

//     const { ids } = institutions
//     const tableContent = ids?.length
//         ? ids.map(institutionId => <Institution key={institutionId} userId={userId} />)
//         : null

//     content = (
//         <table >
//             <thead>
//                 <tr>
//                     <th>Name</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {tableContent}
//             </tbody>
//         </table>
//     )    
// }


import { useGetInstitutionsQuery } from "../../app/api/appSlice"
import React, { useEffect, useState } from "react"
import '../../index.css'
import { MdExpandMore } from 'react-icons/Md'
import { BiSearchAlt,BiSolidSortAlt } from 'react-icons/Bi'
import { IoMdSettings } from 'react-icons/Io'
import { RiArrowDropDownLine } from 'react-icons/Ri'
import { GrFormNextLink } from 'react-icons/Gr'
import { PiNumberOneBold as One,
        PiNumberTwoBold as Two,
        PiNumberThreeBold as Three,
        PiNumberFourBold as Four,
        PiNumberFiveBold as Five,
        PiNumberSixBold as Six,
        PiNumberSevenBold as Seven,
        PiNumberEightBold as Eight,
        PiNumberNineBold as Nine,
        PiNumberZeroBold as Zero } from 'react-icons/Pi'
// import Institution from "./Institution"

export default function InstitutionList(){

    const {
        data: institutions,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetInstitutionsQuery()

    const [score, setScore] = useState([])

    useEffect(() => {

        if(Array.isArray(institutions) && institutions.length > 0) {

            const dataCalculation = institutions.map((institution) => {
                const universityCount = Number.isInteger(institution.universities) 
                    ? institution.universities : parseInt(institution.universities)
                const experience = Number.isInteger(institution.experience)
                    ? institution.experience : parseInt(institution.experience)  
                const graduates = Number.isInteger(institution.success)
                    ? institution.success : parseInt(institution.success)  
            
                return {
                    name: institution.name,
                    experience: experience <= 5 && experience >= 2
                                    ? 3
                                    : experience <= 10
                                    ? 5
                                    : experience <= 15
                                    ? 7
                                    : experience <= 20
                                    ? 10
                                    : experience > 20
                                    ? 13
                                    :0,
                    success: graduates <= 100 && graduates >= 20
                                ? 3
                                : graduates <= 500
                                ? 6
                                : graduates <= 1000
                                ? 9
                                : graduates <= 5000
                                ? 13
                                : graduates > 5000
                                ? 16
                                : 0,
                    partners: universityCount <= 10 && universityCount >= 2
                                ? 3
                                : universityCount <= 25
                                ? 5
                                : universityCount <= 50
                                ? 7
                                : universityCount <= 100
                                ? 10
                                : universityCount > 100
                                ? 13
                                : 0
                }
            })

            const sumPerformancePoint = dataCalculation.map((data) => {
                    const totalPoint = data.partners + data.success + data.experience
                    return {
                        performance: totalPoint,
                        name: data.name
                    }
            })
            sumPerformancePoint.sort(
                (initial,trailing) => trailing.performance - initial.performance)
            const leadingInstitutions = sumPerformancePoint.slice(0,10)    
            setScore(leadingInstitutions)
        }
    },[institutions])

 
    const institutionName = Array.isArray(institutions)
    ? institutions.map((institution, index) => {
        const imagesDirectory = `/images/${institution.name.replace(/ /g, "_")}`;
        return (
            <div key={index} className="child-items">
                <div key={index} className="img-holder">
                    <img src={`${imagesDirectory}.jpg`} className="logo-img"></img>
                </div>
                <div className="name-holder">
                    {institution.name}
                    <GrFormNextLink className="link-institution"/>
                </div>
            </div>
        )
    }) : null

    const numberArray = {1: <One/>,2: <Two/>,3: <Three/>,4:<Four/>,5:<Five/>,6:<Six/>,7:<Seven/>,8:<Eight/>,9:<Nine/>};

    const returnNumber = (number) => {

        const numbers = parseInt(number)
        let content;

        if(numbers === 10){
            content = (
                <div className="ranking-topten">
                    <One className="ranking-one"/>
                    <Zero className="ranking-ten"/>
                </div>
            )
        }

        else{
            content = (
                <div className="ranking-number">
                    {numberArray[numbers]}
                </div>
            )
        }
        return content
    }

    const rankingInstitution = score ? score.map((ranking, index) => {
        const imagesDirectory = `/images/${ranking.name.replace(/ /g, "_")}`;
        return (
            <div key={index} className="ranking-performance">
                <div className="line-top"></div>
                <div key={index} className="info-top">
                    <img src={`${imagesDirectory}.jpg`} className="logo-top"></img>
                    <div className="info-top-rated">
                        { returnNumber(index + 1) }
                        <p className="ranked-names">{ranking.name}</p>
                    </div>
                </div>
            </div>
        )
    }) : null

    const searchDiv = (
        <div className="search-holder">
            <div className="search-bar">
                <BiSearchAlt className="search-icon"/>
                <p>Search</p>
            </div>
        </div>
    )

    return (
        <div className="layout">
            <div className="left-div">
                {searchDiv}
                <div>
                    <div className="filter-options">
                        <div className="filter-con">
                            <div className="filter-country">country  <RiArrowDropDownLine className="dropdown"/></div>
                            <div className="filter-location">location  <RiArrowDropDownLine className="dropdown"/></div>
                            <div className="filter-university">university  <RiArrowDropDownLine className="dropdown"/></div>
                            <div className="filter-settings">
                                <p>Filter</p>
                                <IoMdSettings/>
                            </div>
                        </div>
                    </div>
                <   div className="result-counter">
                        <p>Institution Found: {institutions ? institutions.length : 0} </p>
                        <BiSolidSortAlt className="sort-icon"/>
                    </div>
               <    div className="item-container">
                        { institutionName }
                    </div>
                    <div></div>
                </div>
            </div>
            <div className="right-div">
                <div className="rating-menu">
                    <div className="top-holder">Top Rated</div>
                    <div className="top-rating">Rating</div>
                    <div className="top-performance">Performance</div>
                    <div className="top-rank">Rank</div>
                </div>
                <div className="top-rated">
                    { rankingInstitution}
                </div>
            </div>
        </div>
    )
}
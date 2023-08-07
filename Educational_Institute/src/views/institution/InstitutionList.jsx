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

/*
These are the imports that are required in the development of the system.
Various inclusion of imports containing react-icon imoprts as well as differet state imports exist
*/

import { useGetInstitutionsQuery, useGetInstitutionsOnFilterQuery } from "../../app/api/appSlice"
import { appSlice } from "../../app/api/appSlice"
import React, { useEffect, useState } from "react"
import '../../index.css'
import Button from '@mui/material/Button'
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

import Filter from "../../components/filter/Filter"
import { UseMutation } from "@reduxjs/toolkit/dist/query/react"
//Function definintion to be exported.
export default function InstitutionList(){

    //Custom hook of rtk query being used to get the data from the rest api
    const {
        data: institutionData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetInstitutionsQuery()


    const { institutions, countries, emails, speciality} = institutionData ? institutionData : []
   
    //React use state being setup to store the top ten insitutions in the database
    const [score, setScore] = useState([])

    const val = false;
    const [filteredData, setFilteredData] = useState([])

    function filterData(filterCondition) {
        if(Array.isArray(filterCondition)){
            
        }
    }

    const [selectedValue, setSelectedValue] = useState({});

    const updateFilters = (field, values) => {
        setSelectedValue((prevVal, index) => {
            return {
                ...prevVal,
                [field]: values
            }
        })
    }

    const { 
        data: dataFiltered, 
        isLoading: filterLoading, 
        error: filterError
    } = useGetInstitutionsOnFilterQuery(selectedValue);

    const { status }  = dataFiltered ? dataFiltered : []
    const dataFiltration = dataFiltered? dataFiltered.institutions : null

    const submitFilters = async (event) => {
        event.preventDefault()
    }

    //this effect calculates the point for the insitution and returns 10 insitutions 
    //ranked top. It runs only once per initial render.
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

 
    //This code consists of codes to return necessary jsx for the each insitituoin
    //in the database system.

    const institutionName = (Array.isArray(dataFiltration) && status) ? 
        dataFiltration.map((institution, index) => {
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
            }) : Array.isArray(institutions)
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

    //this array holds different aliased component to render ranks per the ranks.
    const numberArray = {1: <One/>,2: <Two/>,3: <Three/>,4:<Four/>,5:<Five/>,6:<Six/>,7:<Seven/>,8:<Eight/>,9:<Nine/>};

    //function to determine ranking of the instituion and return the number they have.
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

    //This call back function returns require jsx syntaxes for the rendering purposes.
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

    //This vraiable consists of the jsx to be returned and rendered for the search div.
    const searchDiv = (
        <div className="search-holder">
            <div className="search-bar">
                <BiSearchAlt className="search-icon"/>
                <p>Search</p>
            </div>
        </div>
    )

    //This is the return statement for the page and actually renders whatever is inside it.
    return (
        <div className="layout">
            <div className="left-div">
                {searchDiv}
                <div>
                    <div className="filter-options">
                        <div className="filter-con">
                            <form onSubmit={submitFilters}>
                            <div className="filter-country"><Filter fieldName="country" update={updateFilters}  options={countries || []} values={selectedValue.country || [] }/></div>
                            <div className="filter-location"><Filter fieldName="email" update={updateFilters} options={emails || []} values={selectedValue.email || [] }/></div>
                            <div className="filter-university"><Filter fieldName="speciality" update={updateFilters} options={speciality || []} values={selectedValue.speciality || [] }/></div>
                            <button>Apply</button>
                            </form>
                            <div className="filter-settings">
                                <p>Filter</p>
                                <IoMdSettings/>
                            </div>
                        </div>
                    </div>
                    <div className="result-counter">
                        <p>Institution Found: {institutions ? institutions.length : 0} </p>
                        <BiSolidSortAlt className="sort-icon"/>
                    </div>
                    <div className="item-container">s
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
/*
These are the imports that are required in the development of the system.
Various inclusion of imports containing react-icon imoprts as well as differet state imports exist
*/

import { useGetCollegesQuery, useGetCollegesOnAdditionalFilterQuery } from "../../app/api/appSlice"
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
import SchoolPop from "../../components/utilities/SchoolPop"
import { Link } from 'react-router-dom'
import Paginate from "../../components/pagination/Paginate"



export default function CollegeList(){

    
    const [selectedValue, setSelectedValue] = useState({});

    const {
        data: collegeData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCollegesQuery(selectedValue)

    const { colleges } = collegeData ? collegeData : []
    const [score, setScore] = useState([])

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1)
    },[collegeData])

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let displayedData = colleges && colleges.slice(startIndex, endIndex);
    let totalPages = Math.ceil(colleges && colleges.length / itemsPerPage);

    const handlePageChange = (event, newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    

    //Button handle for pop-up section
    const [popMenuOpen, setPopMenuOpen] = useState(false)
    
    const submitAdditionalFilters = async (event) => {
        event.preventDefault()
    }

    const [popUpFilterApplicants, setPopUpFilterApplicants] = useState({
        'opening-time' : '00:00:00',
        'closing-time' : '00:00:00',
        'experience-start': 0,
        'experience-end': 0,
        'distance': 'Near',
    })


    const updatePopUpFilterApplicants = (field, values) => {
        setPopUpFilterApplicants((prevVal, index) => {
            return {
                ...prevVal,
                [field]: values,
            }
        })
    }

    const [delayedValue, setDelayedValue] = useState();
    const delayApplier = () => {
        console.log("Das")
        setPopMenuOpen(false)
        setSelectedValue((prevVal) => {
            return {
                ...prevVal,
                ...popUpFilterApplicants
            }
        })
        //setDelayedValue(popUpFilterApplicants)
    }

    const popMenuOpenHandler = () => {
        setPopMenuOpen(true)
    }

    const popMenuCloseHandler = () => {
        setPopMenuOpen(false)
    }

    const popMenuClearHandler = () => {
        const value = {
            'opening-time' : '00:00:00',
            'closing-time' : '00:00:00',
            'experience-start': 0,
            'experience-end': 0,
            'distance': 'Near',
            'filterAppliedOn': false,
        }
        setPopUpFilterApplicants(value)
        setSelectedValue({})
    }

 
    useEffect(() => {

        if(Array.isArray(colleges) && colleges.length > 0) {

            const dataCalculation = colleges.map((institution) => {
                const experience = Number.isInteger(institution.experience)
                    ? institution.experience : parseInt(institution.experience)   
            
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
                }
            })

            const sumPerformancePoint = dataCalculation.map((data) => {
                    const totalPoint = data.experience
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
    },[colleges])

    
    const collegeName = Array.isArray(colleges)
        ? displayedData.map((college, index) => {
            const imagesDirectory = `/images/VITO_Education`;
            return (
                <div key={index} className="child-items">
                    <div key={index} className="img-holder">
                        <img src={`${imagesDirectory}.jpg`} className="logo-img"></img>
                    </div>
                    <div className="name-holder">
                        {college.name}
                        <Link to={`/college/${college.name}`}>
                            <GrFormNextLink className="link-institution"/>
                        </Link>
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

    const submitFilters = async (event) => {
        event.preventDefault()
    }

    const updateFilters = (field, values) => {
        setSelectedValue((prevVal, index) => {
            return {
                ...prevVal,
                [field]: values
            }
        })
    }

    
    //This call back function returns require jsx syntaxes for the rendering purposes.
    const rankingCollege = score ? score.map((ranking, index) => {
        const imagesDirectory = `/images/AACC_Global`;
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

    return(
        <div className="layout">
            <div className="left-div">
                {searchDiv}
                <div>
                    <div className="filter-options">
                        <div className="filter-con">
                            <form onSubmit={submitFilters}>
                                <div className="filter-ucg"><Filter fieldName="ugc" update={updateFilters}  options={[' ✓ UGC Accredited',' ✓ UGC Non-Accredited']} values={selectedValue.ugc || [] }/></div>
                                <div className="filter-experience"><Filter fieldName="experience" update={updateFilters} options={['High','Low','Moderate']} values={selectedValue.experience || [] }/></div>
                                <div className="filter-ownership"><Filter fieldName="ownership" update={updateFilters} options={[' community Institution ',' private Institution ']} values={selectedValue.ownership || [] }/></div>
                                <button>Apply</button>
                            </form>
                            <div className="filter-settings" onClick={popMenuOpenHandler}>
                                <p>Filter</p>
                                <IoMdSettings/>
                            </div>
                        </div>
                    </div>
                    <div className="result-counter">
                        <p>Institution Found: {colleges ? colleges.length : 0} </p>
                        <BiSolidSortAlt className="sort-icon"/>
                    </div>
                    <div className="item-container">
                        { collegeName }
                    </div>
                    <div></div>
                </div>
            </div>
            <div>
                <form onSubmit={submitAdditionalFilters}>
                    <SchoolPop 
                        openStatus ={popMenuOpen} 
                        popUpMenuOpenHandle={popMenuOpenHandler} 
                        popUpMenuCloseHandle ={popMenuCloseHandler}
                        popUpMenuOptions = {popUpFilterApplicants}
                        setPopUpMenuOptions = {updatePopUpFilterApplicants}
                        applyDelay = {delayApplier}
                        applyClear = {popMenuClearHandler}
                    />
                </form>
            </div>
            <div className="right-div">
                <div className="rating-menu">
                    <div className="top-holder">Top Rated</div>
                    <div className="top-rating">Rating</div>
                    <div className="top-performance">Performance</div>
                    <div className="top-rank">Rank</div>
                </div>
                <div className="top-rated">
                    { rankingCollege}
                </div>
                <Paginate
                    count={totalPages}
                    update={handlePageChange}
                    pageCurrently={currentPage}
                />
            </div>
        </div>
    )
}
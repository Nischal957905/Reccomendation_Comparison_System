import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom'
import { Carousel } from 'antd';
import { useState } from 'react';


export default function Home(){

    const [changeSt, setChangeSt] = useState(true)

    const changeImg = () => {
        setChangeSt(!changeSt)
    }

    const conArr = (
        <div className="parent-grid">
            <Link to="/institution/Alfa Beta Education Consultancy">
            <div className="imgd">
                <img src="/images/Alfa_Beta_Education_Consultancy.jpg"/>
            </div>
            </Link>
            <Link to="/institution/AE Global Pvt. Ltd.">
            <div className="imgd">
                <img src="/images/AE_Global_Pvt._Ltd..jpg"/>
                </div>
            </Link>
            <Link to="/institution/AIP Education">
            <div className="imgd">
                <img src="/images/AIP_Education.jpg"/>
            </div>
            </Link>
            <Link to="/institution/Education Asia">
            <div className="imgd">
                <img src="/images/Education_Asia.jpg"/>
            </div>
            </Link>
        </div>
    )

    const thirdArr = (
        <div className="parent-grid">
            <Link to="/institution/SI-UK">
            <div className="imgd">
                <img src="/images/SI-UK.jpg"/>
            </div>
            </Link>
            <Link to="/institution/Edu Care Institute">
            <div className="imgd">
                <img src="/images/Edu_Care_Institute.jpg"/>
                </div>
            </Link>
            <Link to="/institution/AECC Global Education">
            <div className="imgd">
                <img src="/images/AECC_Global_Education.jpg"/>
            </div>
            </Link>
            <Link to="/institution/Connect Globe Edu Group">
            <div className="imgd">
                <img src="/images/Connect_Globe_Edu_Group.jpg"/>
            </div>
            </Link>
        </div>  
    )

    return (
        <div className="main-home">
            <div className="up-home">
                <div className='icon-diva'>
                    <Carousel autoplay>
                        <div className='diva-img'>
                            <p>Plan your Career now!</p>
                        </div>
                        <div className='diva-imgas'>
                            <p>Thousands of institutions to pick</p>
                        </div>
                        <div className='diva-imgj'>
                            <p>Compare and See for yourself</p>
                        </div>
                        <div className='diva-imgc'>
                            <p>Get the recommendations</p>
                        </div>
                    </Carousel>
                </div>
            </div>
            <div className="low-home">
                <div className="reco-bar">
                    <div>Recommended</div>
                </div>
                <div className="card-hold">
                    { changeSt ? conArr : thirdArr}
                    <div className="arrows">
                        <IconButton onClick={changeImg}><KeyboardDoubleArrowRightIcon/></IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
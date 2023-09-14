import { useGetComparisonCollegeQuery } from "../../app/api/comparisonSlice"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MessageProp from "../../components/utilities/MessageProp";
import {LinearProgress} from "@mui/material";

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
//Tabs
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Barchart
import { Bar } from 'react-chartjs-2'
import { BarChart} from '@mui/x-charts'


export default function ComparisonCollege() {

    const [selectedInstitution, setSelectedInstitution] = useState({});
    const [delayedValue, setDelayedValue] = useState()
    const {
        data: institutionData,
        isSuccess,
        isLoading,
        error
    } = useGetComparisonCollegeQuery(delayedValue)

    const {scoreObject} = institutionData ? institutionData : []

    let experienceArray = [];
    let accessArray = [];
    let totalArray = [];
    let ratingArray =  [];
    let label = [];

    if(scoreObject){
        scoreObject.forEach((item,index) => {

            const experiencePoint = item.experience !== null ? item.experience : 10;
            const accesPoint = item.access !== null ? item.access : 10;
            const reviewPoint = item.review !== null ? item.review : 0;
            experienceArray.push(experiencePoint)
            accessArray.push(accesPoint)
            ratingArray.push(item.review)
            totalArray.push(experiencePoint + accesPoint + reviewPoint)
            label.push(item.institution.name)
        });
    }

    const institutionsName  = institutionData ? institutionData.institutionsName: [];
    
    const [count, setCount] = useState(0);

    const handleInsititutionSelection = (event, newVal, iterVal) => {
        setSelectedInstitution((prevVal) => {
            return {
                ...prevVal,
                [iterVal]: newVal
            }
        })
    }

    const [messagePop, setMessagePop] = useState(false)
    const [display, setDisplay] = useState({
        message: '',
        severity: '',
    })
    const destroyPopMessage = (event,reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setMessagePop(false)
    }

    const showPopMessage = () => {
        setMessagePop(true)
    }

    const [nonSelected,setNonSelected] = useState(true)
    useEffect(() => {
        if(isSuccess && !institutionData?.scoreObject){
            setNonSelected(true)
        }
        else if(isSuccess && institutionData?.scoreObject){
            setNonSelected(false)
        }
    },[institutionData])

    const handleMessageType = (value, severity) => {
        setDisplay({
            message: value,
            severity: severity
        })
    }

    //Tab section
    const [tabValue, setTabValue] = useState("1")
    const tabSwappingHandler = (event, newVal) => {
        setTabValue(newVal)
    }

    const addComparison = () => {
        if(count == 1){
            handleMessageType('Can not exceed the 3 institutions', 'error')
            showPopMessage()
        }
        if(count < 1) {
            setCount((prevVal) => {
                return prevVal + 1
            })
        }
    }

    const handleClickCompare = () => {
        if(Object.keys(selectedInstitution).length > 1 && Object.keys(selectedInstitution).length < 4){
            const objectLength = selectedInstitution.length;
            const check = checkValue(selectedInstitution)
            if(check){
                setDelayedValue(selectedInstitution)
                if(isSuccess){
                    handleMessageType('Institution Successfuly compared!','success')
                    showPopMessage()
                }
            }
            else{
                handleMessageType('Empty Values are not allowed','error')
                showPopMessage()
            }
        }
        if(error){
            handleMessageType('some error occured','error')
            showPopMessage()
        }
    }

    const checkValue = (val) => {
        return Object.values(val).every(item => item !== '' && item !== null);
    }

    
    const institutionsPop = [
        {
            item1: 'AITM College',
            item2: 'Brixton College'

        },
        {
            item1: 'NAMI College',
            item2: 'Camad College'
        }, 
        {
            item1: 'Modern Nepal College',
            item2: 'Kathmandu Medical College'
        },
        {
            item1: 'Ratna Rajya Laxmi Campus',
            item2: 'Little Buddha College of Health Science'
        } , 
        {
            item1: 'Mid-Valley International College',
            item2: 'Saraswati Multiple Campus',
        },
        {
            item1: "St. Xavier's College, Maitighar",
            item2: 'Nepal Law Campus',
        },
        {
            item1: 'The British College',
            item2: 'Softwarica College of IT and E-commerce'
        },
        {
            item1: 'United College',
            item2: 'Trichandra Multiple Campus'
        },
        {
            item1: 'Padma Kanya Multiple Campus',
            item2: 'Padmashree College'
        }
    ]

    const institutionName = [
        {
            item1: 'AITM College',
            item2: 'Brixton College'

        },
        {
            item1: 'NAMI College',
            item2: 'Camad College'
        }, 
        {
            item1: 'Modern Nepal',
            item2: 'KMC'
        },
        {
            item1: 'Ratna R Laxmi',
            item2: 'Little Buddha'
        } , 
        {
            item1: 'Mid-Valley',
            item2: 'Saraswati',
        },
        {
            item1: "St. Xavier's",
            item2: 'Nepal Law',
        },
        {
            item1: 'British',
            item2: 'Softwarica'
        },
        {
            item1: 'United College',
            item2: 'Trichandra'
        },
        {
            item1: 'Padma Kanya',
            item2: 'Padmashree'
        }
    ]

    const handlePopular = (values) => {
        setSelectedInstitution({
            1: values.item1,
            2: values.item2
        })
        setDelayedValue({
            1: values.item1,
            2: values.item2
        })
    }

    const popularCards = institutionsPop.map((item, index) => {
        const imagesDirectory1 = `/images/${item.item1.replace(/ /g, "_")}`;
        const imagesDirectory2 = `/images/${item.item2.replace(/ /g, "_")}`;
        return (
            <div key={index} className="each-item-pop">
                <div className="card-img">
                    <img src={`${imagesDirectory1}.jpg`} className="comaparable-img"></img>
                    <p>{institutionName[index].item1}</p>
                </div>
                <div className="icons">
                    <IconButton color="secondary" onClick={() => handlePopular(item)}><CompareArrowsIcon/></IconButton>
                </div>
                <div className="card-img">
                    <img src={`${imagesDirectory2}.jpg`} className="comaparable-img"></img>
                    <p>{institutionName[index].item2}</p>
                </div>
            </div>
        )
    })

    return(
        <div>
            {
                isLoading &&
                <LinearProgress />
            }
            <MessageProp 
                stateValue={messagePop}
                destroy={destroyPopMessage}
                messageType={display.severity}
                message={display.message}
            />
            <div className="main-auto">
                <div className="add-controls">
                    <Button color="secondary" variant="outlined" onClick={addComparison}><AddIcon/></Button>
                </div>
                <div className="auto-holder">
                    <div className="first-auto">
                        <Autocomplete
                            disablePortal
                            size="small"
                            id="auto-completion"
                            className="select-comparison"
                            options={institutionsName}
                            value={selectedInstitution[1] || null}
                            onChange={(event, newVal) => handleInsititutionSelection (event, newVal, 1)}
                            renderInput={(params) => <TextField {...params} label="Institution"/>}
                        />
                    </div>
                    <div className="second-auto">
                        <Autocomplete
                            disablePortal
                            id="auto-completion"
                            className="select-comparison"
                            size="small"
                            options={institutionsName}
                            value={selectedInstitution[2] || null}
                            onChange={(event, newVal) => handleInsititutionSelection (event, newVal, 2)}
                            renderInput={(params) => <TextField {...params} label="Institution"/>}
                        />
                    </div>
                    {
                        count > 0 &&
                        [...Array(count)].map((item, index) => (
                            <div key={index} className="third-auto">
                                <Autocomplete
                                    disablePortal
                                    id="auto-completion"
                                    size="small"
                                    className="select-comparison"
                                    options={institutionsName}
                                    value={selectedInstitution[index + 3] || null}
                                    onChange={(event, newVal) => handleInsititutionSelection (event, newVal, index + 3)}
                                    renderInput={(params) => <TextField {...params} label="Institution"/>}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="auto-controls">
                    <Button variant="contained" onClick={handleClickCompare}>Compare</Button>
                </div>
            </div>    
            <div className="bar-container">
                {
                    scoreObject &&
                <Box>
                    <TabContext value={tabValue}>
                        <Box sx={{borderBottom:1, borderColor:"divider"}}>
                            <TabList onChange={tabSwappingHandler} centered>
                                <Tab value="1" label="Experience"/>
                                <Tab value="2" label="Accessibility"/>
                                <Tab value="3" label="Rating"/>
                                <Tab value="4" label="Overall"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="barchart-design">
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'barCategories',
                                            data: label,
                                            scaleType: 'band',
                                            label: 'Experience Points'
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: experienceArray
                                        }
                                    ]}
                                    height={400}
                                    width={800}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="barchart-design">
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'accessCategory',
                                            data: label,
                                            scaleType: 'band',
                                            label: 'Access Points'
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: accessArray
                                        }
                                    ]}
                                    height={400}
                                    width={800}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value="3">
                            <div className="barchart-design">
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'ratingCategories',
                                            data: label,
                                            scaleType: 'band',
                                            label: 'Rating Points'
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: ratingArray
                                        }
                                    ]}
                                    height={400}
                                    width={800}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value="4">
                            <div className="barchart-design">
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'totalCategory',
                                            data: label,
                                            scaleType: 'band',
                                            label: 'Total Points'
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: totalArray
                                        }
                                    ]}
                                    height={400}
                                    width={800}
                                />
                            </div>
                        </TabPanel> 
                    </TabContext>
                </Box>
                }
            </div>
            {
                nonSelected && (
                    <div>
                        <Divider variant="middle">
                            <Chip  color="primary" label={"Popular Comparisons"}/>
                        </Divider>
                        <div className="popular-cards">
                            {popularCards}
                        </div>
                    </div>
                )
            }
            {
                
                scoreObject &&
                <div className="comparable-item-box">
                    {
                        scoreObject.map((item,index) => {
                            const imagesDirectory = `/images/${item.institution.name.replace(/ /g, "_")}`;
                            return(
                                <div className="comparable-items" key={index}>
                                    <Divider variant="middle">
                                        <Chip label={item.institution.name}/>
                                    </Divider>
                                    <div className="comp-img">
                                        <img src={`${imagesDirectory}.jpg`} className="comaparable-img"></img>
                                    </div>
                                    <div className="totalPoints">
                                        <div className="Service-comp">
                                            <div className="des-comp">
                                                Accesibility score: {item.access  !== null ? item.access : 0}
                                            </div>
                                            <div className="des-comp">
                                                Experience score: {item.experience  !== null ? item.experience : 0}
                                            </div>
                                        </div>
                                        <div className="total-comp">
                                            <div className="des-comp">
                                                Total points: {item.review+ item.access + item.experience}
                                            </div>
                                            <div className="des-comp">
                                                Rating score: {item.review}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="features-comparison">
                                        <div>
                                            <h3>Pros</h3>
                                            <ul>
                                                {item.institution.online && 
                                                    <li>{item.institution.name} has online classes.</li>
                                                }
                                                {
                                                    item.institution.experience !== "" || item.institution.experience > 6 ?
                                                    (
                                                        <li>It has the experience of {item.institution.experience} years.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.ugc === " ✓ UGC Accredited" ?
                                                    (
                                                        <li>It is {item.institution.ugc}</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.ownership === " community Institution" ? 
                                                    (
                                                        <li>It is a community owned college</li>
                                                    ) : null
                                                }
                                                {
                                                    item.distanceMetre && item.distanceMetre < 500 ?
                                                    (
                                                        <li>It has a very minimal distance of {Math.ceil(item.distanceMetre)} metres.</li>
                                                    ) : null
                                                }
                                            </ul>
                                        </div>
                                        <div className="cons-div">
                                            <h3>Cons</h3>
                                            <ul>
                                                {!item.institution.online && 
                                                    <li>{item.institution.name} has no online classes.</li>
                                                }
                                                {
                                                    item.institution.experience === "" || item.institution.experience < 6 ?
                                                    (
                                                        <li>It has the experience of less than 5 years.</li>
                                                    ) : null
                                                } 
                                                {
                                                    !item.institution.ugc === " ✓ UGC Accredited" ?
                                                    (
                                                        <li>It has not UGC Accredited</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.platform !== " community Institution" ? 
                                                    (
                                                        <li>It is owned by a private party</li>
                                                    ) : null
                                                }
                                                {
                                                    item.distanceMetre && item.distanceMetre > 499 ?
                                                    (
                                                        <li>It has a very quite a  distance of {Math.ceil(item.distanceMetre)} metres.</li>
                                                    ) : null
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}
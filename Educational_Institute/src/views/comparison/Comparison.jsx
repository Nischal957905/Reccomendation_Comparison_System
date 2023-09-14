import { useGetComparisonsQuery } from "../../app/api/comparisonSlice"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {LinearProgress} from "@mui/material";

import MessageProp from "../../components/utilities/MessageProp";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

//Button
import IconButton from '@mui/material/IconButton';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

//Tabs
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Barchart
import { Bar } from 'react-chartjs-2'
import { BarChart} from '@mui/x-charts'


export default function Comparison() {

    const [selectedInstitution, setSelectedInstitution] = useState({});
    const [delayedValue, setDelayedValue] = useState()

    const {
        data: institutionData,
        isLoading,
        isSuccess,
        error
    } = useGetComparisonsQuery(delayedValue)

    const {scoreObject} = institutionData ? institutionData : []

    let serviceArray = [];
    let experienceArray = [];
    let accessArray = [];
    let totalArray = [];
    let ratingArray =  [];
    let label = [];
    
    if(scoreObject){
        scoreObject.forEach((item,index) => {
            const servicePoint = item.service !== null ? item.service : 10
            const experiencePoint = item.experience !== null ? item.experience : 10;
            const accesPoint = item.access !== null ? item.access : 10;
            const reviewPoint = item.review !== null ? item.review : 0;
            serviceArray.push(servicePoint)
            experienceArray.push(experiencePoint)
            accessArray.push(accesPoint)
            ratingArray.push(item.review)
            totalArray.push(servicePoint + experiencePoint + accesPoint + reviewPoint)
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

    //Message

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

    const checkValue = (val) => {
        return Object.values(val).every(item => item !== '' && item !== null);
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

    const institutionsPop = [
        {
            item1: '3 Bees Education and Visa Services',
            item2: 'AE Global Pvt. Ltd.',

        },
        {
            item1: 'AECC Global Education',
            item2: 'Study lane International Education Consultancy'
        }, 
        {
            item1: 'Alfa Beta Education Consultancy',
            item2: 'AUS Studies'
        },
        {
            item1: 'ARETE Education Consultancy',
            item2: 'Expert Education and Visa Services'
        } , 
        {
            item1: 'Alight group Consultancy',
            item2: 'American Edu Consultancy',
        },
        {
            item1: 'Espire Education',
            item2: 'Emerald Education Consultants',
        },
        {
            item1: 'ARETE Education Consultancy',
            item2: 'AE Global Pvt. Ltd.',
        } , 
        {
            item1: 'Alight group Consultancy',
            item2: 'AECC Global Education',
        },
        {
            item1: 'Espire Education',
            item2: '3 Bees Education and Visa Services',
        },
    ]

    const institutionName = [
        {
            item1: '3 Bees Visa',
            item2: 'AE Global'
        },
        {
            item1: 'AECC Global',
            item2: 'Study Lane'
        },
        {
            item1: 'Alfa Beta',
            item2: 'AUS Studies'
        },
        {
            item1: 'ARETE Edu',
            item2: 'Expert Edu'
        },
        {
            item1: 'Alight Group',
            item2: 'American Edu'
        },
        {
            item1: 'Espire Edu',
            item2: 'Emerald Edu'
        },
        {
            item1: 'ARETE Edu',
            item2: 'AE Global'
        },
        {
            item1: 'Alight Group',
            item2: 'AECC Global'
        },
        {
            item1: 'Espire Edu',
            item2: '3 Bees Visa'
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
                            renderInput={(params) => <TextField {...params} label="Institution"/>
                        }
                        />
                    </div>
                    <div className="second-auto">
                        <Autocomplete
                            disablePortal
                            id="auto-completion"
                            size="small"
                            className="select-comparison"
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
                                <Tab value="2" label="Service"/>
                                <Tab value="3" label="Accessibility"/>
                                <Tab value="4" label="Rating"/>
                                <Tab value="5" label="Overall"/>
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
                                            id: 'serviceCategory',
                                            data: label,
                                            scaleType: 'band',
                                            label: 'Service Points'
                                        }
                                    ]}
                                    series={[
                                        {
                                            data: serviceArray
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
                        <TabPanel value="4">
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
                        <TabPanel value="5">
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
                                                Service score: {item.service !== null ? Math.ceil(item.service) : 0}
                                            </div>
                                            <div className="des-comp">
                                                Total points: {item.service + item.access + item.experience + item.review}
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
                                                    item.institution.universities !== "" || item.institution.universities > 10 ?
                                                    (
                                                        <li>There are {item.institution.universities} universities connected. </li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.experience !== "" || item.institution.experience > 6 ?
                                                    (
                                                        <li>It has the experience of {item.institution.experience} years.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.countries.length > 2 ? 
                                                    (
                                                        <li>It has several number of countries that it is serving </li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.specialization.length > 0 ?
                                                    (
                                                        <li>It specializes in countries like {item.institution.specialization[0]}.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.success !== "" || item.institution.success > 75 ?
                                                    (
                                                        <li>It has the graduates numbering to {item.institution.success}.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.platform === "Global" ? 
                                                    (
                                                        <li>It has global offices aviable in different countries.</li>
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
                                                    item.institution.universities === "" || item.institution.universities < 10 ?
                                                    (
                                                        <li>There are less than 10 universities connected. </li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.experience === "" || item.institution.experience < 6 ?
                                                    (
                                                        <li>It has the experience of less than 5 years.</li>
                                                    ) : null
                                                } 
                                                {
                                                    item.institution.countries.length < 3 ? 
                                                    (
                                                        <li>It has small number countries that it is serving </li>
                                                    ) : null
                                                }
                                                {
                                                    !item.institution.specialization.length > 0 ?
                                                    (
                                                        <li>It has no country that it specializes in.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.success === "" || item.institution.success < 75 ?
                                                    (
                                                        <li>It has the graduates numbering to less than 75.</li>
                                                    ) : null
                                                }
                                                {
                                                    item.institution.platform !== "Global" ? 
                                                    (
                                                        <li>It operates locally only.</li>
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
import { useGetComparisonsQuery } from "../../app/api/comparisonSlice"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Link } from "react-router-dom";

import MessageProp from "../../components/utilities/MessageProp";

//

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

    return(
        <div>
            <MessageProp 
                stateValue={messagePop}
                destroy={destroyPopMessage}
                messageType={display.severity}
                message={display.message}
            />
            <div>
                <Autocomplete
                    disablePortal
                    id="auto-completion"
                    className="select-comparison"
                    options={institutionsName}
                    value={selectedInstitution[1] || null}
                    onChange={(event, newVal) => handleInsititutionSelection (event, newVal, 1)}
                    renderInput={(params) => <TextField {...params} label="Institution"/>}
                />
            </div>
            <div>
                <Autocomplete
                    disablePortal
                    id="auto-completion"
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
                    <div key={index}>
                        <Autocomplete
                            disablePortal
                            id="auto-completion"
                            className="select-comparison"
                            options={institutionsName}
                            value={selectedInstitution[index + 3] || null}
                            onChange={(event, newVal) => handleInsititutionSelection (event, newVal, index + 3)}
                            renderInput={(params) => <TextField {...params} label="Institution"/>}
                        />
                    </div>
                ))
            }
            <button onClick={addComparison}>Add+</button>
            <button onClick={handleClickCompare}>Compare</button>
            
            <div>
                {
                    scoreObject &&
                <Box>
                    <TabContext value={tabValue}>
                        <Box sx={{borderBottom:1, borderColor:"divider"}}>
                            <TabList onChange={tabSwappingHandler}>
                                <Tab value="1" label="Experience"/>
                                <Tab value="2" label="Service"/>
                                <Tab value="3" label="Accessibility"/>
                                <Tab value="4" label="Rating"/>
                                <Tab value="5" label="Overall"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'barCategories',
                                        data: label,
                                        scaleType: 'band',
                                    }
                                ]}
                                series={[
                                    {
                                        data: experienceArray
                                    }
                                ]}
                                height={400}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'serviceCategory',
                                        data: label,
                                        scaleType: 'band',
                                    }
                                ]}
                                series={[
                                    {
                                        data: serviceArray
                                    }
                                ]}
                                height={400}
                            />
                        </TabPanel> 
                        <TabPanel value="3">
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'accessCategory',
                                        data: label,
                                        scaleType: 'band',
                                    }
                                ]}
                                series={[
                                    {
                                        data: accessArray
                                    }
                                ]}
                                height={400}
                            />
                        </TabPanel>
                        <TabPanel value="4">
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'ratingCategories',
                                        data: label,
                                        scaleType: 'band',
                                    }
                                ]}
                                series={[
                                    {
                                        data: ratingArray
                                    }
                                ]}
                                height={400}
                            />
                        </TabPanel>
                        <TabPanel value="5">
                            <BarChart
                                xAxis={[
                                    {
                                        id: 'totalCategory',
                                        data: label,
                                        scaleType: 'band',
                                    }
                                ]}
                                series={[
                                    {
                                        data: totalArray
                                    }
                                ]}
                                height={400}
                            />
                        </TabPanel> 
                    </TabContext>
                </Box>
                }
            </div>
            {
                
                scoreObject &&
                <div className="comparable-item-box">
                    {
                        scoreObject.map((item,index) => {
                            const imagesDirectory = `/images/${item.institution.name.replace(/ /g, "_")}`;
                            return(
                                <div className="comparable-items" key={index}>
                                    <div>
                                        <img src={`${imagesDirectory}.jpg`} className="comaparable-img"></img>
                                    </div>
                                    <div className="totalPoints">
                                        <div>
                                            Total point: {item.service + item.access + item.experience}
                                        </div>
                                        <div>
                                            Service score: {item.service !== null ? item.service : 0}
                                        </div>
                                        <div>
                                            Experience score: {item.experience  !== null ? item.experience : 0}
                                        </div>
                                        <div>
                                            Accesibility score: {item.access  !== null ? item.access : 0}
                                        </div>
                                        <div>
                                            Rating score: {item.review}
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
                                        <div>
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
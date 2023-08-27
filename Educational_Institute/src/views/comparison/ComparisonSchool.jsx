import { useGetComparisonSchoolQuery } from "../../app/api/comparisonSlice"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Link } from "react-router-dom";

//Tabs
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//Barchart
import { Bar } from 'react-chartjs-2'
import { BarChart} from '@mui/x-charts'


export default function ComparisonSchool() {

    const [selectedInstitution, setSelectedInstitution] = useState({});
    const {
        data: institutionData,
    } = useGetComparisonSchoolQuery(selectedInstitution)


    const {scoreObject} = institutionData ? institutionData : []
    console.log(scoreObject)

    let experienceArray = [];
    let accessArray = [];
    let totalArray = [];
    let label = [];

    if(scoreObject){
        scoreObject.forEach((item,index) => {

            const experiencePoint = item.experience !== null ? item.experience : 10;
            const accesPoint = item.access !== null ? item.access : 10;
            experienceArray.push(experiencePoint)
            accessArray.push(accesPoint)
            totalArray.push(experiencePoint + accesPoint)
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

    const addComparison = () => {
        setCount((prevVal) => {
            return prevVal + 1
        })
    }

    //Tab section
    const [tabValue, setTabValue] = useState("1")
    const tabSwappingHandler = (event, newVal) => {
        setTabValue(newVal)
    }

    const compareInstitution = () => {

    }

    console.log(scoreObject);

    return(
        <div>
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
            <button>Minus -</button>
            
            <div>
                {
                    scoreObject &&
                <Box>
                    <TabContext value={tabValue}>
                        <Box sx={{borderBottom:1, borderColor:"divider"}}>
                            <TabList onChange={tabSwappingHandler}>
                                <Tab value="1" label="Experience"/>
                                <Tab value="2" label="Accessibility"/>
                                <Tab value="3" label="Overall"/>
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
                        <TabPanel value="3">
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
                                            Total point: {item.access + item.experience}
                                        </div>
                                        <div>
                                            Experience score: {item.experience  !== null ? item.experience : 0}
                                        </div>
                                        <div>
                                            Accesibility score: {item.access  !== null ? item.access : 0}
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
                                        <div>
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
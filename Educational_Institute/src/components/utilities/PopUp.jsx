import { Dialog, Button, AppBar, Select, MenuItem} from "@mui/material";
import React, { useState } from "react";

export default function PopUp(props) {

    const {
        openStatus,
        popUpMenuOpenHandle,
        popUpMenuCloseHandle,
        setPopUpMenuOptions,
        popUpMenuOptions,
        applyDelay,
        applyClear,
    } = props;

    const [formValue, setFormValue] = useState([])

    const setUpdatedValues = (event) => {
        const {value,name} = event.target;
        setPopUpMenuOptions(name, value)
    }

    return (
        <div>
        <Dialog 
            onClose={popUpMenuCloseHandle} 
            open={openStatus} 
            fullScreen
        >
            <div className="main-pop-con">
                <div className="pop-menu-items">
                    <div className="pop-menu-openeing-time">
                        <label>Opening Time:</label>
                        <input 
                            type="time" 
                            name="opening-time"
                            value={popUpMenuOptions['opening-time']}
                            onChange={setUpdatedValues}
                        />
                    </div>
                    <div className="pop-menu-closing-time">
                        <label>Closing Time:</label>
                        <input 
                            type="time" 
                            name="closing-time"
                            value={popUpMenuOptions['closing-time']}
                            onChange={setUpdatedValues}
                        />
                    </div>
                    <div className="pop-menu-online">
                        <label>Online:</label>
                        <select 
                            name="online-service" 
                            className="pop-menu-online-service"
                            onChange={setUpdatedValues}
                            value={popUpMenuOptions['online-service']}
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div className="pop-menu-opening-days">
                        <label>Opening Days:</label>
                        <Select 
                            multiple 
                            value={popUpMenuOptions['opening-days']} 
                            name="opening-days" onChange={setUpdatedValues} 
                            className="pop-menu-days-options"
                            style={{fontSize: '12px'}}
                        >
                            <MenuItem value="none" style={{fontSize: '12px'}}>--None--</MenuItem>
                            <MenuItem value="Sunday" style={{fontSize: '12px'}}>Sunday</MenuItem>
                            <MenuItem value="Monday" style={{fontSize: '12px'}}>Monday</MenuItem>
                            <MenuItem value="Tuesday" style={{fontSize: '12px'}}>Tuesday</MenuItem>
                            <MenuItem value="Wednesday" style={{fontSize: '12px'}}>Wednesday</MenuItem>
                            <MenuItem value="Thursday" style={{fontSize: '12px'}}>Thursday</MenuItem>
                            <MenuItem value="Friday" style={{fontSize: '12px'}}>Friday</MenuItem>
                            <MenuItem value="Saturday" style={{fontSize: '12px'}}>Saturday</MenuItem>
                        </Select>
                    </div>
                    <div className="pop-menu-platform">
                        <label>Platform:</label>
                        <select 
                            name="platform"
                            className="pop-menu-platform"
                            onChange={setUpdatedValues}
                            value={popUpMenuOptions['platform']}
                        >
                            <option value="Global">Global</option>
                            <option value="Local">Local</option>
                        </select>
                    </div>
                    <div className="pop-menu-distance">
                        <label>Distance:</label>
                        <select 
                            name="distance"
                            className="pop-menu-distance"
                            onChange={setUpdatedValues}
                            value={popUpMenuOptions['distance']}
                        >
                            <option value="Near">Near</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Distant">Distant</option>
                        </select>
                    </div>
                    <div className="pop-menu-range-success">
                        <label>Success:</label>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['success-start']} 
                            name="success-start"
                            onChange={setUpdatedValues}/>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['success-end']} 
                            name="success-end"
                            onChange={setUpdatedValues}/>
                    </div>
                    <div className="pop-menu-range-exp">
                        <label>Experience:</label>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['experience-start']} 
                            name="experience-start"
                            onChange={setUpdatedValues}/>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['experience-end']} 
                            name="experience-end"
                            onChange={setUpdatedValues}/>
                    </div>
                    <div className="pop-menu-range-uni">
                        <label>University:</label>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['university-start']} 
                            name="university-start"
                            onChange={setUpdatedValues}/>
                        <input 
                            type="number" 
                            value={popUpMenuOptions['university-end']} 
                            name="university-end" 
                            onChange={setUpdatedValues}/>
                    </div>
                </div>
                <div className="pop-menu-div">
                        <button onClick={popUpMenuCloseHandle} className="close-pop-menu">
                            Close
                        </button>
                        <button onClick={applyDelay} className="apply-pop-menu">
                            Apply
                        </button>
                        <button onClick={applyClear} className="apply-pop-clear">
                            Clear
                        </button>
                </div>
            </div>
        </Dialog>
      </div>
    );
}
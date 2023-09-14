import { Dialog, Button, AppBar, Select, MenuItem, TextField} from "@mui/material";
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
                        <TextField 
                            type="time" 
                            name="opening-time"
                            value={popUpMenuOptions['opening-time']}
                            onChange={setUpdatedValues}
                            label="Opening time"
                            fullWidth
                            size="small"
                        />
                    </div>
                    <div className="pop-menu-closing-time">
                        <TextField 
                            type="time" 
                            name="closing-time"
                            value={popUpMenuOptions['closing-time']}
                            onChange={setUpdatedValues}
                            label="Closing time"
                            fullWidth
                            size="small"
                        />
                    </div>
                    <div className="rating-pop-up-menu">
                        <div>
                            <label>Online:</label>
                        </div>
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
                        <label className="dasd">Opening Days:</label>
                        <Select 
                            multiple 
                            value={popUpMenuOptions['opening-days']} 
                            name="opening-days" onChange={setUpdatedValues} 
                            className="pop-menu-days-options"
                            style={{fontSize: '12px', padding: '10px'}}
                            size="small"
                            fullWidth
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
                    <div className="rating-pop-up-menu">
                        <div>
                            <label>Platform:</label>
                        </div>
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
                    <div className="rating-pop-up-menu">
                        <div>
                            <label>Distance:</label>
                        </div>
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
                        <div className="expp">
                            <label>Success:</label>
                        </div>
                        <div className="nump">
                            <div>
                                <input 
                                type="number" 
                                value={popUpMenuOptions['success-start']} 
                                name="success-start"
                                onChange={setUpdatedValues}/>
                            </div>
                            <div>
                                <input 
                                type="number" 
                                value={popUpMenuOptions['success-end']} 
                                name="success-end"
                                onChange={setUpdatedValues}/>
                            </div>
                        </div>                        
                    </div>
                    <div className="pop-menu-range-exp">
                        <div className="expp">
                            <label>Experience:</label>
                        </div>
                        <div className="nump">
                            <div>
                                <input 
                                    type="number" 
                                    value={popUpMenuOptions['experience-start']} 
                                    name="experience-start"
                                    onChange={setUpdatedValues}/>
                            </div>
                            <div>
                                <input 
                                type="number" 
                                value={popUpMenuOptions['experience-end']} 
                                name="experience-end"
                                onChange={setUpdatedValues}/>
                            </div>
                        </div>
                    </div>
                    <div className="pop-menu-range-uni">
                        <div className="expp">
                            <label>University:</label>
                        </div>
                        <div className="nump">
                            <div>
                                <input 
                                type="number" 
                                value={popUpMenuOptions['university-start']} 
                                name="university-start"
                                onChange={setUpdatedValues}/>
                            </div>
                            <div>
                                <input 
                                    type="number" 
                                    value={popUpMenuOptions['university-end']} 
                                    name="university-end" 
                                    onChange={setUpdatedValues}/>
                            </div>
                        </div>
                    </div>
                    <div className="rating-pop-up-menu">
                        <div>
                            <label>Rating:</label>
                        </div>
                        <select 
                            name="rating"
                            className="pop-menu-rating"
                            onChange={setUpdatedValues}
                            value={popUpMenuOptions['rating']}
                        >
                            <option value="Near">High</option>
                            <option value="Moderate">Low</option>
                            <option value="Distant">Medium</option>
                        </select>
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
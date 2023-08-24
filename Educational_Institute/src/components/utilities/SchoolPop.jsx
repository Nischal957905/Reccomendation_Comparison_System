import { Dialog, Button, AppBar, Select, MenuItem} from "@mui/material";
import React, { useState } from "react";

export default function SchoolPop(props) {

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
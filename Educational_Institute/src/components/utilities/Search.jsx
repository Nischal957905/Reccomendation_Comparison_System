import { BiSearchAlt,BiSolidSortAlt } from 'react-icons/Bi'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const customStyles = {
    maxHeight: '20px', // Adjust this value as needed
};

export default function Search({iterable,category}){

    const [insitution, setInstitution] = useState()
    const navigate = useNavigate()

    const handleInsititutionSelection = (event, newVal) => {
        setInstitution(newVal)
    }

    const handleSearch = ()=>{
        if(insitution && insitution !== ''){
            navigate(`/${category}/${insitution}`)
        }
    }

    // const searchDiv = (
    //     <div className="search-holder">
    //         <div className="search-bar">
    //             <BiSearchAlt className="search-icon"/>
    //             <p>Search</p>
    //         </div>
    //     </div>
    // )

    return (
        <div className='searchable'>
            <Autocomplete
                disablePortal
                id="search-completion"
                className="search-bars"
                options={iterable}
                value={insitution}
                onChange={(event, newVal) => handleInsititutionSelection (event, newVal)}
                renderInput={(params) => <div className='dsa'>
                        <TextField {...params} label="Institution" className='search-text'
                        size='small'
                        />
                </div>}
            />
            <div className='search-btn-st'>
                Search
                <BiSearchAlt className="search-query" onClick={handleSearch}/>
            </div>
        </div>
    )

}
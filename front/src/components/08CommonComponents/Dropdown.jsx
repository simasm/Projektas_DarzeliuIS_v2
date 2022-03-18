import React, { useState } from 'react';
import './Dropdown.css';
import './../../App.css'
import { useHistory } from "react-router-dom";


function Dropdown() {
    let history = useHistory();
    const [isActive, setIsActive] = useState(false);


    const options = [
        {
            regType: 'Prašymas dėl registracijos į darželį',
            path: '/prasymai/registracija'
        },

        {
            regType: 'Prašymas dėl kompensacijos',
            path: '/prasymai/kompensacija'
        },

    ];


    const handleSetActive = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    }

    return (

        <div className='dropdown container'
            onMouseLeave={() => setIsActive(false)}>

            <div className="nav-link dropdown-toggle btnnoselect"
                id="navUserNewApplication"

                onClick={handleSetActive}>
                Sukurti prašymą

            </div>
            {isActive && (
                <div className="dropdown-content"
                >

                    {options.map(option => (
                        <div key={option.regType} onClick={() => {
                            setIsActive(false);
                            history.push(option.path)

                        }}
                            className="dropdown-item">
                            {option.regType}

                        </div>
                    ))}


                </div>
            )}




        </div>
    )
}


export default Dropdown;
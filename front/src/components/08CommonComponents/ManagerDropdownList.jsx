import React, { useState } from 'react';
import './Dropdown.css';
import './../../App.css'
import { useHistory } from "react-router-dom";

function ManagerDropdownList() {
    let history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const options = [
        {
            regType: 'Registracijų eilė',
            path: '/eile'
        },
        {
            regType: 'Registracijų statistika',
            path: '/statistika'
        },
        {
            regType: 'Kompensacijos',
            path: '/kompensacijos'
        }

    ];

    const handleSetActive = (e) => {
        e.preventDefault();
        setIsActive(!isActive);
    }

    return (

        <div className='dropdown container'
            onMouseLeave={() => setIsActive(false)}>

            <div className="nav-link dropdown-btn btnnoselect"
                id="navUserNewApplication"
                onClick={handleSetActive}>
                Prašymai
            </div>
            {isActive && (
                <div className="dropdown-content">
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
export default ManagerDropdownList;
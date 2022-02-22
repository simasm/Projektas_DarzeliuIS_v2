import React, { useState } from 'react';
import './Dropdown.css';
import './../../App.css'
import { useHistory } from "react-router-dom";

function ManagerDropdownList() {
    let history = useHistory();
    const [isActive, setIsActive] = useState(false);

    const options = [
        {
            id: 'drop-one',
            regType: 'Registracijų eilė',
            path: '/eile'
        },
        {
            id: 'drop-two',
            regType: 'Registracijų statistika',
            path: '/statistika'
        },
        {
            id: 'drop-three',
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
                id="navManagerRequests"
                onClick={handleSetActive}>
                Prašymai
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <div id={option.id} key={option.regType} onClick={() => {
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
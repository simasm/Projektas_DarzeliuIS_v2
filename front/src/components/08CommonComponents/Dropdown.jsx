import React, { useState } from 'react';
import './Dropdown.css';
import './../../App.css'
import { useHistory } from "react-router-dom";


 function Dropdown() {
    let history = useHistory();
    const [isActive, setIsActive] = useState(false);
    

    const options = [
        {regType: 'Prašymas dėl registracijos į darželį',
         path: '/prasymai/registracija'}, 

         {regType: 'Prašymas dėl kompensacijos',
         path: '/prasymai/kompensacija'},
         
         ];


        const handleSetActive = () => {
             setIsActive(!isActive);
         }

  return(

    <div className='dropdown container' 
    onMouseLeave={handleSetActive}>

        <div className="nav-link dropdown-btn"
         id="navUserNewApplication" 
         
         onClick={handleSetActive}>
            Sukurti prašyma
            
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
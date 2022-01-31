import React, { useState } from 'react';
import './Dropdown.css';
import './../../App.css'
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";


 function Dropdown() {
    let history = useHistory();
    const [isActive, setIsActive] = useState(false);
    

    const options = [
        {regType: 'Registracija',
         path: '/prasymai/naujas'}, 

         {regType: 'Kompensacija',
         path: '/prasymai/kompensacija'},

         {regType: 'test',
         path: '/prasymai/test'},
         
         ];


  return(

    <div className='dropdown container'>

        <div className="nav-link dropdown-btn"
         id="navUserNewApplication" 
         
         onClick={(e) => setIsActive(!isActive)}>
            Sukurti prasyma
            
        <span className='fas fa-caret-down'></span>
        </div>
        {isActive && (
            <div className="dropdown-content"
            onMouseLeave={(e) => setIsActive(!isActive)}>
                {options.map(option => (
                         <div onClick={() => {
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
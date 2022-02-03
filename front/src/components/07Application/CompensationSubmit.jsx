import React, { useEffect } from 'react';

export default function CompensationSubmit({onClick, compensationApplication, kindergartenDTO, childDTO, guardianDTO}) {
  const keys1 = Object.keys(childDTO)
  const keys2 = Object.keys(kindergartenDTO)
  const keys3 = Object.keys(guardianDTO)
  
 


  useEffect(() => {

    let btnSubmit = document.getElementById('btnSubmit');

    function checkIfAnyEmpty() {

    
       const emptyExists1 = keys1.map(k => childDTO[k]).some(val => val === '');
       const emptyExists2 = keys2.map(k => kindergartenDTO[k]).some(val => val === '');
       const emptyExists3 = keys3.map(k => guardianDTO[k]).some(val => val === '');
      
       const emptyExists = (emptyExists1 || emptyExists2 || emptyExists3);
      

        
      return emptyExists;

    }


    if (checkIfAnyEmpty() === true){
      btnSubmit.disabled = true
    } else {
      btnSubmit.disabled = false
    }


  }, [compensationApplication])



  const handleSubmit = () => {

    
    keys1.filter(k =>  compensationApplication.kindergartenInfo[k] === '')
      .forEach(m => console.log(m, "EMPTY"))

      



      
      
    

  }
  
  return (

    


<div className='container'>

<button id="btnSubmit" disabled='disabled' className='btn btn-primary mt-2' onClick={() => handleSubmit()}>submit</button>

</div>

  ) 


}

import React from 'react';

export default function CompensationSubmit({onClick, compensationApplication}) {
  const keys1 = Object.keys(compensationApplication.kindergartenInfo)
  


  const handleSubmit = () => {

    
      

    keys1.filter(k =>  compensationApplication.kindergartenInfo[k] === '')
      .forEach(m => console.log(m, "EMPTY"))

      console.log(compensationApplication, "APPLICATION")
      
    
   
      
    
  

    

  }
  
  return (

    


<div className='container'>

<button className='btn btn-primary mt-2' onClick={() => handleSubmit()}>submit</button>

</div>

  ) 


}

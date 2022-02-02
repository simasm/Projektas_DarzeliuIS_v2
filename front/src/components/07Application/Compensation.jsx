
import React, { useEffect, useState } from 'react';
import ChildInfoForm from './ChildInfoForm';
import CompensationSubmit from './CompensationSubmit';
import KindergartenInfoForm from './KindergartenInfoForm';

export default function Compensation() {
    const [childDTO, setChildDTO] = useState({personalID: '', name: '', surname: '', dateOfBirth: '' });
    const [idLength, setIdLength] = useState(0);

    const compensationApplication = {
      personalID: childDTO.personalID,
      name: childDTO.name,
      surname: childDTO.surname,
      dateOfBirth: childDTO.dateOfBirth
    }

    const [kindergartenData, setKindergartenData] = useState();
    const [guardianData, setGuardianData] = useState();

    useEffect(() => {

      

      if(idLength !== 11){
        setChildDTO(
          {
          personalID: '',
          name: '',
          surname: '',
          dateOfBirth: ''
        })
      }
    
      


    }, [idLength])

   
   const handleSubmit = () => {
           
            console.log(compensationApplication)
    }




  return (
    
    <div className='container'>
      <div>{childDTO.personalID}</div>

        <div className="row">
            <div className="col-4">
            <ChildInfoForm setChildDTO = {setChildDTO} childDTO = {childDTO} setIdLength={setIdLength}/>
            

            </div>
            <div className="col-4">
            <KindergartenInfoForm />

            </div>

            <div className="col-4">
            <ChildInfoForm />

            </div>

         </div>
            
            <div className="container">
                
                <CompensationSubmit onClick={handleSubmit}/>
            </div>
            
     </div>
        
        
        
        

        
        

    



  )
}

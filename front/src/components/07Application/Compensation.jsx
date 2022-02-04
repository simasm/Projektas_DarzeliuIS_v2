
import React, { useEffect, useState } from 'react';
import ChildInfoForm from './ChildInfoForm';
import CompensationSubmit from './CompensationSubmit';
import GuardianForm from './GuardianForm';
import KindergartenInfoForm from './KindergartenInfoForm';

export default function Compensation() {
  const [idLength, setIdLength] = useState(0);  

  const [childDTO, setChildDTO] = useState({personalID: '', name: '', surname: '', dateOfBirth: '' });

  const [kindergartenDTO, setKindergartenDTO] = useState({name: '', code: '', address: '', phone: '', email: '', bankName: '', accountNumber: '', bankCode: ''  });

  const [guardianDTO, setGuardianDTO] = useState({name: '', surname: '', personalCode: '', phone: '', email: '', address: ''})



  const keys1 = Object.keys(childDTO)
  const keys2 = Object.keys(kindergartenDTO)
  const keys3 = Object.keys(guardianDTO)

    const compensationApplication = {
      childInfo:  {
        personalID: childDTO.personalID,
        name: childDTO.name,
        surname: childDTO.surname,
        dateOfBirth: childDTO.dateOfBirth
      },
      
      kindergartenInfo: {
        name: kindergartenDTO.name,
        code: kindergartenDTO.code,
        address: kindergartenDTO.address,
        phone: kindergartenDTO.phone,
        email: kindergartenDTO.email,
        bankName: kindergartenDTO.bankName,
        accountNumber: kindergartenDTO.accountNumber,
        bankCode: kindergartenDTO.bankCode
      },

      guardianInfo: {
        name: guardianDTO.name,
        surname: guardianDTO.surname,
        personalCode: guardianDTO.personalCode,
        phone: guardianDTO.phone,
        email: guardianDTO.name,
        address: guardianDTO.address
      }
      

    }

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
           
            console.log('submitted')
    }




  return (
    
    <div className='container' > 
      <div>{childDTO.personalID}</div>
      <div>{kindergartenDTO.address}</div>

        <div className="row">
            <div className="col-4">
            <ChildInfoForm setChildDTO = {setChildDTO} childDTO = {childDTO} setIdLength = {setIdLength}/>
            

            </div>
            <div className="col-4">
            <KindergartenInfoForm setKindergartenDTO = {setKindergartenDTO}/>

            </div>

            <div className="col-4">
            <GuardianForm setGuardianDTO = {setGuardianDTO}/>

            </div>

         </div>
            
            <div className="container">
                            
                
                <button className='btn btn-primary' id='btnSubmit' onClick={() => handleSubmit()}>submit</button>
            </div>
            
     </div>
        
        
        
        

        
        

    



  )
}

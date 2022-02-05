
import React, { useEffect, useState } from 'react';
import ChildInfoForm from './ChildInfoForm';
import GuardianForm from './GuardianForm';
import KindergartenInfoForm from './KindergartenInfoForm';



export default function Compensation() {
 
  const [idLength, setIdLength] = useState(0);  

  const [childDTO, setChildDTO] = useState({personalID: '', name: '', surname: '', dateOfBirth: '' });

  const [kindergartenData, setKindergartenData] = useState({name: '', code: '', address: '', phone: '', email: '', bankName: '', accountNumber: '', bankCode: ''  });

  const [guardianData, setGuardianData] = useState({name: '', surname: '', personalCode: '', phone: '', email: '', address: ''})

  


  const keys1 = Object.keys(childDTO)
  const keys2 = Object.keys(kindergartenData)
  const keys3 = Object.keys(guardianData)

    const compensationApplication = {
      childInfo:  {
        personalID: childDTO.personalID,
        name: childDTO.name,
        surname: childDTO.surname,
        dateOfBirth: childDTO.dateOfBirth
      },
      
      kindergartenInfo: {
        name: kindergartenData.name,
        code: kindergartenData.code,
        address: kindergartenData.address,
        phone: kindergartenData.phone,
        email: kindergartenData.email,
        bankName: kindergartenData.bankName,
        accountNumber: kindergartenData.accountNumber,
        bankCode: kindergartenData.bankCode
      },

      guardianInfo: {
        name: guardianData.name,
        surname: guardianData.surname,
        personalCode: guardianData.personalCode,
        phone: guardianData.phone,
        email: guardianData.email,
        address: guardianData.address
      }
      

    }

    

    useEffect(() => {

        const txtKindergartenNameWarning = document.getElementById('txtKindergartenNameWarning')
        const txtKindergartenCodeWarning = document.getElementById('txtKindergartenCodeWarning')
        const txtKindergartenAddressWarning = document.getElementById('txtKindergartenAddressWarning')
        const txtKindergartenPhoneWarning = document.getElementById('txtKindergartenPhoneWarning')
        const txtKindergartenEmailWarning = document.getElementById('txtKindergartenEmailWarning')
        const txtKindergartenBankNameWarning = document.getElementById('txtKindergartenBankNameWarning')
        const txtKindergartenAccountNumberWarning = document.getElementById('txtKindergartenAccountNumberWarning')
        const txtKindergartenBankCodeWarning = document.getElementById('txtKindergartenBankCodeWarning')

        const txtGuardianNameWarning = document.getElementById('txtGuardianNameWarning')
        const txtGuardianSurnameWarning = document.getElementById('txtGuardianSurnameWarning')
        const txtGuardianIdWarning = document.getElementById('txtGuardianIdWarning')
        const txtGuardianPhoneWarning = document.getElementById('txtGuardianPhoneWarning')
        const txtGuardianEmailWarning = document.getElementById('txtGuardianEmailWarning')
        const txtGuardianAddressWarning = document.getElementById('txtGuardianAddressWarning')
      
        const btnSubmit = document.getElementById('btnSubmit');

      function checkIfAnyEmpty() {
      
         const emptyExists1 = keys1.map(k => childDTO[k]).some(val => val === '');
         const emptyExists2 = keys2.map(k => kindergartenData[k]).some(val => val === '');
         const emptyExists3 = keys3.map(k => guardianData[k]).some(val => val === '');
        
        const emptyExists = (emptyExists1 || emptyExists2 || emptyExists3);
        
        return emptyExists;
  
      }

 

      function checkIfAnyIncorrect() {

        const incorrectExists = (
        txtKindergartenNameWarning.textContent !== '' || 
        txtKindergartenCodeWarning.textContent !== '' || 
        txtKindergartenAddressWarning.textContent !== '' || 
        txtKindergartenPhoneWarning.textContent !== '' || 
        txtKindergartenEmailWarning.textContent !== '' || 
        txtKindergartenBankNameWarning.textContent !== '' || 
        txtKindergartenAccountNumberWarning.textContent !== '' ||
        txtKindergartenBankCodeWarning.textContent !== '' || 

        txtGuardianNameWarning.textContent !== '' ||
        txtGuardianSurnameWarning.textContent !== '' ||
        txtGuardianIdWarning.textContent !== '' ||
        txtGuardianPhoneWarning.textContent !== '' ||
        txtGuardianEmailWarning.textContent !== '' ||
        txtGuardianAddressWarning.textContent !== '' 


        )
        
        return incorrectExists;
      }
      
      console.log('EMPTY?????', checkIfAnyEmpty())
      console.log(compensationApplication.guardianInfo)
      console.log('INCORRECT????', checkIfAnyIncorrect())

    
      if (checkIfAnyIncorrect() || checkIfAnyEmpty()){
        btnSubmit.disabled = true;
      } else {
        btnSubmit.disabled = false;
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
            console.log(compensationApplication)
    }




  return (
    
    <div className='container' > 
      

        <div className="row">
            <div className="col-4">
            <ChildInfoForm setChildDTO = {setChildDTO} childDTO = {childDTO} setIdLength = {setIdLength}/>
            

            </div>
            <div className="col-4">
            <GuardianForm guardianData={guardianData} setGuardianData={setGuardianData} />

            </div>

            <div className="col-4">
            
            <KindergartenInfoForm kindergartenData={kindergartenData} setKindergartenData = {setKindergartenData} />

            </div>

         </div>
            
            <div className="container">
              
                            
                
                <button className='btn btn-primary' id='btnSubmit' onClick={() => handleSubmit()}>submit</button>
            </div>
            
     </div>
        
        
        
        

        
        

    



  )
}

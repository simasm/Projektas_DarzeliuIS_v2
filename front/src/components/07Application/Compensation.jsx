
import React, { useEffect, useState } from 'react';
import ChildInfoForm from './ChildInfoForm';
import CompensationSubmit from './CompensationSubmit';
import KindergartenInfoForm from './KindergartenInfoForm';

export default function Compensation() {
    const [childDTO, setChildDTO] = useState({personalID: '', name: '', surname: '', dateOfBirth: '' });
    const [idLength, setIdLength] = useState(0);

    const [kindergartenDTO, setKindergartenDTO] = useState({name: '', code: '', address: '', phone: '', email: '', bankName: '', accountNumber: '', bankCode: ''  });

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
      }
      

    }

  

    useEffect(() => {

      setKindergartenDTO({name: '', code: '', address: '', phone: '', email: '', bankName: '', accountNumber: '', bankCode: ''  })

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
      <div>{kindergartenDTO.address}</div>

        <div className="row">
            <div className="col-4">
            <ChildInfoForm setChildDTO = {setChildDTO} childDTO = {childDTO} setIdLength = {setIdLength}/>
            

            </div>
            <div className="col-4">
            <KindergartenInfoForm setKindergartenDTO = {setKindergartenDTO}/>

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

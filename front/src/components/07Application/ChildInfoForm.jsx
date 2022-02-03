import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import apiEndpoint from '../10Services/endpoint';
import swal from 'sweetalert';

export default function ChildInfoForm({setChildDTO, setIdLength}) {

// /api/registru-centras/51609260036
// 51609260036

const [childId, setChildId] = useState('')
const [childData, setChildData] = useState({name: '', surname: '', dateOfBirth: ''});
const [warningText, setWarningText] = useState('');





useEffect(() => {
  const warningmsg = document.getElementById('warningmsg')
  

  async function load(){
    
    
  try {
    const childDataResponse = await axios.get(apiEndpoint + `/api/registru-centras/51609260035`)
    setChildData(childDataResponse.data)
    setChildDTO(childDataResponse.data)
  } catch (error){
    if (error.response.status === 400){
     warningmsg.textContent = (`Toks asmens kodas registrų centre neegzistuoja.`)
    }
  }
  
    
  
  
}

if (childId.length !== 11) {
  setChildData({name: '', surname: '', dateOfBirth: ''})
  warningmsg.textContent = ''
  
} else {
  load()
  
}

}, [childId])







  return (
        <div className="container">
            
      <div className="form">
        <div className="pb-1">
          <h6 className="formHeader">Vaiko duomenys</h6>
        </div>
        <div className="form-group">
          <label htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCode"
            name="childPersonalCode"
            className="form-control"
            onChange={(e) => (setChildId(e.target.value), setIdLength(e.target.value.length))}
            maxLength={11}
            required
            pattern="[0-9]{11}"
            
          />
          <span id='warningmsg'></span>
        </div>

        <div className="form-group">
          <label htmlFor="txtName">
            Vaiko vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildName"
            name="childName"
            className="form-control"
            
            disabled
            pattern="[A-zÀ-ž]{2,32}"
            value={childData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="txtSurname">
            Vaiko pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildSurname"
            name="childSurname"
            className="form-control"
            value={childData.surname}
            disabled
            pattern="[A-zÀ-ž]{2,32}"
          />
        </div>
        
        {/** Gimimo data */}
        <div className="form-group">
          <label htmlFor="txtBirthdate">
            Gimimo data <span className="fieldRequired">*</span>
          </label>
          <DatePicker
            className="form-control"
            locale="lt"
            dateFormat="yyyy/MM/dd"
            disabled
            value={childData.dateOfBirth}
            
          />
          
        </div>
            </div>
        
 </div>
 )
}

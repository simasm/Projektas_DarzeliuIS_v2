import React, { useEffect, useState } from 'react';
import inputValidator from "../08CommonComponents/InputValidator";

export default function GuardianForm({setGuardianDTO}) {

const [name, setName] = useState('');
const [surname, setSurname] = useState('');
const [personalCode, setPersonalCode] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');

// const validateText = (event) => {
//   const target = event.target;

//   if (target.validity.valueMissing && target.id === "txtGuardianName") {
//     target.setCustomValidity("Būtina įvesti naudotojo prisijungimo vardą");
//   } else if (target.validity.valueMissing && target.id === "password") {
//     target.setCustomValidity("Būtina įvesti slaptažodį");
//   } else {
//     target.setCustomValidity("");
//   }
// };



const guardianDTO = {name, surname, personalCode, phone, email, address}

useEffect(() => {
  setGuardianDTO(guardianDTO)


}, [guardianDTO.name, guardianDTO.surname, guardianDTO.personalCode, guardianDTO.phone, guardianDTO.email, guardianDTO.address])


  return ( 

    <div className="form">
              <div className="pb-1">
                <h6 className="formHeader">Vaiko atstovo duomenys</h6>
              </div>
              
              <div className="form-group">
                <label htmlFor="txtGuardianName">
                  Vardas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianName"
                  name="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianNameWarning'  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtGuardianSurname">
                  Pavardė <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianSurname"
                  name="guardianSurname"
                  className="form-control"
                  onChange={(e) => setSurname(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianSurnameWarning'  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtGuardianId">
                  Asmens kodas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianId"
                  name="guardianId"
                  className="form-control"
                  onChange={(e) => setPersonalCode(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianIdWarning'  className='warningmsg'></span>
              </div>

              <div className="form-group">
                <label htmlFor="txtGuardianPhone">
                  Telefono numeris <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianPhone"
                  name="guardianPhone"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianPhoneWarning'  className='warningmsg'></span>     
              </div>

              <div className="form-group">
                <label htmlFor="txtGuardianEmail">
                  El. paštas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianEmail"
                  name="guardianEmail"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianEmailWarning'  className='warningmsg'></span>     

              </div>

              <div className="form-group">
                <label htmlFor="txtGuardianAddress">
                  Adresas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtGuardianAddress"
                  name="guardianAddress"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"
                  required
                />
                <span id='txtGuardianAddressWarning'  className='warningmsg'></span>     

              </div>


    </div>


  ) ;
}

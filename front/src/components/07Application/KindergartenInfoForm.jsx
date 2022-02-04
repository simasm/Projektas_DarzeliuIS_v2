import React, { useEffect, useState } from 'react';
import inputValidator from "../08CommonComponents/InputValidator";


export default function KindergartenInfoForm({setKindergartenDTO}) {
  
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState('');

  const kindergartenDTO = {name, code, address, phone, email, bankName, accountNumber, bankCode}
  
  useEffect(() => {
    setKindergartenDTO(kindergartenDTO)


  }, [kindergartenDTO.name, kindergartenDTO.code, kindergartenDTO.address, kindergartenDTO.phone, kindergartenDTO.email, kindergartenDTO.bankName, kindergartenDTO.accountNumber, kindergartenDTO.bankCode])
  
    
  
  
  return(

<div className="container">
  
            
            <div className="form">
              <div className="pb-1">
                <h6 className="formHeader">Darzelio duomenys</h6>
              </div>
              <div className="form-group">
                <label htmlFor="txtKindergartenName">
                  Ugdymo istaigos pavadinimas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenName"
                  name="kindergartenName"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  required
                />
                <span id="txtKindergartenNameWarning" className='warningmsg'></span>
              
              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenCode">
                  Ugdymo istaigos kodas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenCode"
                  name="kindergartenCode"
                  className="form-control"
                  onChange={(e) => setCode(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  
                  required
                />
                <span id="txtKindergartenCodeWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenAddress">
                  Ugdymo istaigos adresas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenAddress"
                  name="kindergartenAddress"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  required
                />
                <span id="txtKindergartenAddressWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenPhone">
                  Kontaktinis telefono numeris <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenPhone"
                  name="kindergartenPhone"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  required
                />
                <span id="txtKindergartenPhoneWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenEmail">
                  El. pastas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenEmail"
                  name="kindergartenEmail"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  
                  required
                />
                <span id="txtKindergartenEmailWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenBankName">
                  Banko pavadinimas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenBankName"
                  name="kindergartenBankName"
                  className="form-control"
                  onChange={(e) => setBankName(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  
                  required
                />
                <span id="txtKindergartenBankNameWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenAccountNumber">
                  Saskaitos numeris <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenAccountNumber"
                  name="kindergartenAccountNumber"
                  className="form-control"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  onChange={(e) => inputValidator(e)}

                  
                  required
                />
                <span id="txtKindergartenAccountNumberWarning"  className='warningmsg'></span>

              </div>

              <div className="form-group">
                <label htmlFor="txtKindergartenBankCode">
                  Banko kodas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenBankCode"
                  name="kindergartenBankCode"
                  className="form-control"
                  onChange={(e) => setBankCode(e.target.value)}
                  onChange={(e) => inputValidator(e)}
                  pattern="[A-zÀ-ž]{2,32}"

                  
                  required
                />
                <span id="txtKindergartenBankCodeWarning"  className='warningmsg'></span>

              </div>

              

              </div>
</div>



  ) 
}

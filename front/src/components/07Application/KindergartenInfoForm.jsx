import React from 'react';

export default function KindergartenInfoForm() {
  return(

<div className="container">
            
            <div className="form">
              <div className="pb-1">
                <h6 className="formHeader">Darzelio duomenys</h6>
              </div>
              <div className="form-group">
                <label htmlFor="txtPersonalCode">
                  Pavadinimas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenName"
                  name="kindergartenName"
                  className="form-control"
                  
                  required
                />

              </div>

              <div className="form-group">
                <label htmlFor="txtPersonalCode">
                  Adresas <span className="fieldRequired">*</span>
                </label>
                <input
                  type="text"
                  id="txtKindergartenAddress"
                  name="kindergartenAddress"
                  className="form-control"
                  
                  required
                />

              </div>

              </div>
</div>



  ) 
}

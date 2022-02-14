import React, { useState } from "react";
import GuardianFormValidator from "../08CommonComponents/GuardianFormValidator";

export default function GuardianForm({
  guardianData,
  setGuardianData,
  guardianValid,
  setGuardianValid,
}) {
  const handleOnChange = (e) => {
    setGuardianData({
      ...guardianData,
      [e.target.name]: e.target.value,
    });

    GuardianFormValidator(
      e,
      setGuardianWarning,
      setGuardianValid,
      guardianWarning,
      guardianValid
    );
  };

  const [guardianWarning, setGuardianWarning] = useState({
    name: "",
    surname: "",
    personalCode: "",
    phone: "",
    email: "",
    address: "",
  });

  return (
    <div className="form">
      <div className="pb-1">
        <h6 className="formHeader">Vaiko atstovo duomenys</h6>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianNameCompensation">
          Vardas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianNameCompensation"
          name="name"
          //placeholder="Vardas"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.name
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={32}
          required
        />
        <span className="warningmsg">{guardianWarning.name}</span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianSurname">
          Pavardė <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianSurnameCompensation"
          name="surname"
        //  placeholder="Pavardė"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.surname
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={32}
          required
        />
        <span className="warningmsg">{guardianWarning.surname}</span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianId">
          Asmens kodas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianIdCompensation"
          name="personalCode"
         // placeholder="41234567890"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.personalCode
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={11}
          required
        />
        <span className="warningmsg">{guardianWarning.personalCode}</span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianPhone">
          Telefono numeris <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianPhoneCompensation"
          name="phone"
          placeholder="+370xxxxxxxx"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.phone
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={12}
          required
        />
        <span className="warningmsg">{guardianWarning.phone}</span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianEmail">
          El. paštas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianEmailCompensation"
          name="email"
        //  placeholder="example@mail.com"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.email
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={64}
          required
        />
        <span className="warningmsg">{guardianWarning.email}</span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianAddress">
          Adresas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianAddressCompensation"
          name="address"
        //  placeholder="Adresas"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          style={
            guardianValid.address
              ? { border: "1px solid lightgray" }
              : { border: "2px solid red" }
          }
          maxLength={64}
          required
        />
        <span className="warningmsg">{guardianWarning.address}</span>
      </div>
    </div>
  );
}

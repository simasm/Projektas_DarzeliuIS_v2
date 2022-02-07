import React, { useEffect, useState } from "react";
import inputValidator from "../08CommonComponents/InputValidator";

export default function GuardianForm({ guardianData, setGuardianData }) {
  const handleOnChange = (e) => {
    setGuardianData({
      ...guardianData,
      [e.target.name]: e.target.value,
    });
    inputValidator(e);

    applyRedBorder(e);
  };

  const applyRedBorder = (e) => {
    const fieldId = e.target.id;
    const spanId = fieldId + "Warning";

    const span = document.getElementById(spanId);

    const field = document.getElementById(fieldId);

    if (span.textContent !== "") {
      field.setAttribute("class", "form-control redborder");
    } else {
      field.setAttribute("class", "form-control");
    }
  };

  return (
    <div className="form">
      <div className="pb-1">
        <h6 className="formHeader">Vaiko atstovo duomenys</h6>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianName">
          Vardas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianName"
          name="name"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="^[A-Z]+[a-zA-Z]*$"
          maxLength={32}
          required
        />
        <span id="txtGuardianNameWarning" className="warningmsg"></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianSurname">
          Pavardė <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianSurname"
          name="surname"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[A-Ž]{1}[A-zÀ-ž]{1,31}"
          maxLength={32}
          required
        />
        <span id="txtGuardianSurnameWarning" className="warningmsg"></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianId">
          Asmens kodas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianId"
          name="personalCode"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[0-9]{11}"
          maxLength={11}
          required
        />
        <span id="txtGuardianIdWarning" className="warningmsg"></span>
      </div>

      <div className="form-group">
        <label htmlFor="txtGuardianPhone">
          Telefono numeris <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianPhone"
          name="phone"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[+]{1}[0-9]{11}"
          maxLength={12}
          required
        />
        <span id="txtGuardianPhoneWarning" className="warningmsg"></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianEmail">
          El. paštas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianEmail"
          name="email"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          maxLength={64}
          required
        />
        <span id="txtGuardianEmailWarning" className="warningmsg"></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianAddress">
          Adresas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianAddress"
          name="address"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[A-zÀ-ž]{5,64}"
          maxLength={64}
          required
        />
        <span id="txtGuardianAddressWarning" className="warningmsg"></span>
      </div>
    </div>
  );
}

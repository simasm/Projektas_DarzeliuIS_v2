import React from "react";
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
        <label htmlFor="txtGuardianNameCompensation">
          Vardas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianNameCompensation"
          name="name"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="^[A-ZĄ-Ž]{1}[a-zą-ž]{1,31}$"
          maxLength={32}
          required
        />
        <span
          id="txtGuardianNameCompensationWarning"
          className="warningmsg"
        ></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianSurname">
          Pavardė <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianSurnameCompensation"
          name="surname"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="^[A-ZĄ-Ž]{1}[a-zą-ž]{1,31}$"
          maxLength={32}
          required
        />
        <span
          id="txtGuardianSurnameCompensationWarning"
          className="warningmsg"
        ></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianId">
          Asmens kodas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianIdCompensation"
          name="personalCode"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[0-9]{11}"
          maxLength={11}
          required
        />
        <span
          id="txtGuardianIdCompensationWarning"
          className="warningmsg"
        ></span>
      </div>

      <div className="form-group">
        <label htmlFor="txtGuardianPhone">
          Telefono numeris <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianPhoneCompensation"
          name="phone"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[+]{1}[0-9]{11}"
          maxLength={12}
          required
        />
        <span
          id="txtGuardianPhoneCompensationWarning"
          className="warningmsg"
        ></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianEmail">
          El. paštas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianEmailCompensation"
          name="email"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          maxLength={64}
          required
        />
        <span
          id="txtGuardianEmailCompensationWarning"
          className="warningmsg"
        ></span>
      </div>

      <div className="form-group mt-2">
        <label htmlFor="txtGuardianAddress">
          Adresas <span className="fieldRequired">*</span>
        </label>
        <input
          type="text"
          id="txtGuardianAddressCompensation"
          name="address"
          className="form-control"
          onChange={(e) => handleOnChange(e)}
          pattern="[A-zÀ-ž]{5,64}"
          maxLength={64}
          required
        />
        <span
          id="txtGuardianAddressCompensationWarning"
          className="warningmsg"
        ></span>
      </div>
    </div>
  );
}

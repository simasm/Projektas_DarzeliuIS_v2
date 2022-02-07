import React, { useEffect, useState } from "react";
import inputValidator from "../08CommonComponents/InputValidator";

export default function KindergartenInfoForm({
  kindergartenData,
  setKindergartenData,
}) {
  // useEffect(() => {

  //   setKindergartenDTO(kindergartenDTO)

  // }, [kindergartenDTO.name, kindergartenDTO.code, kindergartenDTO.address, kindergartenDTO.phone, kindergartenDTO.email, kindergartenDTO.bankName, kindergartenDTO.accountNumber, kindergartenDTO.bankCode])

  const handleOnChange = (e) => {
    setKindergartenData({
      ...kindergartenData,
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
    <div className="container">
      <div className="form">
        <div className="pb-1">
          <h6 className="formHeader">Darzelio duomenys</h6>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenName">
            Ugdymo istaigos pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenName"
            name="name"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[A-zA-ž]{5,64}"
            maxLength={64}
            required
          />
          <span id="txtKindergartenNameWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenCode">
            Ugdymo istaigos kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenCode"
            name="code"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[0-9]{7,9}"
            maxLength={9}
            required
          />
          <span id="txtKindergartenCodeWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenAddress">
            Ugdymo istaigos adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenAddress"
            name="address"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[A-zÀ-ž]{5,64}"
            maxLength={64}
            required
          />
          <span
            id="txtKindergartenAddressWarning"
            className="warningmsg"
          ></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenPhone">
            Kontaktinis telefono numeris{" "}
            <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenPhone"
            name="phone"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[+]{1}[0-9]{11}"
            maxLength={12}
            required
          />
          <span id="txtKindergartenPhoneWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenEmail">
            El. pastas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenEmail"
            name="email"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            maxLength={64}
            required
          />
          <span id="txtKindergartenEmailWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenBankName">
            Banko pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenBankName"
            name="bankName"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[A-zÀ-ž]{2,32}"
            maxLength={32}
            required
          />
          <span
            id="txtKindergartenBankNameWarning"
            className="warningmsg"
          ></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenAccountNumber">
            Saskaitos numeris <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenAccountNumber"
            name="accountNumber"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[A-Z]{2}[0-9]{11}"
            maxLength={13}
            required
          />
          <span
            id="txtKindergartenAccountNumberWarning"
            className="warningmsg"
          ></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenBankCode">
            Banko kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenBankCode"
            name="bankCode"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[0-9]{5}"
            required
          />
          <span
            id="txtKindergartenBankCodeWarning"
            className="warningmsg"
          ></span>
        </div>
      </div>
    </div>
  );
}

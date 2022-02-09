import React from "react";
import inputValidator from "../08CommonComponents/InputValidator";

export default function KindergartenInfoForm({
  kindergartenData,
  setKindergartenData,
}) {
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
          <h6 className="formHeader">Darželio duomenys</h6>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenName">
            Ugdymo įstaigos pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenName"
            name="name"
            placeholder="Pavadinimas"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,64}$"
            maxLength={64}
            required
          />
          <span id="txtKindergartenNameWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenCode">
            Ugdymo įstaigos kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenCode"
            name="code"
            placeholder="123456789"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[\d]{9}|[\d]{7}"
            maxLength={9}
            required
          />
          <span id="txtKindergartenCodeWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenAddress">
            Ugdymo įstaigos adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenAddress"
            name="address"
            placeholder="Adresas"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,64}$"
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
            placeholder="+370xxxxxxxx | 852xxxxxx"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[+]{1}[0-9]{11}|[852]{3}[0-9]{6}"
            maxLength={12}
            required
          />
          <span id="txtKindergartenPhoneWarning" className="warningmsg"></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtKindergartenEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenEmail"
            name="email"
            placeholder="example@mail.com"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}"
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
            placeholder="Pavadinimas"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="^[A-Z]+[a-zA-Z\s]*$"
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
            Sąskaitos numeris <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtKindergartenAccountNumber"
            name="accountNumber"
            placeholder="LTXXXXXXXXXXXXXXXXXX"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="^[A-Z]{2}[A-Z0-9]{14,32}$"
            maxLength={34}
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
            placeholder="12345"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            pattern="[0-9]{5}"
            maxLength={5}
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

import React, { useState } from "react";
import KindergartenFormValidator from "../08CommonComponents/KindergartenFormValidator";

export default function KindergartenInfoForm({
  kindergartenData,
  setKindergartenData,
}) {
  const handleOnChange = (e) => {
    setKindergartenData({
      ...kindergartenData,
      [e.target.name]: e.target.value,
    });

    KindergartenFormValidator(
      e,
      setKindergartenWarning,
      kindergartenWarning,
      setKindergartenValid,
      kindergartenValid
    );
  };

  const [kindergartenWarning, setKindergartenWarning] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    bankName: "",
    accountNumber: "",
    bankCode: "",
  });

  const [kindergartenValid, setKindergartenValid] = useState({
    name: true,
    code: true,
    address: true,
    phone: true,
    email: true,
    bankName: true,
    accountNumber: true,
    bankCode: true,
  });

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
            style={
              kindergartenValid.name
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={64}
            required
          />
          <span className="warningmsg">{kindergartenWarning.name}</span>
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
            style={
              kindergartenValid.code
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={9}
            required
          />
          <span className="warningmsg">{kindergartenWarning.code}</span>
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
            style={
              kindergartenValid.address
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={64}
            required
          />
          <span className="warningmsg">{kindergartenWarning.address}</span>
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
            style={
              kindergartenValid.phone
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={12}
            required
          />
          <span className="warningmsg">{kindergartenWarning.phone}</span>
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
            style={
              kindergartenValid.email
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={64}
            required
          />
          <span className="warningmsg">{kindergartenWarning.email}</span>
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
            style={
              kindergartenValid.bankName
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={32}
            required
          />
          <span className="warningmsg">{kindergartenWarning.bankName}</span>
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
            style={
              kindergartenValid.accountNumber
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={13}
            required
          />
          <span className="warningmsg">
            {kindergartenWarning.accountNumber}
          </span>
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
            style={
              kindergartenValid.bankCode
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            maxLength={5}
            required
          />
          <span className="warningmsg">{kindergartenWarning.bankCode}</span>
        </div>
      </div>
    </div>
  );
}

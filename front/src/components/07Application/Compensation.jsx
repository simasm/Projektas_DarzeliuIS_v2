import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ChildInfoForm from "./ChildInfoForm";
import GuardianForm from "./GuardianForm";
import KindergartenInfoForm from "./KindergartenInfoForm";
import apiEndpoint from "../10Services/endpoint";

export default function Compensation() {
  const history = useHistory();
  const [idLength, setIdLength] = useState(0);

  const [childDTO, setChildDTO] = useState({
    personalID: "",
    name: "",
    surname: "",
    dateOfBirth: "",
  });

  const [kindergartenData, setKindergartenData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    bankName: "",
    accountNumber: "",
    bankCode: "",
  });

  const [guardianData, setGuardianData] = useState({
    name: "",
    surname: "",
    personalCode: "",
    phone: "",
    email: "",
    address: "",
  });

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

  const keys1 = Object.keys(childDTO);
  const keys2 = Object.keys(kindergartenData);
  const keys3 = Object.keys(guardianData);

  const compensationApplication = {
    childInfo: {
      personalID: childDTO.personalID,
      name: childDTO.name,
      surname: childDTO.surname,
      dateOfBirth: childDTO.dateOfBirth,
    },

    kindergartenInfo: {
      name: kindergartenData.name,
      code: kindergartenData.code,
      address: kindergartenData.address,
      phone: kindergartenData.phone,
      email: kindergartenData.email,
      bankName: kindergartenData.bankName,
      accountNumber: kindergartenData.accountNumber,
      bankCode: kindergartenData.bankCode,
    },

    guardianInfo: {
      name: guardianData.name,
      surname: guardianData.surname,
      personalCode: guardianData.personalCode,
      phone: guardianData.phone,
      email: guardianData.email,
      address: guardianData.address,
    },
  };

  useEffect(() => {
    const warningIds = [
      "txtKindergartenNameWarning",
      "txtKindergartenCodeWarning",
      "txtKindergartenAddressWarning",
      "txtKindergartenPhoneWarning",
      "txtKindergartenEmailWarning",
      "txtKindergartenBankNameWarning",
      "txtKindergartenAccountNumberWarning",
      "txtKindergartenBankCodeWarning",
      "txtGuardianNameCompensationWarning",
      "txtGuardianSurnameCompensationWarning",
      "txtGuardianIdCompensationWarning",
      "txtGuardianPhoneCompensationWarning",
      "txtGuardianEmailCompensationWarning",
      "txtGuardianAddressCompensationWarning",
    ];

    function checkIfAnyIncorrect() {
      // return warningIds.every(
      //   (id) => document.getElementById(id).textContent !== ""
      return true;
    }

    const btnSubmit = document.getElementById("btnSubmit");

    function checkIfAnyEmpty() {
      const emptyExists1 = keys1
        .map((k) => childDTO[k])
        .some((val) => val === "");
      const emptyExists2 = keys2
        .map((k) => kindergartenData[k])
        .some((val) => val === "");
      const emptyExists3 = keys3
        .map((k) => guardianData[k])
        .some((val) => val === "");

      const emptyExists = emptyExists1 || emptyExists2 || emptyExists3;

      return emptyExists;
    }

    if (checkIfAnyIncorrect() || checkIfAnyEmpty()) {
      btnSubmit.disabled = true;
    } else {
      btnSubmit.disabled = false;
    }
  }, [compensationApplication]);

  useEffect(() => {
    if (idLength !== 11) {
      setChildDTO({
        personalID: "",
        name: "",
        surname: "",
        dateOfBirth: "",
      });
    }
  }, [idLength]);

  const handleSubmit = () => {
    axios.post(
      apiEndpoint + `/api/kompensacija/user/new`,
      compensationApplication
    );

    history.push("/");
    alert("submitted");
    console.log(compensationApplication);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <ChildInfoForm
            setChildDTO={setChildDTO}
            setIdLength={setIdLength}
            applyRedBorder={applyRedBorder}
          />
        </div>
        <div className="col-4">
          <GuardianForm
            guardianData={guardianData}
            setGuardianData={setGuardianData}
            applyRedBorder={applyRedBorder}
          />
        </div>

        <div className=" col-4">
          <KindergartenInfoForm
            kindergartenData={kindergartenData}
            setKindergartenData={setKindergartenData}
            applyRedBorder={applyRedBorder}
          />
        </div>

        <div className="container">
          <div className="row justify-content-end me-4">
            <button
              className="btn btn-primary mt-4"
              id="btnSubmit"
              style={{ width: "100px" }}
              onClick={() => handleSubmit()}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

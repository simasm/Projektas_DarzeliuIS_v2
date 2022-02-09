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

  const [childInfoValid, setChildInfoValid] = useState({
    personalID: true,
    name: true,
    surname: true,
    dateOfBirth: true,
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

  const [guardianData, setGuardianData] = useState({
    name: "",
    surname: "",
    personalCode: "",
    phone: "",
    email: "",
    address: "",
  });

  const [guardianValid, setGuardianValid] = useState({
    name: true,
    surname: true,
    personalCode: true,
    phone: true,
    email: true,
    address: true,
  });

  const [btnDisabled, setBtnDisabled] = useState(false);

  const keys1 = Object.keys(childDTO);
  const keys2 = Object.keys(kindergartenData);
  const keys3 = Object.keys(guardianData);

  const childKeys = Object.keys(childInfoValid);
  const guardianKeys = Object.keys(guardianValid);
  const kindergartenKeys = Object.keys(kindergartenValid);

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
    function checkIfAnyIncorrect() {
      const incorrectExists1 = childKeys
        .map((k) => childInfoValid[k])
        .some((val) => val === false);
      const incorrectExists2 = guardianKeys
        .map((k) => guardianValid[k])
        .some((val) => val === false);
      const incorrectExists3 = kindergartenKeys
        .map((k) => kindergartenValid[k])
        .some((val) => val === false);

      const incorrectExists =
        incorrectExists1 || incorrectExists2 || incorrectExists3;

      return incorrectExists;
    }

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
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
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
            setChildInfoValid={setChildInfoValid}
            childInfoValid={childInfoValid}
          />
        </div>
        <div className="col-4">
          <GuardianForm
            guardianData={guardianData}
            setGuardianData={setGuardianData}
            guardianValid={guardianValid}
            setGuardianValid={setGuardianValid}
          />
        </div>

        <div className=" col-4">
          <KindergartenInfoForm
            kindergartenData={kindergartenData}
            setKindergartenData={setKindergartenData}
            setKindergartenValid={setKindergartenValid}
            kindergartenValid={kindergartenValid}
          />
        </div>

        <div className="container">
          <div className="row justify-content-end me-4">
            <button
              className="btn btn-primary mt-4"
              id="btnSubmit"
              style={{ width: "100px" }}
              onClick={() => handleSubmit()}
              disabled={btnDisabled}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

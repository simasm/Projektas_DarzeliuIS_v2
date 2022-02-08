import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
//import swal from "sweetaleart";
import inputValidator from "../08CommonComponents/InputValidator";

import "../../App.css";
import "../08CommonComponents/datePickerStyle.css";

const ApplyForCompensationForm = (props) => {

    const history = useHistory();

    const [disabledStatus, setDisabledStatus] = useState(false);

    const [kdTouched, setkdTouched] = useState({
        institutionName: false, institutionCode: false, institutionAddress: false, institutionTelephone: false,
        institutionEmail: false, bankName: false, accountNumber: false, bankCode: false, name: false, surname: false,
        personalCode: false, phone: false, email: false, address: false
    });

    const [kinderValid, setkinderValid] = useState({
        institutionName: false, institutionCode: false, institutionAddress: false, institutionTelephone: false,
        institutionEmail: false, bankName: false, accountNumber: false, bankCode: false, name: false, surname: false,
        personalCode: false, phone: false, email: false, address: false
    });

    const [kindergartenState, setKindergartenState] = useState({
        institutionName: "", institutionCode: "", institutionAddress: "", institutionTelephone: "",
        institutionEmail: "", bankName: "", accountNumber: "", bankCode: "", name: "", surname: "",
        personalCode: "", phone: "", email: "", address: ""
    });

    const [kdErrorState, setKdErrorState] = useState({
        institutionName: "", institutionCode: "", institutionAddress: "", institutionTelephone: "",
        institutionEmail: "", bankName: "", accountNumber: "", bankCode: "", name: "", surname: "",
        personalCode: "", phone: "", email: "", address: ""
    });

    const keys1 = Object.keys(kinderValid);

    const compensationApplication = {
    
        kindergartenInfo: {
          name: kindergartenState.institutionName,
          code: kindergartenState.institutionCode,
          address: kindergartenState.institutionAddress,
          phone: kindergartenState.institutionTelephone,
          email: kindergartenState.institutionEmail,
          bankName: kindergartenState.bankName,
          accountNumber: kindergartenState.accountNumber,
          bankCode: kindergartenState.bankCode
        },
    
        guardianInfo: {
          name: kindergartenState.name,
          surname: kindergartenState.surname,
          personalCode: kindergartenState.personalCode,
          phone: kindergartenState.phone,
          email: kindergartenState.email,
          address: kindergartenState.address
        },
    };

    useEffect(() => {
        function checkIfAnyInvalid() {
            const emptyExists1 = keys1
              .map((k) => kinderValid[k])
              .some((val) => val === false);
      
            return emptyExists1;
        }
        if (checkIfAnyInvalid()) {
            setDisabledStatus(true);
        } else {
            setDisabledStatus(false);
        }
    }, [compensationApplication])

    const handleSubmit = () => {
        axios.post(
          apiEndpoint + `/api/kompensacija/user/new`,
          compensationApplication
        );
    
        history.push("/");
        alert("submitted");
        console.log(compensationApplication);
      };

    const focusHandler = e => {
        setkdTouched({ ...kdTouched, [e.target.name]: true });
        validateKindergarten(e);
        //console.log("focusHandler: name=" + e.target.name + " result=" + kdTouched[e.target.name]);
    }

    const blurHandler = e => {
        setkdTouched({ ...kdTouched, [e.target.name]: false });
        setKdErrorState({ ...kdErrorState, [e.target.name]: "" });
    }

    const inputKindergartenChange = e => {
        inputValidator(e);
        setKindergartenState(kindergartenState => { // passing a function instead of just an object
            return {
                ...kindergartenState,
                [e.target.name]: e.target.value
            }
        });
        validateKindergarten(e);
    };

    function validateKindergarten(e) {
        const name = e.target.name;
        var result = false;

        switch (name) {
            case 'name':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[\w\sÀ-ž-".]{2,32}/) !== null && e.target.value.length < 33;
                    if (e.target.value.length > 32) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas vardas" });
                    else if (e.target.value.length < 2) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas vardas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'surname':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[\w\sÀ-ž-".]{2,32}/) !== null && e.target.value.length < 33;
                    if (e.target.value.length > 32) setKdErrorState({ ...kdErrorState, [name]: "Per ilga pavardė" });
                    else if (e.target.value.length < 2) setKdErrorState({ ...kdErrorState, [name]: "Per trumpa pavardė" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'personalCode':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[0-9]{11}/) !== null && e.target.value.length === 11;
                    if (e.target.value.length > 11) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas asmens kodas" });
                    else if (e.target.value.length < 11) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas asmens kodas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'phone':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[+]{1}[0-9]{4,19}/) !== null;
                    if (e.target.value.length > 19) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas numeris" });
                    else if (e.target.value.length < 4) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas numeris" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'email':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i) !== null;
                    if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'address':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[ 0-9A-zÀ-ž-.]{2,64}/) !== null;
                    if (e.target.value.length > 64) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas adresas" });
                    else if (e.target.value.length < 2) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas adresas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'institutionName':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[\w\sÀ-ž-".]{2,64}/) !== null && e.target.value.length < 65;
                    if (e.target.value.length >= 65) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas pavadinimas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'institutionCode':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[\d]{9}|[\d]{7}/) !== null &&
                        (e.target.value.length === 7 || e.target.value.length === 9);
                    if (e.target.value.length > 9) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas kodas" });
                    else if (e.target.value.length < 7) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas kodas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'institutionAddress':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[\w\s\dĄ-ž-.]{2,64}/) !== null &&
                        e.target.value.length < 65;
                    if (e.target.value.length > 64) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas adresas" });
                    else if (e.target.value.length < 2) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas adresas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'institutionTelephone':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[+]{1}[0-9]{4,19}/) !== null;
                    if (e.target.value.length > 19) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas telefono numeris" });
                    else if (e.target.value.length < 4) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas telefono numeris" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'institutionEmail':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                // [a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}
                // ^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$
                else {
                    result = e.target.value.match(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i) !== null;
                    if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'bankName':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[À-ž\w\s]{2,32}/) !== null &&
                        e.target.value.length < 33;
                    if (e.target.value.length > 32) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas pavadinimas" });
                    else if (e.target.value.length < 2) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas pavadinimas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'accountNumber':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                // [A-Z]{2}[A-Z0-9]{18,32}
                // [A-Z]{2}[A-Z0-9]{18}[A-Z0-9]{14}
                else {
                    result = e.target.value.match(/^[A-Z]{2}[A-Z0-9]{14,32}$/) !== null &&
                        e.target.value.length < 35 && e.target.value.length > 15;
                    if (e.target.value.length > 34) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas numeris" });
                    else if (e.target.value.length < 16) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas numeris" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            case 'bankCode':
                if (e.target.value.length === 0) {
                    setKdErrorState({ ...kdErrorState, [name]: "Būtina užpildyti!" });
                }
                else {
                    result = e.target.value.match(/[0-9]{5}/) !== null &&
                        e.target.value.length === 5;
                    if (e.target.value.length > 5) setKdErrorState({ ...kdErrorState, [name]: "Per ilgas kodas" });
                    else if (e.target.value.length < 5) setKdErrorState({ ...kdErrorState, [name]: "Per trumpas kodas" });
                    else if (result === false) setKdErrorState({ ...kdErrorState, [name]: "Netinkamas formatas" });
                    else setKdErrorState({ ...kdErrorState, [name]: "" });
                }
                return (setkinderValid({ ...kinderValid, [name]: result }))
            default: return (result = false, console.log("validateKindergarten: default:" + result));
        }
    }

    const kindergartenForm = () => {
        //console.log(kinderValid)
        return (
            <><h2>Darželio duomenys</h2>
                <div className="form">
                    <div className="mb-3">
                        <label htmlFor="txtName"  >
                            Ugdymo įstaigos pavadinimas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.institutionName}
                            id="txtInstitutionName"
                            style={kinderValid.institutionName ||
                                !kdTouched.institutionName ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="institutionName"
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern='[\w\sÀ-ž-".]{2,64}'
                            required
                        />
                        <span className="text-danger">{kdErrorState.institutionName}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Ugdymo įstaigos kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.institutionCode}
                            id="txtInstitutionCode"
                            name="institutionCode"
                            style={kinderValid.institutionCode ||
                                !kdTouched.institutionCode ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onInput={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[\d]{9}|[\d]{7}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.institutionCode}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Ugdymo įstaigos adresas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.institutionAddress}
                            id="txtInstitutionAddress"
                            name="institutionAddress"
                            style={kinderValid.institutionAddress ||
                                !kdTouched.institutionAddress ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[\w\s\dĄ-ž-.]{2,64}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.institutionAddress}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Kontaktinis telefono numeris <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="tel"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.institutionTelephone}
                            id="txtInstitutionTelephone"
                            name="institutionTelephone"
                            style={kinderValid.institutionTelephone ||
                                !kdTouched.institutionTelephone ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[+]{1}[0-9]{4,19}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.institutionTelephone}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            El.paštas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.institutionEmail}
                            id="txtInstitutionEmail"
                            name="institutionEmail"
                            style={kinderValid.institutionEmail ||
                                !kdTouched.institutionEmail ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.institutionEmail}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Banko pavadinimas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.bankName}
                            id="txtBankName"
                            name="bankName"
                            style={kinderValid.bankName ||
                                !kdTouched.bankName ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[À-ž\w\s]{2,32}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.bankName}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Sąskaitos numeris <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.accountNumber}
                            id="txtAccountNumber"
                            name="accountNumber"
                            style={kinderValid.accountNumber ||
                                !kdTouched.accountNumber ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="^[A-Z]{2}[A-Z0-9]{14,32}$"
                            required
                        />
                        <span className="text-danger">{kdErrorState.accountNumber}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Banko kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.bankCode}
                            id="txtBankCode"
                            name="bankCode"
                            style={kinderValid.bankCode ||
                                !kdTouched.bankCode ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[0-9]{5}"
                            required
                        />
                        <span className="text-danger">{kdErrorState.bankCode}</span>
                    </div>
                    
                    <h6><span className="fieldRequired">*</span> - simboliu pažymėti laukai privalo būti užpildyti</h6>
                </div>
            </>
        )
    }

    const parentForm = e => {
        return (
            <>
                <h2>Vieno iš tėvų duomenys</h2>
                <div className="form">
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Vardas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.name}
                            id="txtMainName"
                            style={kinderValid.name ||
                                !kdTouched.name ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="name"
                            className="form-control"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern='[\w\sÀ-ž-".]{2,32}' />
                        <span className="text-danger">{kdErrorState.name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtSurname">
                            Pavardė <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.surname}
                            id="txtMainSurname"
                            style={kinderValid.surname ||
                                !kdTouched.surname ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="surname"
                            className="form-control"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern='[\w\sÀ-ž-".]{2,32}' />
                        <span className="text-danger">{kdErrorState.surname}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtPersonalCode">
                            Asmens kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.personalCode}
                            id="txtMainPersonalCode"
                            style={kinderValid.personalCode ||
                                !kdTouched.personalCode ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="personalCode"
                            className="form-control"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[0-9]{11}" />
                        <span className="text-danger">{kdErrorState.personalCode}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtTelNo">
                            Telefonas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.phone}
                            id="txtMainPhone"
                            style={kinderValid.phone ||
                                !kdTouched.phone ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="phone"
                            className="form-control"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[+]{1}[0-9]{4,19}"
                        />
                        <span className="text-danger">{kdErrorState.phone}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtEmail">
                            El.paštas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.email}
                            id="txtMainEmail"
                            style={kinderValid.email ||
                                !kdTouched.email ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="email"
                            className="form-control"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$"
                        />
                        <span className="text-danger">{kdErrorState.email}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtAddress">
                            Adresas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            value={kindergartenState.address}
                            className="form-control"
                            id="txtMainAddress"
                            style={kinderValid.address ||
                                !kdTouched.address ?
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="address"
                            onChange={inputKindergartenChange}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[ 0-9A-zÀ-ž-.]{2,64}"
                            required />
                        <span className="text-danger">{kdErrorState.address}</span>
                    </div>
                </div>
            </>

        );
    }

    return (
        <div className="container pt-4">
            <h2>Prašymas dėl kompensacijos</h2>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-4">
                            {
                                /** Vaiko duomenys */
                                /** Vaiko komponentas iš Justo*/
                            }
                        </div>

                        <div className="col-4">
                            {
                                /** Vieno iš tėvų forma */
                                parentForm()
                            }
                        </div>

                        <div className="col-4">
                            {
                                /** Vaiko forma */
                                kindergartenForm()
                            }
                        </div>
                    </div>
                    <div className="row">
                    <div><button type="submit" class="btn btn-primary" disabled={disabledStatus}>Submit</button></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplyForCompensationForm
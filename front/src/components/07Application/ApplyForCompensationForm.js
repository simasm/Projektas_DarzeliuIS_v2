import React, { useState } from "react";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
//import swal from "sweetaleart";
import inputValidator from "../08CommonComponents/InputValidator";

import "../../App.css";
import "../08CommonComponents/datePickerStyle.css";

const ApplyForCompensationForm = (props) => {

    const [kdTouched, setkdTouched] = useState({
        institutionName: false, institutionCode: false, institutionAddress: false, institutionTelephone: false,
        institutionEmail: false, bankName: false, accountNumber: false, bankCode: false
    });

    const [kinderValid, setkinderValid] = useState({
        institutionName: false, institutionCode: false, institutionAddress: false, institutionTelephone: false,
        institutionEmail: false, bankName: false, accountNumber: false, bankCode: false
    });

    const [kindergartenState, setKindergartenState] = useState({
        institutionName: "", institutionCode: "", institutionAddress: "", institutionTelephone: "",
        institutionEmail: "", bankName: "", accountNumber: "", bankCode: ""
    });

    const [kdErrorState, setKdErrorState] = useState({
        kdNameError: "", kdCodeError: "", kdAddressError: "", kdTelephoneError: "",
        kdEmailError: "", kdBankError: "", kdAccountError: "", kdBankCodeError: ""
    });

    const [parentState, setParentState] = useState({
        name: "", surname: "", personalCode: "",
        phone: "", email: "", address: ""
    })

    const focusHandler = e => {
        setkdTouched({ ...kdTouched, [e.target.name]: true });
        console.log("focusHandler: name=" + e.target.name + " result=" + kdTouched[e.target.name]);
    }

    // const inputKindergartenChange = e => {
    //     inputValidator(e);
    //     setKindergartenState({
    //         ...kindergartenState,
    //         [e.target.name]: e.target.value
    //     });
    //     validateKindergarten(e);
        
    // };
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
            case 'institutionName':
                if(e.target.value.length === 0) setKdErrorState({...kdErrorState, kdNameError: "Laukelis tuščias"})
                return (
                    result = e.target.value.match(/[\w\sÀ-ž-".]{2,64}/) !== null && 
                    e.target.value.length < 65,
                    setkinderValid({ ...kinderValid, [name]: result }),
                    setKdErrorState({...kdErrorState, kdNameError: "Netinkamas formatas"})
                )
                
            case 'institutionCode':
                return (
                    result = e.target.value.match(/[\d]{9}|[\d]{7}/) !== null && 
                    (e.target.value.length === 7 || e.target.value.length === 9),
                    setkinderValid({ ...kinderValid, [name]: result })
                   
                )
            case 'institutionAddress':
                return (
                    result = e.target.value.match(/[\w\s\dĄ-ž-.]{2,64}/) !== null && 
                    e.target.value.length < 65,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            case 'institutionTelephone':
                return (
                    result = e.target.value.match(/[+]{1}[0-9]{11}/) !== null && 
                    e.target.value.length === 12,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            case 'institutionEmail':
                return (
                    result = e.target.value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/) !== null,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            case 'bankName':
                return (
                    result = e.target.value.match(/[À-ž\w\s]{2,32}/) !== null && 
                    e.target.value.length < 33,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            case 'accountNumber':
                return (
                    result = e.target.value.match(/[A-Z]{2}[A-Z0-9]{18,32}/) !== null && 
                    e.target.value.length < 33,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            case 'bankCode':
                return (
                    result = e.target.value.match(/[0-9]{5}/) !== null && 
                    e.target.value.length < 6,
                    setkinderValid({ ...kinderValid, [name]: result })
                    
                )
            default: return (result = false, console.log("validateKindergarten: default:" + result));
        }
    }

    const inputParentChange = e => {
        inputValidator(e);
        validateKindergarten(e);
        setParentState({
            ...parentState,
            [e.target.name]: e.target.value
        });
    }

    const submitHandle = e => {
        e.preventDefault();
    }

    const kindergartenForm = () => {
        console.log(kinderValid)
        return (
            <><h2>Darželio duomenys</h2>
                <div className="form" onSubmit={submitHandle} >
                    <div className="mb-3">
                        <label htmlFor="txtName"  >
                            Ugdymo įstaigos pavadinimas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.institutionName}
                            id="txtInstitutionName"
                            style={kinderValid.institutionName || 
                                  !kdTouched.institutionName ? 
                                  { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            name="institutionName"
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern='[ A-zÀ-ž-".]{2,64}'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Ugdymo įstaigos kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.institutionCode}
                            id="txtInstitutionCode"
                            name="institutionCode"
                            style={kinderValid.institutionCode || 
                                !kdTouched.institutionCode ? 
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onInput={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[0-9]{9}|[0-9]{7}"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Ugdymo įstaigos adresas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.institutionAddress}
                            id="txtInstitutionAddress"
                            name="institutionAddress"
                            style={kinderValid.institutionAddress || 
                                !kdTouched.institutionAddress ? 
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[ 0-9A-zÀ-ž-.]{2,64}"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Kontaktinis telefono numeris <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="tel"
                            onFocus={focusHandler}
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
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            El.paštas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.institutionEmail}
                            id="txtInstitutionEmail"
                            name="institutionEmail"
                            style={kinderValid.institutionEmail || 
                                !kdTouched.institutionEmail ? 
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Banko pavadinimas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.bankName}
                            id="txtBankName"
                            name="bankName"
                            style={kinderValid.bankName || 
                                !kdTouched.bankName ? 
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[ A-zÀ-ž]{2,32}"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Sąskaitos numeris <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
                            value={kindergartenState.accountNumber}
                            id="txtAccountNumber"
                            name="accountNumber"
                            style={kinderValid.accountNumber || 
                                !kdTouched.accountNumber ? 
                                { border: "1px solid lightgray" } : { border: "2px solid red" }}
                            className="form-control"
                            onChange={(e) => inputKindergartenChange(e)}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[A-Z]{2}[A-Z0-9]{18,32}"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtName">
                            Banko kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            onFocus={focusHandler}
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
                    </div>
                    <div><button type="submit" class="btn btn-primary">Submit</button></div>
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
                            id="txtMainName"
                            name="name"
                            className="form-control"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[A-zÀ-ž]{2,32}" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtSurname">
                            Pavardė <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            id="txtMainSurname"
                            name="surname"
                            className="form-control"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[A-zÀ-ž]{2,32}" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtPersonalCode">
                            Asmens kodas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            id="txtMainPersonalCode"
                            name="personalCode"
                            className="form-control"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[0-9]{11}" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtTelNo">
                            Telefonas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            id="txtMainPhone"
                            name="phone"
                            className="form-control"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[+]{1}[0-9]{4,19}"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtEmail">
                            El.paštas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            id="txtMainEmail"
                            name="email"
                            className="form-control"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtAddress">
                            Adresas <span className="fieldRequired">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtMainAddress"
                            name="address"
                            onChange={inputParentChange}
                            onInvalid={(e) => inputValidator(e)}
                            pattern="[ 0-9A-zÀ-ž-.]{2,64}"
                            required />
                    </div>
                </div>
            </>

        );
    }

    return (
        <div className="container pt-4">
            <h2>Prašymas dėl kompensacijos</h2>
            <div className="form">
                <form onSubmit={submitHandle}>
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

                    </div>
                </form>
            </div>
        </div>
    );
}

export default ApplyForCompensationForm
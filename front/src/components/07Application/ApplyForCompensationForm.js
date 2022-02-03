import React, { useState, useEffect } from "react";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
//import swal from "sweetaleart";
import inputValidator from "../08CommonComponents/InputValidator";

import "../../App.css";
import "../08CommonComponents/datePickerStyle.css";

const ApplyForCompensationForm = (props) => {

    const [kindergartenState, setKindergartenState] = useState({
        institutionName: "", institutionCode: "", institutionAddress: "", institutionTelephone: "",
        institutionEmail: "", bankName: "", accountNumber: "", bankCode: ""
    });
    const [parentState, setParentState] = useState({
        name: "", surname: "", personalCode: "",
        phone: "", email: "", address: ""
    })

    const inputKindergartenChange = e => {
        inputValidator(e);
        setKindergartenState({
            ...kindergartenState,
            [e.target.name]: e.target.value
        });
    };

    const inputParentChange = e => {
        inputValidator(e);
        setParentState({
            ...parentState,
            [e.target.name]: e.target.value
        });
    }

    // const validateKindergarten = (e) => {
    //     let A = title.length > 0 && title.match(/\w/) !== null;
    //     let B = place.length > 0 && place.match(/\w/) !== null;
    //     let C = description.length > 0 && description.match(/\w/) !== null;
    //     let D = vacs.length > 0 && vacs.match(/\w/) !== null && vacs.match(/Pasirinkti vakciną\.\.\./g) === null;
    //     let E = registeredUsersNumber > 0 && registeredUsersNumber.match(/^[0-9]+$/) !== null;
    //     let F = vacNumber > 0 && vacNumber.match(/^[0-9]+$/) !== null;
    //     let check_6 = A && B && C && D && E && F;
    //     if (check_6 === false)
    //         alert("Pavadinimas: " + A +
    //             "\nEilės tipas: " + B +
    //             "\nAprašymas: " + C +
    //             "\nVakcina: " + D +
    //             "\nRegistruotų žmonių skaičius: " + E +
    //             "\nVakcinų skaičius: " + F
    //         );
    //     return check_6;
    // }
    const submitHandle = e => {

    }

    const kindergartenForm = () => {
        return (
            <><h2>Darželio duomenys</h2>
            <div className="form">
                <div className="mb-3">
                    <label htmlFor="txtName"  >
                        Ugdymo įstaigos pavadinimas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtEduInstitutionName"
                        name="institutionName"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtEduInstitutionCode"
                        name="institutionCode"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtEduInstitutionAddress"
                        name="institutionAddress"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtEduInstitutionTelephone"
                        name="institutionTelephone"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtEduInstitutionEmail"
                        name="institutionEmail"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtBankName"
                        name="bankName"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtAccountNumber"
                        name="accountNumber"
                        className="form-control"
                        onChange={inputKindergartenChange}
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
                        id="txtBankCode"
                        name="bankCode"
                        className="form-control"
                        onChange={inputKindergartenChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[0-9]{5}"
                        required
                    />
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

    // /** Vaiko forma */
    // function childForm() {
    //     return (
    //         <div className="form">
    //             <div className="pb-1">
    //                 <h6 className="formHeader">Vaiko duomenys</h6>
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="txtPersonalCode">
    //                     Asmens kodas <span className="fieldRequired">*</span>
    //                 </label>
    //                 <input
    //                     type="text"
    //                     id="txtChildPersonalCode"
    //                     name="childPersonalCode"
    //                     placeholder="Asmens kodas"
    //                     className="form-control"
    //                     //value={this.state.childPersonalCode}
    //                     onChange={handleChildChange}
    //                     onInvalid={(e) => inputValidator(e)}
    //                     disabled="false"
    //                     required
    //                     pattern="[0-9]{11}"
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="txtName">
    //                     Vaiko vardas
    //                 </label>
    //                 <input
    //                     type="text"
    //                     id="txtChildName"
    //                     name="childName"
    //                     placeholder="Vaiko vardas"
    //                     className="form-control"
    //                     //value={this.state.childName}
    //                     onChange={handleChildChange}
    //                     onInvalid={(e) => inputValidator(e)}
    //                     disabled={this.state.registrationDisabled}
    //                     required
    //                     pattern="[A-zÀ-ž]{2,32}"
    //                 />
    //             </div>
    //             <div className="form-group">
    //                 <label htmlFor="txtSurname">
    //                     Vaiko pavardė
    //                 </label>
    //                 <input
    //                     type="text"
    //                     id="txtChildSurname"
    //                     name="childSurname"
    //                     placeholder="Vaiko pavardė"
    //                     className="form-control"
    //                     //value={this.state.childSurname}
    //                     onChange={handleChildChange}
    //                     onInvalid={(e) => inputValidator(e)}
    //                     disabled={this.state.registrationDisabled}
    //                     required
    //                     pattern="[A-zÀ-ž]{2,32}"
    //                 />
    //             </div>
    //             {/** Gimimo data */}
    //             <div className="form-group">
    //                 <label htmlFor="txtBirthdate">
    //                     Gimimo data
    //                 </label>
    //                 <DatePicker
    //                     className="form-control"
    //                     locale="lt"
    //                     dateFormat="yyyy/MM/dd"
    //                     selected={this.state.birthdate}
    //                     onChange={(e) => {
    //                         this.setState({ birthdate: e });
    //                     }}
    //                     minDate={subYears(new Date(), 6)}
    //                     maxDate={subYears(new Date(), 1)}
    //                     disabled={this.state.registrationDisabled}
    //                 />
    //             </div>
    //         </div>
    //     );
    // }



}

export default ApplyForCompensationForm
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
    const [threeFields, setThreeFields] = useState("true");


    const inputChange = e => {
        inputValidator(e);
        setKindergartenState({
            ...kindergartenState,
            [e.target.name]: e.target.value
        });
    };

    const submitHandle = e => {

    }

    const kindergartenForm = () => {
        return (
            <><h2>Darželio duomenys</h2>
                <div className="form-group">
                    <label htmlFor="txtName">
                        Ugdymo įstaigos pavadinimas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtEduInstitutionName"
                        name="institutionName"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[ A-zÀ-ž]{2,32}"
                        required
                    />
                    <label htmlFor="txtName">
                        Ugdymo įstaigos kodas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtEduInstitutionCode"
                        name="institutionCode"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[ 0-9]{9,10}"
                        required
                    />
                    <label htmlFor="txtName">
                        Ugdymo įstaigos adresas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtEduInstitutionAddress"
                        name="institutionAddress"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[ a-zÀ-ž0-9.-]{2,32}"
                        required
                    />

                    <label htmlFor="txtName">
                        Kontaktinis telefono numeris <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="tel"
                        id="txtEduInstitutionTelephone"
                        name="institutionTelephone"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[+]{1}[0-9]{4,19}"
                        required
                    />
                    <label htmlFor="txtName">
                        El.paštas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtEduInstitutionEmail"
                        name="institutionEmail"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                        required
                    />
                    <label htmlFor="txtName">
                        Banko pavadinimas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtBankName"
                        name="bankName"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[ A-zÀ-ž]{2,32}"
                        required
                    />
                    <label htmlFor="txtName">
                        Sąskaitos numeris <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtAccountNumber"
                        name="accountNumber"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[A-Z0-9]{20,22}"
                        required
                    />
                    <label htmlFor="txtName">
                        Banko kodas <span className="fieldRequired">*</span>
                    </label>
                    <input
                        type="text"
                        id="txtBankCode"
                        name="bankCode"
                        className="form-control"
                        onChange={inputChange}
                        onInvalid={(e) => inputValidator(e)}
                        pattern="[0-9]{4,5}"
                        required
                    />
                </div>
            </>
        )
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
                                /** Vaiko komponentas*/
                            } 
                        </div>

                        <div className="col-4">
                            {
                                /** Tuščias stulpelis */
                                /** turėtų būti tėvų stulpelis (Parent's data) */
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
import React from "react";
import inputValidator from "../08CommonComponents/InputValidator";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useHistory } from "react-router";
import swal from "sweetalert";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import CreateUserFormValidator from "../08CommonComponents/CreateUserFormValidator";

export const CreateUserForm = () => {

    const [state, setState] = useState({
        email: "",
        name: "",
        surname: "",
        newPassword: "",
        newPasswordRepeat: ""
    });
    const [formWarning, setFormWarning] = useState({
        email: "",
        name: "",
        surname: "",
        newPassword: "",
        newPasswordRepeat: ""
    });


    const [formValid, setFormValid] = useState({
        email: true,
        name: true,
        surname: true,
        newPassword: true,
        newPasswordRepeat: true
    })

  
    const history = useHistory();


    const handleChange = (event) => {
        const target = event.target;
        setState({
            ...state,
            [target.name]: target.value,
        });

        CreateUserFormValidator(
            event,
            formWarning,
            setFormWarning,
            formValid,
            setFormValid

        );


    }

    const requiredMessage = (e) => {

 
 
        if (e.target.value === "")
              e.target.setCustomValidity(e.target.title + " yra privalomas laukelis");
        else {
            e.preventDefault();
            // if(e.target.name === "newPassword" || e.target.name === "newPasswordRepeat")  { 
            
                
            // }
            e.target.setCustomValidity('');
        }

    }

    const resetForm = () => {
        setState({
            email: "",
            name: "",
            surname: "",
            newPassword: "",
            newPasswordRepeat: ""
        });
        setFormValid({
            email: true,
            name: true,
            surname: true,
            newPassword: true,
            newPasswordRepeat: true
        });
        setFormWarning({
            email: "",
            name: "",
            surname: "",
            newPassword: "",
            newPasswordRepeat: ""
        });
    }

    const toHomepage = () => {
        history.push("/");
    }

    const handleSubmit = (event) => {
        handleUpdatePasswordSubmit(event);
        event.preventDefault();

    }

    const handleUpdatePasswordSubmit = (event) => {
        if (state.newPassword !== state.newPasswordRepeat) {
            swal({
                text: "Slaptažodžiai nesutampa.",
                button: "Gerai",
            });
        } else {
            http
                .post(
                    `${apiEndpoint}/api/users/createAccount`, {
                        "name": state.name,
                    "surname": state.surname,
                    "email": state.email,
                    "username": state.email,
                    "password": state.newPassword
                },
                    {}
                )
                .then((response) => {
                    swal({
                        text: response.data,
                        button: "Gerai",
                    }).then(() => {
                        history.push("/");
                    });

                })
                .catch((error) => {
                    swal({
                        text: error.response.data,
                        button: "Gerai",
                    });
                });
        }
    }


    return (

        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="card p-5">
                <img
                    src={logo}
                    alt="Vilniaus miesto savivaldybės vaikų darželių informacinė sistema"
                    className="img-fluid   mb-3"
                />

                <h3>Naudotojo registracija</h3>

                <div className="form-group">
                    <div className="form" >

                        <form onSubmit={handleSubmit} >

                            <label htmlFor="txtName" className="mt-2">
                                Vardas <span className="fieldRequired">*</span>
                            </label>
                            <input
                                title="Vardas"
                                type="text"
                                id="txtName"
                                name="name"
                                placeholder="Vardas"
                                className="form-control mt-2 mb-2"
                                value={state.name}
                                onChange={handleChange}
                                required
                                maxLength={32}
                                onInvalid={requiredMessage}
                                style={
                                    formValid.name
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <span className="warningmsg">{formWarning.name}</span>

                            <label htmlFor="txtSurname" className="mt-2">
                                Pavardė <span className="fieldRequired">*</span>
                            </label>
                            <input
                                title="Pavardė"
                                type="text"
                                id="txtSurname"
                                name="surname"
                                placeholder="Pavardė"
                                className="form-control mt-2 mb-2"
                                value={state.surname}
                                onChange={handleChange}
                                required
                                maxLength={32}
                                onInvalid={requiredMessage}

                                style={
                                    formValid.surname
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <span className="warningmsg">{formWarning.surname}</span>

                            <label htmlFor="txtEmail" className="mt-2">
                                El. paštas <span className="fieldRequired">*</span>
                            </label>
                            <input
                                title="Paštas"
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="txtEmail"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                required
                                maxLength={128}
                                onInvalid={requiredMessage}
                                style={
                                    formValid.email
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <span className="warningmsg">{formWarning.email}</span>

                            <label htmlFor="txtNewPassword" className="mt-2">
                                Įveskite slaptažodį{" "}
                                <span className="fieldRequired">*</span>
                            </label>


                            <input
                                title="Slaptažodis"
                                type="password"
                                id="txtNewPassword"
                                name="newPassword"
                                className="form-control mt-2 mb-2"
                                value={state.newPassword}
                                onChange={handleChange}
                                required
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                onInvalid={requiredMessage}

                                style={
                                    formValid.newPassword
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <span className="warningmsg">{formWarning.newPassword}</span>


                            <label htmlFor="txtRepeatNewPassword" className="mt-2">
                                Pakartokite slaptažodį{" "}
                                <span className="fieldRequired">*</span>
                            </label>
                            <input
                                title="Pakartoti slaptažodį"
                                type="password"
                                id="txtNewPasswordRepeat"
                                name="newPasswordRepeat"
                                className="form-control mt-2"
                                value={state.newPasswordRepeat}
                                onChange={handleChange}
                                required
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                onInvalid={requiredMessage}

                                style={
                                    formValid.newPasswordRepeat
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <span className="warningmsg">{formWarning.newPasswordRepeat}</span>

                            <p className="text-primary">
                                <br />
                                Dėmesio! Slaptažodis turi būti ne mažiau 8 simbolių ilgio,<br />
                                turėti bent vieną didžiąją ir mažąją raides ir bent vieną
                                skaičių.
                            </p>


                            <div className="row justify-content-between mt-4">
                                <button

                                    className="btn btn-primary col-3 ms-3"
                                    id="btnReturn"
                                    onClick={toHomepage}
                                >
                                    &larr; Grįžti
                                </button>
                                <button
                                    className="btn btn-outline-danger col-3 "
                                    onClick={resetForm}
                                    id="btnClean"
                                >
                                    Išvalyti
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary col-3"
                                    id="btnCreate"
                                >
                                    Sukurti
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    );




}

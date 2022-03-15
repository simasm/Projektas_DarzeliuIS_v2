import React from "react";
import inputValidator from "../08CommonComponents/InputValidator";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useHistory } from "react-router";
import swal from "sweetalert";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";


export const CreateUserForm = () => {

    const [state, setState] = useState({
        role: "USER",
        email: "",
        name: "",
        surname: "",
        newPassword: "",
        newPasswordRepeat: ""
    });

    const [passwordValid, setPasswordValid] = useState(true);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const history = useHistory();

    const handleChange = (event) => {
        const target = event.target;
        inputValidator(event);
        setState({
            ...state,
            [target.name]: target.value,
        });
    }

    const resetState = () => {
        setState({
            role: "USER",
            email: "",
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
                    `${apiEndpoint}/api/users/createAccount`, { "name": state.name, 
                                                                "surname" : state.surname,
                                                                "email": state.email, 
                                                                "username": state.email, 
                                                                "password": state.newPassword },
                    {}
                )
                .then((response) => {
                    swal({
                        text: response.data,
                        button: "Gerai",
                    }).then(()=>{
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
                                type="text"
                                id="txtName"
                                name="name"
                                placeholder="Vardas"
                                className="form-control mt-2 mb-2"
                                value={state.name}
                                onChange={handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                required
                                pattern="[A-zÀ-ž]{2,32}"
                                maxLength={32}
                            />
                            <label htmlFor="txtSurname" className="mt-2">
                                Pavardė <span className="fieldRequired">*</span>
                            </label>
                            <input
                                type="text"
                                id="txtSurname"
                                name="surname"
                                placeholder="Pavardė"
                                className="form-control mt-2 mb-2"
                                value={state.surname}
                                onChange={handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                required
                                maxLength={32}
                                pattern="[A-zÀ-ž]{2,32}"
                            />
                            <label htmlFor="txtEmail" className="mt-2">
                                El. paštas <span className="fieldRequired">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="txtEmail"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                                maxLength={128}
                                style={
                                    emailValid
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />

                            <label htmlFor="txtNewPassword" className="mt-2">
                                Įveskite slaptažodį{" "}
                                <span className="fieldRequired">*</span>
                            </label>


                            <input
                                type="password"
                                id="txtNewPassword"
                                name="newPassword"
                                className="form-control mt-2 mb-2"
                                value={state.newPassword}
                                onChange={handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                required
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                style={
                                    passwordValid
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />


                            <label htmlFor="txtRepeatNewPassword" className="mt-2">
                                Pakartokite slaptažodį{" "}
                                <span className="fieldRequired">*</span>
                            </label>
                            <input
                                type="password"
                                id="txtNewPasswordRepeat"
                                name="newPasswordRepeat"
                                className="form-control mt-2"
                                value={state.newPasswordRepeat}
                                onChange={handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                required
                                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                style={
                                    repeatPasswordValid
                                        ? { border: "1px solid lightgray" }
                                        : { border: "2px solid red" }
                                }
                            />
                            <p className="text-primary">
                                <br />
                                Dėmesio! Slaptažodis turi būti ne mažiau 8 simbolių ilgio,<br />
                                turėti bent vieną didžiąją ir mažąją raides ir bent vieną
                                skaičių.
                            </p>


                            <div className="row justify-content-between mt-4">
                                <button

                                    className="btn btn-primary col-3 ms-3"
                                    id="btnCreate"
                                    onClick={toHomepage}
                                >
                                    &larr; Grįžti
                                </button>
                                <button
                                    className="btn btn-outline-danger col-3 "
                                    onClick={resetState}
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

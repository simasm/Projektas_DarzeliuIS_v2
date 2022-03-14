import React from "react";
import inputValidator from "../08CommonComponents/InputValidator";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useHistory } from "react-router";
import swal from "sweetalert";

export const CreateUserForm = () => {

    const [state, setState] = useState({
        role: "USER",
        email: "",
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

    const handleSubmit = (e) => {
        handleUpdatePasswordSubmit(e);
        e.preventDefault();
        console.log('t');
        

    }

    const handleUpdatePasswordSubmit = (e) => {
        if (state.newPassword !== state.newPasswordRepeat) {
            swal({
                text: "Slaptažodžiai nesutampa.",
                button: "Gerai",
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


                            <label htmlFor="txtEmail" className="mb-2">
                                El. paštas <span className="fieldRequired">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
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



                            <label htmlFor="txtNewPassword">
                                Įveskite slaptažodį{" "}
                                <span className="fieldRequired">*</span>
                            </label>


                            <input
                                type="password"
                                id="txtNewPassword"
                                name="newPassword"
                                className="form-control mt-2"
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


                            <label htmlFor="txtRepeatNewPassword">
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
                                Dėmesio! Slaptažodis turi būti ne mažiau 8 simbolių ilgio,<br/>
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

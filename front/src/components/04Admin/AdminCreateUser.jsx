import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "../../App.css";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";

import inputValidator from "../08CommonComponents/InputValidator";
import AdminCreateUserFormValidator from "../08CommonComponents/AdminCreateUserFormValidator";

class AdminCreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "ADMIN",
      name: "",
      surname: "",
      birthdate: "",
      personalCode: "",
      address: "",
      city: "",
      phone: "",
      email: "",
    };
    this.roleDropdownOnChange = this.roleDropdownOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  infoValid = {
    name: true,
    surname: true,
    personalCode: true,
    address: true,
    city: true,
    phone: true,
    email: true,
  };

  infoWarning = {
    name: "",
    surname: "",
    personalCode: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  };

  drawSelector() {
    return (
      <div className="form">
        <div className="form-group mt-2 mb-3">
          <label htmlFor="role-selector" className="mb-2">
            Naudotojo rolė:
          </label>
          <select
            name="role-selector"
            id="selRole"
            className="form-control"
            value={this.state.role}
            onChange={this.roleDropdownOnChange}
          >
            <option value="ADMIN">Administratorius</option>
            <option value="MANAGER">Švietimo specialistas</option>
            <option value="USER">Vaiko atstovas</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="txtEmail" className="mb-2">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtEmail"
            name="email"
            value={this.state.email}
            style={
              this.infoValid.email
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            onChange={this.handleChange}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            maxLength={128}
          />
          <span className="warningmsg">{this.infoWarning.email}</span>
        </div>
      </div>
    );
  }

  drawForm(role) {
    if (role === "ADMIN" || role === "MANAGER") {
      return (
        <div className="form">
          <div className="form-group mt-2">
            <label htmlFor="txtName" className="mb-2">
              Vardas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="txtName"
              name="name"
              value={this.state.name}
              style={
                this.infoValid.name
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">{this.infoWarning.name}</span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtSurname" className="mb-2">
              Pavardė <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="txtSurname"
              name="surname"
              value={this.state.surname}
              style={
                this.infoValid.surname
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">{this.infoWarning.surname}</span>
          </div>
        </div>
      );
    } else if (role === "USER") {
      return (
        <div className="form-group">
          <div className="form">
            <div className="form-group mt-2">
              <label htmlFor="txtName" className="mb-2">
                Vardas <span className="fieldRequired">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="txtName"
                name="name"
                value={this.state.name}
                style={
                  this.infoValid.name
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
                pattern="[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$"
                maxLength={32}
              />
              <span className="warningmsg">{this.infoWarning.name}</span>
            </div>
          </div>
          <div className="form">
            <div className="form-group mt-2">
              <label htmlFor="txtSurname" className="mb-2">
                Pavardė <span className="fieldRequired">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="txtSurname"
                name="surname"
                value={this.state.surname}
                style={
                  this.infoValid.surname
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
                pattern="[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$"
                maxLength={32}
              />
              <span className="warningmsg">{this.infoWarning.surname}</span>
            </div>
          </div>
          <div className="form">
            <div className="form-group mt-2">
              <label htmlFor="txtIdentificationCode" className="mb-2">
                Asmens kodas <span className="fieldRequired">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="txtPersonalCode"
                name="personalCode"
                value={this.state.personalCode}
                style={
                  this.infoValid.personalCode
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
                pattern="[0-9]{11}"
                maxLength={11}
              />
              <span className="warningmsg">
                {this.infoWarning.personalCode}
              </span>
            </div>
          </div>
          <div className="form">
            <div className="form-group mt-2">
              <label htmlFor="txtTelNo" className="mb-2">
                Telefonas <span className="fieldRequired">*</span>
              </label>

              <input
                type="tel"
                className="form-control"
                id="txtTelNo"
                name="phone"
                value={this.state.phone}
                style={
                  this.infoValid.phone
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                placeholder="+370xxxxxxxx"
                required
                pattern="[+]{1}[370]{3}[0-9]{8}"
                maxLength={12}
              ></input>
              <span className="warningmsg2">{this.infoWarning.phone}</span>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-7">
              <label htmlFor="txtAddress" className="marginTopSide">
                Adresas <span className="fieldRequired">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="txtAddress"
                name="address"
                value={this.state.address}
                style={
                  this.infoValid.address
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                maxLength={128}
                pattern="[\s\dA-zÀ-ž-.]{5,64}"
                required
              />
              <span className="warningmsg">{this.infoWarning.address}</span>
            </div>

            <div className="form-group col-5">
              <label htmlFor="txtCity" className="marginTopSide">
                Miestas <span className="fieldRequired">*</span>
              </label>
              <input
                type="text"
                className="form-control mt-2"
                id="txtCity"
                name="city"
                value={this.state.city}
                style={
                  this.infoValid.city
                    ? { border: "1px solid lightgray" }
                    : { border: "2px solid red" }
                }
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                pattern="[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$"
                required
              />
              <span className="warningmsg">{this.infoWarning.city}</span>
            </div>
          </div>
        </div>
      );
    }
  }

  resetState = () => {
    this.setState({
      name: "",
      surname: "",
      birthdate: "",
      personalCode: "",
      address: "",
      city: "",

      phone: "",
      email: "",
    });

    this.infoValid = {
      name: true,
      surname: true,
      personalCode: true,
      address: true,
      city: true,
      phone: true,
      email: true,
    };

    this.infoWarning = {
      name: "",
      surname: "",
      personalCode: "",
      address: "",
      city: "",
      phone: "",
      email: "",
    };
  };

  roleDropdownOnChange(event) {
    event.preventDefault();
    this.setState({
      role: event.target.value,
    });
    this.resetState();
  }

  handleChange(event) {
    const target = event.target;
    AdminCreateUserFormValidator(event, this.infoValid, this.infoWarning);
    inputValidator(event);
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    http
      .post(`${apiEndpoint}/api/users/admin/createuser`, {
        address: this.state.address,
        city: this.state.city,
        email: this.state.email,
        name: this.state.name,
        password: this.state.email,
        personalCode: this.state.personalCode,
        phone: this.state.phone,
        role: this.state.role,
        surname: this.state.surname,
        username: this.state.email,
      })
      .then(() => {
        swal({
          text: "Naujas naudotojas buvo sėkmingai sukurtas.",
          button: "Gerai",
        }).then(() => {
          this.props.history.push("/new");
          this.props.history.replace("/admin");
        });
      })
      .catch((error) => {
        swal({
          text: error.response.data,
          button: "Gerai",
        });
      });
  };

  render() {
    return (
      <div>
        <h6 className="py-3">
          <b>Naujo naudotojo sukūrimas</b>
        </h6>
        <form onSubmit={this.handleSubmit}>
          {this.drawSelector()}
          {this.drawForm(this.state.role)}
          <h6 className="py-3">
            <b>Naudotojo prisijungimai</b>
          </h6>

          <div className="row">
            <div className="col-12">
              <p>
                <b>Naudotojo vardas</b>
              </p>
            </div>
            <div className="col-12">
              <p>{this.state.email}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>
                <b>Slaptažodis</b>
              </p>
            </div>
            <div className="col-12">
              <p>{this.state.email}</p>
            </div>
          </div>
          <div className="row justify-content-between">
            <button
              className="btn btn-outline-danger col-3 ms-3"
              onClick={this.resetState}
              id="btnClean"
            >
              Išvalyti
            </button>
            <button
              type="submit"
              className="btn btn-primary col-3 me-3"
              id="btnCreate"
            >
              Sukurti
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AdminCreateUser);

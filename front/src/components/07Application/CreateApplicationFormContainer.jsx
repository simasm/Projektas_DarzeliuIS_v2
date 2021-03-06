import React, { Component } from "react";
import Select from "react-select";
import { withRouter } from "react-router-dom";

import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";

import inputValidator from "../08CommonComponents/InputValidator";

import "../../App.css";
import "../08CommonComponents/datePickerStyle.css";
import MainGuardianFormValidator from "../08CommonComponents/MainGuardianFormValidator";
import AdditionalGuardianFormValidator from "../08CommonComponents/AdditionalGuardianFormValidator";

registerLocale("lt", lt);

class CreateApplicationFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        username: "",
      },

      additionalGuardian: {
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
        city: "",
      },
      birthdate: "",
      childName: "",
      childPersonalCode: "",
      childSurname: "",

      kindergartenChoises: {
        kindergartenId1: "",
        kindergartenId2: "",
        kindergartenId3: "",
        kindergartenId4: "",
        kindergartenId5: "",
      },
      childInfoWarning: {
        personalID: "",
        name: "",
        surname: "",
        dateOfBirth: "",
      },

      childIdValid: true,

      priorities: {
        childIsAdopted: false,
        familyHasThreeOrMoreChildrenInSchools: false,
        guardianDisability: false,
        guardianInSchool: false,
        livesInVilnius: false,
        livesInVilniusLonger: false,
      },
      kindergartenList: [],
      additionalGuardianInput: false,
      registrationDisabled: false,
      submitState: false,
    };
    this.mainGuardianOnChange = this.mainGuardianOnChange.bind(this);
    this.additionalGuardianOnChange =
      this.additionalGuardianOnChange.bind(this);
    this.childOnChange = this.childOnChange.bind(this);
    this.checkboxOnChange = this.checkboxOnChange.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  mainGuardianValid = {
    name: true,
    surname: true,
    personalCode: true,
    phone: true,
    email: true,
    address: true,
  };

  mainGuardianInfoWarning = {
    name: "",
    surname: "",
    personalCode: "",
    phone: "",
    email: "",
    address: "",
  };

  additionalGuardianValid = {
    name: true,
    surname: true,
    personalCode: true,
    phone: true,
    email: true,
    address: true,
  };

  additionalGuardianInfoWarning = {
    name: "",
    surname: "",
    personalCode: "",
    phone: "",
    email: "",
    address: "",
  };

  handleAdd = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      additionalGuardianInput: !this.state.additionalGuardianInput,
    });

    this.additionalGuardianValid = {
      name: true,
      surname: true,
      personalCode: true,
      phone: true,
      email: true,
      address: true,
    };

    this.additionalGuardianInfoWarning = {
      name: "",
      surname: "",
      personalCode: "",
      phone: "",
      email: "",
      address: "",
    };

    this.setState({
      additionalGuardian: {
        ...this.state.additionalGuardian,
        name: "",
        surname: "",
        personalCode: "",
        phone: "",
        email: "",
        address: "",
        city: "",
      },
    });
  };

  componentDidMount() {
    /** Get registation status */
    http.get(`${apiEndpoint}/api/status`).then((response) => {
      this.setState({
        registrationDisabled: !response.data.registrationActive,
      });
    });

    /** get logged in user data */
    http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => {
        this.setState({
          mainGuardian: {
            ...this.state.mainGuardian,
            name: response.data.name,
            surname: response.data.surname,
            personalCode: response.data.personalCode,
            phone: response.data.phone,
            email: response.data.username,
            address: response.data.address,
            city: response.data.city,
            username: response.data.username,
            role: response.data.role,
          },
        });

        /** get kindergarten list */
        var kindergartenList = [];
        http.get(`${apiEndpoint}/api/darzeliai`).then((response) => {
          kindergartenList = response.data.map((k) => ({
            value: k.id,
            label: k.name + " (" + k.address + ")",
            disabled: "no",
          }));
          this.setState({
            kindergartenList,
          });
        });
      })
      .catch((error) => {
        swal({
          text: "??vyko klaida perduodant duomenis i?? serverio.",
          button: "Gerai",
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.childPersonalCode.length === 11 &&
      this.state.childPersonalCode !== prevState.childPersonalCode
    ) {
      http
        .get(
          apiEndpoint + `/api/registru-centras/${this.state.childPersonalCode}`
        )
        .then((response) => {
          this.setState({
            childName: response.data.name,
            childSurname: response.data.surname,
            birthdate: response.data.dateOfBirth,
            submitState: true,
          });
          this.setState({ childInfoWarning: { personalID: "" } });
          this.setState({ childIdValid: true });
        })
        .catch((error) => {
          this.setState({
            childInfoWarning: {
              personalID: "Tokio asmens kodo registr?? centre n??ra",
            },
          });
          this.setState({ childIdValid: false });

          this.setState({ submitState: false });
        });
    } else if (
      this.state.childPersonalCode.length < 11 &&
      this.state.childPersonalCode !== prevState.childPersonalCode
    ) {
      this.setState({
        childName: "",
        childSurname: "",
        birthdate: "",
        submitState: false,
      });
    }
  }

  /** FORMOS */
  /** Atstovu formos */
  userForm(mainGuardian) {
    if (mainGuardian) {
      return (
        <div className="form">
          <h6 className="formHeader">Atstovas 1</h6>
          <div className="form-group marginTop12">
            <label htmlFor="txtName">
              Vardas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtMainName"
              name="name"
              className="form-control"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.name
              }
              style={
                this.mainGuardianValid.name
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[A-Z??????????????????]{1}[a-zA-Z??-??\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.name}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtSurname">
              Pavard?? <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtMainSurname"
              name="surname"
              className="form-control"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.surname
              }
              style={
                this.mainGuardianValid.surname
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[A-Z??????????????????]{1}[a-zA-Z??-??\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.surname}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtPersonalCode">
              Asmens kodas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtMainPersonalCode"
              name="personalCode"
              className="form-control"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.personalCode
              }
              style={
                this.mainGuardianValid.personalCode
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[0-9]{11}"
              maxLength={11}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.personalCode}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtPhone">
              Telefonas<span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtMainPhone"
              name="phone"
              className="form-control"
              placeholder="+370xxxxxxxx"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.phone
              }
              style={
                this.mainGuardianValid.phone
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[+]{1}[370]{3}[0-9]{8}"
              maxLength={12}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.phone}
            </span>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="txtEmail">
              El. pa??tas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtMainEmail"
              name="email"
              className="form-control"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.email
              }
              style={
                this.mainGuardianValid.email
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              maxLength={64}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.email}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtAddress">
              Adresas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="txtMainAddress"
              name="address"
              value={
                this.state.registrationDisabled
                  ? ""
                  : this.state.mainGuardian.address
              }
              style={
                this.mainGuardianValid.address
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              onChange={this.mainGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={this.state.registrationDisabled}
              required
              pattern="[\s\dA-z??-??-.]{5,64}"
              maxLength={64}
            />
            <span className="warningmsg">
              {this.mainGuardianInfoWarning.address}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="form">
          <div className="row py-1">
            <div className="col-7">
              <h6 className="formHeader">Atstovas 2</h6>
            </div>
            <div className="col-5">
              <button
                id="btnEnableAdditionalGuardian"
                className="btn btn-primary btn-sm btn-block float-end col-12 mb-2"
                onClick={(e) => {
                  this.handleAdd(e);
                }}
                disabled={this.state.registrationDisabled}
              >
                {!this.state.additionalGuardianInput ? "Prid??ti" : "Pa??alinti"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="txtName">
              Vardas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtAdditionalName"
              name="name"
              className="form-control"
              value={this.state.additionalGuardian.name}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.name
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[A-Z??????????????????]{1}[a-zA-Z??-??\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.name}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtSurname">
              Pavard?? <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtAdditionalSurname"
              name="surname"
              className="form-control"
              value={this.state.additionalGuardian.surname}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.surname
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[A-Z??????????????????]{1}[a-zA-Z??-??\s\-']+$"
              maxLength={32}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.surname}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtPersonalCode">
              Asmens kodas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtAdditionalPersonalCode"
              name="personalCode"
              className="form-control"
              value={this.state.additionalGuardian.personalCode}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.personalCode
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[0-9]{11}"
              maxLength={11}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.personalCode}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtAdditionalPhone">
              Telefonas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtAdditionalPhone"
              name="phone"
              className="form-control"
              value={this.state.additionalGuardian.phone}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              placeholder={
                this.state.additionalGuardianInput ? "+370xxxxxxxx" : ""
              }
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.phone
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[+]{1}[370]{3}[0-9]{8}"
              maxLength={12}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.phone}
            </span>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="txtEmail">
              El. pa??tas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              id="txtAdditionalEmail"
              name="email"
              className="form-control"
              value={this.state.additionalGuardian.email}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.email
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
              maxLength={64}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.email}
            </span>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="txtAddress">
              Adresas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="txtAdditionalAddress"
              name="address"
              value={this.state.additionalGuardian.address}
              onChange={this.additionalGuardianOnChange}
              onInvalid={(e) => inputValidator(e)}
              disabled={
                !this.state.additionalGuardianInput ||
                this.state.registrationDisabled
              }
              style={
                this.additionalGuardianValid.address
                  ? { border: "1px solid lightgray" }
                  : { border: "2px solid red" }
              }
              required
              pattern="[\s\dA-z??-??-.]{5,64}"
              maxLength={64}
            />
            <span className="warningmsg">
              {this.additionalGuardianInfoWarning.address}
            </span>
          </div>
        </div>
      );
    }
  }

  /** Vaiko forma */
  childForm() {
    return (
      <div className="form">
        <div className="pb-1">
          <h6 className="formHeader">Vaiko duomenys</h6>
        </div>
        <div className="form-group">
          <label htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCode"
            name="childPersonalCode"
            className="form-control"
            style={
              this.state.childIdValid
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            onChange={(e) => this.childOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={this.state.registrationDisabled}
            required
            maxLength={11}
          />
          <span className="warningmsg">
            {this.state.childInfoWarning.personalID}
          </span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtName">
            Vaiko vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildName"
            name="childName"
            className="form-control"
            value={this.state.childName}
            disabled
            required
            pattern="[A-z??-??]{2,32}"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="txtSurname">
            Vaiko pavard?? <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildSurname"
            name="childSurname"
            className="form-control"
            value={this.state.childSurname}
            disabled
            required
            pattern="[A-z??-??]{2,32}"
          />
        </div>

        {/** Gimimo data */}
        <div className="form-group mt-2">
          <label htmlFor="txtBirthdate">
            Gimimo data <span className="fieldRequired">*</span>
          </label>
          <input
            className="form-control"
            value={this.state.birthdate}
            disabled
          />
        </div>
      </div>
    );
  }

  /** Checkbox forma prioritetams */
  checkboxPriorityForm() {
    return (
      <div className="form">
        <h6 className="formHeader">Vaiko pri??mimo tvarkos prioritetai</h6>
        <p>Pa??ym??kite tinkamus prioritetus</p>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="livesInVilnius"
            id="chkLivesInVilnius"
            checked={this.state.priorities.livesInVilnius}
            onChange={this.checkboxOnChange}
            disabled={this.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="livesInVilnius">
            Vaiko deklaruojama gyvenamoji vieta yra Vilniaus miesto savivaldyb??
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="livesInVilniusLonger"
            id="chkLivesInVilniusLonger"
            checked={
              this.state.priorities.livesInVilniusLonger &&
              this.state.priorities.livesInVilnius
                ? true
                : false
            }
            onChange={this.checkboxOnChange}
            disabled={
              this.state.registrationDisabled ||
              !this.state.priorities.livesInVilnius
            }
          />
          <label className="form-check-label" htmlFor="livesInVilniusLonger">
            Vaiko vieno i?? t??v?? deklaruojama gyvenamoji vieta Vilniaus
            savivaldyb??je yra ne ma??iau nei 2 metai.
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="childIsAdopted"
            id="chkChildIsAdopted"
            checked={this.state.priorities.childIsAdopted}
            onChange={this.checkboxOnChange}
            disabled={this.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="childIsAdopted">
            Vaikas yra ??vaikintas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="familyHasThreeOrMoreChildrenInSchools"
            id="chkFamilyHasThreeOrMoreChildrenInSchools"
            checked={
              this.state.priorities.familyHasThreeOrMoreChildrenInSchools
            }
            onChange={this.checkboxOnChange}
            disabled={this.state.registrationDisabled}
          />
          <label
            className="form-check-label"
            htmlFor="familyHasThreeOrMoreChildrenInSchools"
          >
            ??eima augina (globoja) tris ir daugiau vaik??, kurie mokosi pagal
            bendrojo ugdymo programas
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianInSchool"
            id="chkGuardianInSchool"
            checked={this.state.priorities.guardianInSchool}
            onChange={this.checkboxOnChange}
            disabled={this.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianInSchool">
            Vienas i?? t??v?? (glob??j??) mokosi bendrojo ugdymo mokykloje
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="guardianDisability"
            id="chkGuardianDisability"
            checked={this.state.priorities.guardianDisability}
            onChange={this.checkboxOnChange}
            disabled={this.state.registrationDisabled}
          />
          <label className="form-check-label" htmlFor="guardianDisability">
            Vienas i?? t??v?? (glob??j??) turi ne daugiau kaip 40 procent?? darbingumo
            lygio
          </label>
        </div>
      </div>
    );
  }

  /** Darzeliu sarasas i options formata */
  kindergartenListToSelect(kList, priorityFieldName) {
    var optionsList = kList.map((k) => ({
      value: k.id,
      label: k.name + " (" + k.address + ")",
      name: priorityFieldName,
    }));
    return optionsList;
  }

  /** Darzeliu prioritetu forma */
  kindergartenPriorityForm() {
    return (
      <div className="form">
        <h6 className="formHeader">Dar??eli?? prioritetas</h6>
        <p>
          Pasirinkite dar??eli?? prioritet??, daugiausiai leid??iamos 5 ??staigos.
        </p>

        <div className="form-group">
          <label htmlFor="kindergartenId1">
            1 prioritetas <span className="fieldRequired">*</span>
          </label>
          <span id="selectKindergarten1">
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="kindergartenId1"
              id="selKindergartenId1"
              placeholder="Pasirinkite dar??el?? i?? s??ra??o"
              options={this.state.kindergartenList}
              onChange={(e) => {
                if (
                  e.value !== this.state.kindergartenChoises.kindergartenId1
                ) {
                  const lastIdValue =
                    this.state.kindergartenChoises.kindergartenId1;
                  this.setState({
                    ...this.state,
                    kindergartenChoises: {
                      ...this.state.kindergartenChoises,
                      kindergartenId1: e.value,
                    },
                  });
                  this.state.kindergartenList.forEach((element) => {
                    if (element.value === lastIdValue) {
                      element.disabled = "no";
                    }
                  });
                }
                this.setState({
                  ...this.state,
                  kindergartenChoises: {
                    ...this.state.kindergartenChoises,
                    kindergartenId1: e.value,
                  },
                });
                this.state.kindergartenList.forEach((element) => {
                  if (element.value === e.value) {
                    element.disabled = "yes";
                  }
                });
              }}
              isOptionDisabled={(option) =>
                option.disabled === "yes" || this.state.registrationDisabled
              }
            />
          </span>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="kindergartenId2">2 prioritetas</label>
          <Select
            name="kindergartenId2"
            id="selKindergartenId2"
            placeholder="Pasirinkite dar??el?? i?? s??ra??o"
            options={this.state.kindergartenList}
            onChange={(e) => {
              if (e.value !== this.state.kindergartenChoises.kindergartenId2) {
                const lastIdValue =
                  this.state.kindergartenChoises.kindergartenId2;
                this.setState({
                  ...this.state,
                  kindergartenChoises: {
                    ...this.state.kindergartenChoises,
                    kindergartenId2: e.value,
                  },
                });
                this.state.kindergartenList.forEach((element) => {
                  if (element.value === lastIdValue) {
                    element.disabled = "no";
                  }
                });
              }
              this.setState({
                ...this.state,
                kindergartenChoises: {
                  ...this.state.kindergartenChoises,
                  kindergartenId2: e.value,
                },
              });
              this.state.kindergartenList.forEach((element) => {
                if (element.value === e.value) {
                  element.disabled = "yes";
                }
              });
            }}
            isOptionDisabled={(option) =>
              option.disabled === "yes" || this.state.registrationDisabled
            }
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="kindergartenId3">3 prioritetas</label>
          <Select
            name="kindergartenId3"
            id="selKindergartenId3"
            placeholder="Pasirinkite dar??el?? i?? s??ra??o"
            options={this.state.kindergartenList}
            onChange={(e) => {
              if (e.value !== this.state.kindergartenChoises.kindergartenId3) {
                const lastIdValue =
                  this.state.kindergartenChoises.kindergartenId3;
                this.setState({
                  ...this.state,
                  kindergartenChoises: {
                    ...this.state.kindergartenChoises,
                    kindergartenId3: e.value,
                  },
                });
                this.state.kindergartenList.forEach((element) => {
                  if (element.value === lastIdValue) {
                    element.disabled = "no";
                  }
                });
              }
              this.setState({
                ...this.state,
                kindergartenChoises: {
                  ...this.state.kindergartenChoises,
                  kindergartenId3: e.value,
                },
              });
              this.state.kindergartenList.forEach((element) => {
                if (element.value === e.value) {
                  element.disabled = "yes";
                }
              });
            }}
            isOptionDisabled={(option) =>
              option.disabled === "yes" || this.state.registrationDisabled
            }
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="kindergartenId4">4 prioritetas</label>
          <Select
            name="kindergartenId4"
            id="selKindergartenId4"
            placeholder="Pasirinkite dar??el?? i?? s??ra??o"
            options={this.state.kindergartenList}
            onChange={(e) => {
              if (e.value !== this.state.kindergartenChoises.kindergartenId4) {
                const lastIdValue =
                  this.state.kindergartenChoises.kindergartenId4;
                this.setState({
                  ...this.state,
                  kindergartenChoises: {
                    ...this.state.kindergartenChoises,
                    kindergartenId4: e.value,
                  },
                });
                this.state.kindergartenList.forEach((element) => {
                  if (element.value === lastIdValue) {
                    element.disabled = "no";
                  }
                });
              }
              this.setState({
                ...this.state,
                kindergartenChoises: {
                  ...this.state.kindergartenChoises,
                  kindergartenId4: e.value,
                },
              });
              this.state.kindergartenList.forEach((element) => {
                if (element.value === e.value) {
                  element.disabled = "yes";
                }
              });
            }}
            isOptionDisabled={(option) =>
              option.disabled === "yes" || this.state.registrationDisabled
            }
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="kindergartenId5">5 prioritetas</label>
          <Select
            name="kindergartenId5"
            id="selKindergartenId5"
            placeholder="Pasirinkite dar??el?? i?? s??ra??o"
            options={this.state.kindergartenList}
            onChange={(e) => {
              if (e.value !== this.state.kindergartenChoises.kindergartenId5) {
                const lastIdValue =
                  this.state.kindergartenChoises.kindergartenId5;
                this.setState({
                  ...this.state,
                  kindergartenChoises: {
                    ...this.state.kindergartenChoises,
                    kindergartenId5: e.value,
                  },
                });
                this.state.kindergartenList.forEach((element) => {
                  if (element.value === lastIdValue) {
                    element.disabled = "no";
                  }
                });
              }
              this.setState({
                ...this.state,
                kindergartenChoises: {
                  ...this.state.kindergartenChoises,
                  kindergartenId5: e.value,
                },
              });
              this.state.kindergartenList.forEach((element) => {
                if (element.value === e.value) {
                  element.disabled = "yes";
                }
              });
            }}
            isOptionDisabled={(option) =>
              option.disabled === "yes" || this.state.registrationDisabled
            }
          />
        </div>
      </div>
    );
  }

  /** Pagrindinio atstovo formos onChange */
  mainGuardianOnChange(e) {
    inputValidator(e);
    MainGuardianFormValidator(
      e,
      this.mainGuardianValid,
      this.mainGuardianInfoWarning
    );

    this.setState({
      mainGuardian: {
        ...this.state.mainGuardian,
        [e.target.name]: e.target.value,
      },
    });
  }

  /** Antro atstovo formos onChange */
  additionalGuardianOnChange(e) {
    inputValidator(e);
    AdditionalGuardianFormValidator(
      e,
      this.additionalGuardianValid,
      this.additionalGuardianInfoWarning
    );
    this.setState({
      additionalGuardian: {
        ...this.state.additionalGuardian,
        [e.target.name]: e.target.value,
      },
    });
  }

  /** Vaiko formos onChange */
  childOnChange(e) {
    if (!e.target.value.match(/[0-9]{11}/)) {
      this.setState({
        childInfoWarning: { personalID: "Neteisingas asmens kodo formatas" },
      });

      this.setState({ childIdValid: false });
    } else {
      this.setState({ childInfoWarning: { personalID: "" } });
      this.setState({ childIdValid: true });
    }
    this.setState({ childPersonalCode: e.target.value });
  }

  /** Checkbox onChange */
  checkboxOnChange(e) {
    this.setState({
      priorities: {
        ...this.state.priorities,
        [e.target.name]: e.target.checked,
      },
    });

    if (this.state.priorities.livesInVilnius !== false) {
      this.setState({
        livesInVilniusLonger: true,
      });
    }
  }

  /** Handle submit */
  submitHandle(e) {
    e.preventDefault();

    const data = {
      additionalGuardian: this.state.additionalGuardian,
      birthdate: this.state.birthdate,
      childName: this.state.childName,
      childPersonalCode: this.state.childPersonalCode,
      childSurname: this.state.childSurname,
      kindergartenChoises: this.state.kindergartenChoises,
      mainGuardian: this.state.mainGuardian,
      priorities: this.state.priorities,
    };

    if (!this.state.kindergartenChoises.kindergartenId1) {
      swal({
        title: "??vyko klaida",
        text: "1 Prioritetas yra privalomas",
      });
    } else {
      http
        .post(`${apiEndpoint}/api/prasymai/user/new`, data)
        .then((response) => {
          //console.log(response);
          swal({
            text: response.data,
            button: "Gerai",
          });

          this.props.history.push("/prasymai");
        })
        .catch((error) => {
          swal({
            text: "??vyko klaida. " + error.response.data,
            button: "Gerai",
          });
        });
    }
  }

  drawMessageRegistrationNotAvailable(status) {
    if (status) {
      return (
        <div className="alert alert-warning p-1" role="alert">
          ??iuo metu registracija nevykdoma
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container pt-4">
        <div>
          <h6 className="pl-5 pt-3">Pra??ymas d??l registracijos</h6>
        </div>
        {this.drawMessageRegistrationNotAvailable(
          this.state.registrationDisabled
        )}
        <div className="form">
          <form onSubmit={this.submitHandle}>
            <div className="row">
              <div className="col-4">
                {
                  /** Vaiko forma */
                  this.childForm()
                }
              </div>

              <div className="col-4">
                {
                  /** Atstovas 1 */
                  this.userForm(true)
                }
              </div>

              <div className="col-4">
                {
                  /** Atstovas 2 */
                  this.userForm(false)
                }
              </div>
            </div>
            <div className="row">
              <div className="col-12">{this.checkboxPriorityForm()}</div>

              <div className="col-7">
                <div className="">{this.kindergartenPriorityForm()}</div>

                <p className="mt-2">
                  D??mesio! Jei pirmu numeriu nurodytoje ??staigoje n??ra laisv??
                  viet??, vieta skiriama antru numeriu pa??ym??toje ??staigoje, jei
                  joje yra laisv?? viet?? ir t. t. Jeigu visuose pra??yme
                  pa??ym??tose ??staigose n??ra laisv?? viet??, pra??ymas lieka
                  laukian??i??j?? eil??je.
                </p>

                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={
                    this.state.registrationDisabled || !this.state.submitState
                  }
                >
                  Sukurti pra??ym??
                </button>
                <div>
                  <span id="submitWarning" className="mt-2"></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateApplicationFormContainer);

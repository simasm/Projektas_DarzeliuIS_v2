import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";
import { EsriProvider } from "leaflet-geosearch";
import KindergartenInputFormValidator from "../08CommonComponents/KindergartenInputFormValidator";

function KindergartenInputForm() {
  const initKindergartenData = {
    address: "",
    coordinates: "",
    capacityAgeGroup2to3: 0,
    capacityAgeGroup3to6: 0,
    elderate: "",
    id: "",
    name: "",
    directorName: "",
    directorSurname: "",
  };

  const [infoValid, setInfoValid] = useState({
    address: true,
    id: true,
    name: true,
    directorName: true,
    directorSurname: true,
    elderate: true,
    capacityAgeGroup2to3: true,
    capacityAgeGroup3to6: true,
  });

  const [infoWarning, setInfoWarning] = useState({
    address: "",
    id: "",
    name: "",
    directorName: "",
    directorSurname: "",
    elderate: "",
    capacityAgeGroup2to3: "",
    capacityAgeGroup3to6: "",
  });

  const provider = new EsriProvider();
  const isInitialMount = useRef(true);

  var savingStatus = false;

  const [data, setData] = useState(initKindergartenData);
  const [elderates, setElderate] = useState([]);

  const history = useHistory();

  const getKindergartenCoordinates = async () => {
    const coords = await provider.search({ query: data.address + ", Vilnius" });
    setData({ ...data, coordinates: `${coords[0].y},${coords[0].x}` });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      http
        .post(`${apiEndpoint}/api/darzeliai/manager/createKindergarten`, data)
        .then((response) => {
          swal({
            text: "Darželis sekmingai pridėtas",
            button: "Gerai",
          });
          resetForm();
        })
        .catch((error) => {
          swal({
            text: "Darželio pridėti nepavyko",
            button: "Gerai",
          });
          resetForm();
        });
    }
  }, [data.coordinates]);

  const handleSubmit = (event) => {
    event.preventDefault();

    savingStatus = true;

    getKindergartenCoordinates().then(() => {
      savingStatus = false;
      history.push("/new");
      history.replace("/darzeliai");
    });
  };

  useEffect(() => {
    http
      .get(`${apiEndpoint}/api/darzeliai/manager/elderates`)
      .then((response) => {
        setElderate(response.data);
      })
      .catch((error) => {
        swal({
          text: "Įvyko klaida nuskaitant seniūnijas. " + error.response.data,
          button: "Gerai",
        });
      });
  }, [setElderate]);

  const validateField = (event) => {
    const target = event.target;

    if (target.validity.valueMissing) {
      if (target.id === "elderate") {
        target.setCustomValidity("Reikia pasirinkti seniūniją");
      } else target.setCustomValidity("Būtina užpildyti šį laukelį");
    } else if (target.validity.patternMismatch) {
      if (target.id === "id")
        target.setCustomValidity("Įstaigos kodą turi sudaryti 9 skaitmenys");
      if (target.id === "name")
        target.setCustomValidity(
          "Pavadinimas turi būti 3-50 simbolių ir negali prasidėti tarpu"
        );
      if (target.id === "directorName" || target.id === "directorName")
        target.setCustomValidity(
          "Direktoriaus vardas ir pavardė turi būti iki 32 simbolių. Pirmoji žodžio raidė - didžioji."
        );
    } else if (
      target.validity.rangeUnderflow ||
      target.validity.rangeOverflow
    ) {
      target.setCustomValidity("Negali būti mažiau nei 0 ir daugiau nei 999");
    } else {
      target.setCustomValidity("");
    }
  };

  const handleChange = (event) => {
    validateField(event);

    KindergartenInputFormValidator(
      event,
      infoValid,
      infoWarning,
      setInfoValid,
      setInfoWarning
    );

    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setData(initKindergartenData);
    setInfoValid({
      address: true,
      id: true,
      name: true,
      directorName: true,
      directorSurname: true,
    });
    setInfoWarning({
      address: "",
      id: "",
      name: "",
      directorName: "",
      directorSurname: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h6 className="py-3">
          <b>Pridėti naują darželį </b>
        </h6>
        <div className="form-group">
          <label htmlFor="id">
            Įstaigos kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            name="id"
            id="id"
            value={data.id}
            onChange={handleChange}
            onInvalid={validateField}
            style={
              infoValid.id
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            required
            pattern="^\d{9}$"
            maxLength={9}
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite įstaigos (darželio) kodą (9 skaitmenys)"
          />
          <span className="warningmsg">{infoWarning.id}</span>
        </div>

        <div className="form-group">
          <label htmlFor="name" className="marginTopSide">
            Pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            name="name"
            id="name"
            value={data.name}
            onChange={handleChange}
            onInvalid={validateField}
            style={
              infoValid.name
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            required
            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,64}$"
            maxLength={50}
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio pavadinimą (nuo 3 iki 50 simbolių)"
          />
          <span className="warningmsg">{infoWarning.name}</span>
        </div>

        <div className="form-group">
          <label htmlFor="address" className="marginTopSide">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            name="address"
            id="address"
            value={data.address}
            onChange={handleChange}
            onInvalid={validateField}
            style={
              infoValid.address
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite darželio adresą"
            pattern="[A-ZĄ-Ž]{1}[\S\s]{1,64}$"
            maxLength={128}
          />
          <span className="warningmsg">{infoWarning.address}</span>
        </div>

        <div className="form-group">
          <label htmlFor="elderate" className="marginTopSide">
            Seniūnija <span className="fieldRequired">*</span>
          </label>
          <select
            type="text"
            className="form-control mt-2"
            name="elderate"
            id="elderate"
            value={data.elderate}
            onChange={handleChange}
            onInvalid={validateField}
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Pasirinkite seniūniją, kuriai priskiriamas darželis"
          >
            <option value="" disabled hidden label="Pasirinkite" />
            {elderates.map((option) => (
              <option value={option} label={option} key={option} />
            ))}
          </select>
        </div>

        <h6 className="py-3">
          <b>Direktorius</b>
        </h6>
        <div className="form-group">
          <label htmlFor="directorName">
            Vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            name="directorName"
            id="directorName"
            value={data.directorName}
            onChange={handleChange}
            onInvalid={validateField}
            style={
              infoValid.directorName
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,32}$"
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite direktoriaus vardą"
            maxLength={32}
          />
          <span className="warningmsg">{infoWarning.directorName}</span>
        </div>
        <div className="form-group">
          <label htmlFor="directorSurname" className="marginTopSide">
            Pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control mt-2"
            name="directorSurname"
            id="directorSurname"
            value={data.directorSurname}
            onChange={handleChange}
            onInvalid={validateField}
            style={
              infoValid.directorSurname
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            pattern="^[A-ZĄ-Ž]{1}[\S\s]{1,32}$"
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite direktoriaus pavardę"
            maxLength={32}
          />
          <span className="warningmsg">{infoWarning.directorSurname}</span>
        </div>

        <h6 className="py-3">
          <b>Laisvų vietų skaičius </b>
          <span className="fieldRequired">*</span>
        </h6>
        <div className="form-group">
          <label htmlFor="capacityAgeGroup2to3">2-3 metų grupėse</label>
          <input
            type="number"
            min="0"
            max="999"
            className="form-control mt-2"
            name="capacityAgeGroup2to3"
            id="capacityAgeGroup2to3"
            value={data.capacityAgeGroup2to3}
            onChange={handleChange}
            onInvalid={validateField}
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite 2-3 metų amžiaus grupėse esančių vietų skaičių"
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacityAgeGroup3to6" className="marginTopSide">
            3-6 metų grupėse
          </label>
          <input
            type="number"
            min="0"
            max="999"
            className="form-control mt-2"
            name="capacityAgeGroup3to6"
            id="capacityAgeGroup3to6"
            value={data.capacityAgeGroup3to6}
            onChange={handleChange}
            onInvalid={validateField}
            required
            data-toggle="tooltip"
            data-placement="top"
            title="Įveskite 2-3 metų amžiaus grupėse esančių vietų skaičių"
          />
        </div>
        <div className="d-grid gap-2 d-md-flex marginTopSide col-12">
          <button
            onClick={() => resetForm()}
            className="btn btn-outline-danger form-group float-start"
            id="btnClearKindergartenForm"
          >
            Išvalyti
          </button>
          <button
            type="submit"
            className="btn btn-primary form-group float-end"
            id="btnSaveKindergarten"
            disabled={savingStatus}
          >
            {savingStatus ? "Pridedama..." : "Pridėti"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default KindergartenInputForm;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import apiEndpoint from "../10Services/endpoint";
import InputValidator from "../08CommonComponents/InputValidator";

export default function ChildInfoForm({ setChildDTO, setIdLength }) {
  // /api/registru-centras/51609260036
  // 51609260036

  const [childId, setChildId] = useState("");
  const [childData, setChildData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
  });

  const applyRedBorder = (e) => {
    const fieldId = e.target.id;
    const spanId = fieldId + "Warning";

    const span = document.getElementById(spanId);

    const field = document.getElementById(fieldId);

    if (span.textContent !== "") {
      field.setAttribute("class", "form-control redborder");
    } else {
      field.setAttribute("class", "form-control");
    }
  };

  const handleOnChange = (e) => {
    setChildId(e.target.value);
    setIdLength(e.target.value.length);
    InputValidator(e);
    applyRedBorder(e);
  };

  useEffect(() => {
    const warningmsg = document.getElementById(
      "txtChildPersonalCodeCompensationWarning"
    );
    const field = document.getElementById("txtChildPersonalCodeCompensation");

    async function load() {
      try {
        const childDataResponse = await axios.get(
          apiEndpoint + `/api/registru-centras/${childId}`
        );
        setChildData(childDataResponse.data);
        setChildDTO(childDataResponse.data);
        warningmsg.textContent = "";
      } catch (error) {
        if (error.response.status >= 400) {
          warningmsg.textContent = `Toks asmens kodas registrų centre neegzistuoja.`;
          field.setAttribute("class", "form-control redborder");
        }
      }
    }

    if (childId.length !== 11) {
      setChildData({ name: "", surname: "", dateOfBirth: "" });
    } else {
      load();
    }
  }, [childId]);

  return (
    <div className="container">
      <div className="form">
        <div className="pb-1">
          <h6 className="formHeader">Vaiko duomenys</h6>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="txtPersonalCodeCompensation">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCodeCompensation"
            name="childPersonalCodeCompensation"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            maxLength={11}
            required
            pattern="[0-9]{11}"
          />
          <span
            id="txtChildPersonalCodeCompensationWarning"
            className="warningmsg"
          ></span>
        </div>

        <div className="form-group mt-2">
          <label htmlFor="txtNameCompensation">
            Vaiko vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildNameCompensation"
            name="childNameCompensation"
            className="form-control "
            disabled
            pattern="[A-zÀ-ž]{2,32}"
            value={childData.name}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="txtSurnameCompensation">
            Vaiko pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildSurnameCompensation"
            name="childSurnameCompensation"
            className="form-control"
            value={childData.surname}
            disabled
            pattern="[A-zÀ-ž]{2,32}"
          />
        </div>

        {/** Gimimo data */}
        <div className="form-group mt-2">
          <label htmlFor="txtBirthdateCompensation">
            Gimimo data <span className="fieldRequired">*</span>
          </label>
          <DatePicker
            className="form-control "
            locale="lt"
            dateFormat="yyyy/MM/dd"
            disabled
            value={childData.dateOfBirth}
          />
        </div>
      </div>
    </div>
  );
}

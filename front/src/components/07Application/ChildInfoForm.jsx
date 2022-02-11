import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import apiEndpoint from "../10Services/endpoint";
import ChildInfoFormValidator from "../08CommonComponents/ChildInfoFormValidator";

export default function ChildInfoForm({
  setChildDTO,
  setIdLength,
  childInfoValid,
  setChildInfoValid,
}) {
  // /api/registru-centras/51609260036
  // 51609260036
  // 51609260189

  const [childInfoWarning, setChildInfoWarning] = useState({
    personalID: "",
    name: "",
    surname: "",
    dateOfBirth: "",
  });

  const [childId, setChildId] = useState("");
  const [childData, setChildData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
  });

  const handleOnChange = (e) => {
    setChildId(e.target.value);
    setIdLength(e.target.value.length);
    ChildInfoFormValidator(
      e,
      setChildInfoWarning,
      childInfoWarning,
      setChildInfoValid,
      childInfoValid
    );
  };

  useEffect(() => {
    async function load() {
      try {
        const childDataResponse = await axios.get(
          apiEndpoint + `/api/registru-centras/${childId}`
        );
        setChildData(childDataResponse.data);
        setChildDTO(childDataResponse.data);
        setChildInfoWarning({ ...childInfoWarning, personalID: "" });
      } catch (error) {
        if (error.response.status >= 400) {
          setChildInfoValid({ ...childInfoValid, personalID: false });
          setChildInfoWarning({
            ...childInfoWarning,
            personalID: "Tokio asmens kodo registrų centre nėra",
          });
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
        <div className="form-group marginTop10">
          <label htmlFor="txtPersonalCodeCompensation">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCodeCompensation"
            name="childPersonalCodeCompensation"
            placeholder="31234567890"
            className="form-control"
            onChange={(e) => handleOnChange(e)}
            maxLength={11}
            style={
              childInfoValid.personalID
                ? { border: "1px solid lightgray" }
                : { border: "2px solid red" }
            }
            required
          />
          <span className="warningmsg">{childInfoWarning.personalID}</span>
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

import React, { useEffect, useState } from "react";

//import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import apiEndpoint from "../10Services/endpoint";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import "./../../App.css";

const ManagerCompensations = () => {
  const { compState, setCompState } = React.useContext(
    ManagerCompesationContext
  );

  const [compensations, setCompensations] = useState([]);

  useEffect(() => {
    axios
      .get(apiEndpoint + `/api/kompensacija/manager`)
      .then((response) => {
        setCompensations(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        swal({
          text:
            "Įvyko klaida nuskaitant visus kompensacijų prašymus. " +
            error.response.data,
          button: "Gerai",
        });
      });
  }, [setCompensations]);

  const spawnReview = (id) => {
    let kompensacija = compensations.filter((comp) => comp.id === id);
    setCompState(kompensacija);
  };

  const printRef = React.useRef();

  const handleDownloadPdf = async (id) => {
    let kompensacija = compensations.filter((comp) => comp.id === id);
    setCompState(kompensacija);
  };

  return (
    <div className="container pt-4">
      <h6 className="pl-2 pt-3">Prašymai dėl kompensacijos</h6>
      <div className="row pt-2">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "18%" }}>Vaiko vardas</th>
                <th style={{ width: "18%" }}>Vaiko pavardė</th>
                <th style={{ width: "18%" }}>Pateikimo data</th>
                <th style={{ width: "46%" }}></th>
              </tr>
            </thead>
            <tbody>
              {/* onClick={() => spawnReview(item.id)} */}
              {compensations.map((item) => (
                <tr key={item.id}>
                  <td className="table-style">{item.childName}</td>
                  <td className="table-style">{item.childSurname}</td>
                  <td className="table-style">{item.submittedAt}</td>
                  <td style={{ textAlign: "right" }}>
                    <Link
                      className="text-decoration-none px-2"
                      onClick={() => spawnReview(item.id)}
                      type="button"
                      to={`/kompensacijos/${item.id}`}
                    >
                      <button className="btn btn-outline-secondary">
                        Peržiūrėti
                      </button>
                    </Link>

                    <Link
                      className="text-decoration-none px-2"
                      onClick={() => handleDownloadPdf(item.id)}
                      type="button"
                      to={`/download_kompensacijos/${item.id}`}
                    >
                      <button className="btn btn-outline-secondary">
                        Atsisiųsti
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerCompensations;

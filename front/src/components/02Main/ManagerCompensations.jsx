import React, { useEffect, useState } from "react";

//import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

import apiEndpoint from "../10Services/endpoint";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import "./../../App.css";
import Pagination from "../08CommonComponents/Pagination";

const ManagerCompensations = () => {
  const { compState, setCompState } = React.useContext(
    ManagerCompesationContext
  );

  const [compensations, setCompensations] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  const [pageState, setPagestate] = useState({
    pageSize: 10,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    numberOfElements: 0,
  });

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get(
        apiEndpoint +
        `/api/kompensacija/manager/page?page=${currentPage}&size=${pageState.pageSize}`
      )
      .then((response) => {
        console.log(JSON.stringify(response));
        setCompensations(response.data.content);
        setPagestate({
          ...pageState,
          currentPage: response.data.number + 1,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
        });
      })
      .catch((error) => {
        swal({
          text:
            "Įvyko klaida nuskaitant visus kompensacijų prašymus. " +
            JSON.stringify(error),
          button: "Gerai",
        });
      });
  }, [currentPage, shouldReload]);

  const spawnReview = (id) => {
    let kompensacija = compensations.filter((comp) => comp.id === id);
    setCompState(kompensacija);
  };

  const handleEntryDelete = (childPersonalCode) => {
    swal({
      text: "Ar tikrai norite ištrinti šį kompensacijos prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        axios
          .delete(apiEndpoint +
            `/api/kompensacija/manager/delete/${childPersonalCode}`)
          .then((response) => {
            swal({
              text: "Kompensacijos prašymas ištrintas",
              button: "Gerai",
            });
            setShouldReload(!shouldReload);
          })
          .catch(() => {});
      }
    });
  }

  const handleDownloadPdf = async (id) => {
    let kompensacija = compensations.filter((comp) => comp.id === id);
    setCompState(kompensacija);
  };

  const handlePageChange = (page) => {
    setPagestate({ ...pageState, currentPage: page });
    setCurrentPage(page - 1);
  };

  return (
    <div>
      <div class="container pt-4">
        <h6 className="pl-2 pt-3">Prašymai dėl kompensacijos</h6>
        <div class="row pt-2">
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
                        <button id="btnReviewCompensations" className="btn btn-outline-secondary">
                          Peržiūrėti
                        </button>
                      </Link>

                      <button id="btnDeleteCompensation" onClick={() => handleEntryDelete(item.childPersonalCode)} className="btn btn-outline-danger px-2">
                        Ištrinti
                      </button>

                      <Link
                        className="text-decoration-none px-2"
                        onClick={() => handleDownloadPdf(item.id)}
                        type="button"
                        to={`/download_kompensacijos/${item.id}`}
                      >
                        <button id="btnDownloadCompensations" className="btn btn-outline-secondary">
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

      <div className="d-flex justify-content-center">
        <Pagination
          itemsCount={pageState.totalElements}
          pageSize={pageState.pageSize}
          onPageChange={handlePageChange}
          currentPage={pageState.currentPage}
        />
      </div>
    </div>
  );
};

export default ManagerCompensations;
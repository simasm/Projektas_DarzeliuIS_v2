import React, { useEffect, useState } from "react";

import apiEndpoint from "../10Services/endpoint";
import http from "../10Services/httpService";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import "./../../App.css";
import Pagination from "../08CommonComponents/Pagination";

const ManagerCompensations = () => {
  const { setCompState } = React.useContext(ManagerCompesationContext);

  const [compensations, setCompensations] = useState([]);
  const [shouldReload] = useState(false);

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

  const handleDownloadPdf = async (item) => {
    // let kompensacija = compensations.filter((comp) => comp.id === id);
    // setCompState(kompensacija);
    http
      .request({
        url: `${apiEndpoint}/api/pdfgeneration/manager/${item.id}`,
        method: "GET",
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${item.childName}` +
            ` ${item.childSurname}` +
            " - prašymas dėl kompensacijos.pdf"
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        swal({
          text: `Įvyko klaida atsisiunčiant ${item.childName} 
            ${item.childSurname} kompensacijos prašymą.`,
          buttons: "Gerai",
        });
      });
  };

  const handlePageChange = (page) => {
    setPagestate({ ...pageState, currentPage: page });
    setCurrentPage(page - 1);
  };

  return (
    <div>
      <div className="container pt-4">
        <div className="pl-2 pt-3">
          {/* <Link to="/" className="nounderlinelink">
            Pradinis puslapis
          </Link>
          &nbsp; &gt; &nbsp; */}
          <h6>Prašymai dėl kompensacijos</h6>
        </div>
        <div className="row pt-5 ">
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
                        <button
                          id="btnReviewCompensations"
                          className="btn btn-outline-primary"
                        >
                          Peržiūrėti
                        </button>
                      </Link>
                      <button
                        id="btnDownloadCompensations"
                        className="btn btn-outline-primary"
                        onClick={() => handleDownloadPdf(item)}
                      >
                        Atsisiųsti
                      </button>
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

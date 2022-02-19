import React, { useState, useEffect } from "react";
import SubmittedDocumentsListTable from "./SubmittedDocumentsListTable";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";
import Pagination from "../08CommonComponents/Pagination";

function SubmittedDocsContainer() {
  const [docs, setDocs] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getDocuments(currentPage);
  }, []);

  const getDocuments = (currentPage) => {
    let page = currentPage - 1;

    if (page < 0) page = 0;

    var uri = `${apiEndpoint}/api/documents/page?page=${page}&size=${pageSize}`;

    http
      .get(uri)
      .then((response) => {
        console.log(response.data);
        setDocs(response.data.content);
        setTotalElements(response.data.totalElements);
        setCurrentPage(response.data.number + 1);
      })
      .catch((error) => {
        alert({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai",
        });
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getDocuments(page);
  };

  const handleDelete = (document) => {
    swal({
      text: "Ar tikrai norite ištrinti pažymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http
          .delete(`${apiEndpoint}/api/documents/delete/${document.id}`)
          .then((response) => {
            getDocuments(currentPage);
            swal({
              text: "Pažyma buvo sėkmingai ištrinta",
              button: "Gerai",
            });
          })
          .catch((error) => {
            //console.log(error);
            swal({
              text: "Įvyko klaida",
              button: "Gerai",
            });
          });
      }
    });
  };

  const handleDownload = (doc) => {
    http
      .request({
        url: `${apiEndpoint}/api/documents/get/${doc.id}`,
        method: "GET",
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${doc.name}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        swal({
          text: "Įvyko klaida atsisiunčiant pažymą.",
          buttons: "Gerai",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h6 className="py-3">
            <b>Visos pažymos</b>
          </h6>
        </div>
      </div>

      <div className="row formHeader">
        <div className="col-6">
          {
            //**UserDocumentList */
            <SubmittedDocumentsListTable
              documents={docs}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          }
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={totalElements}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default SubmittedDocsContainer;

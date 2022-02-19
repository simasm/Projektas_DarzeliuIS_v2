import React, { useState, useEffect } from "react";
import SubmittedDocumentsListTable from "./SubmittedDocumentsListTable";
import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";
import swal from "sweetalert";

function SubmittedDocsContainer() {
  const [documentList, setDocumentList] = useState([]);

  const mapDocumentsToViewmodel = (docList) => {
    const docViewmodelList = docList.map((document) => ({
      id: document.documentId,
      uploaderName: document.uploaderName,
      uploaderSurname: document.uploaderSurname,
      docName: document.name,
      uploadDate: document.uploadDate,
    }));
    return docViewmodelList;
  };

  const getDocuments = () => {
    http
      .get(`${apiEndpoint}/api/documents/documents/all`)
      .then((response) => {
        console.log(response.data);
        setDocumentList(response.data);
      })
      .catch((error) => {
        alert({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai",
        });
      });
  };

  useEffect(() => {
    getDocuments();
    console.log(documentList);
  }, []);

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
            getDocuments();
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
        //console.log(error);
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
            <b>VISOS PAZYMOS</b>
          </h6>
        </div>
      </div>

      <div className="row formHeader">
        <div className="col-6">
          {
            //**UserDocumentList */
            <SubmittedDocumentsListTable
              documents={documentList}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default SubmittedDocsContainer;

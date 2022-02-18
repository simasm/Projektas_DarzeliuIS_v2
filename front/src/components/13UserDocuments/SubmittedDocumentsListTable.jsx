import React from "react";
import Table from "../08CommonComponents/Table";

export default function SubmittedDocumentsListTable({
  documents,
  onDelete,
  onDownload,
}) {
  const columns = [
    {
      key: "uploaderName",
      label: "Vardas",
      content: (document) => <span>{document.uploaderName}</span>,
    },
    {
      key: "uploaderSurname",
      label: "Pavardė",
      content: (document) => <span>{document.uploaderSurname}</span>,
    },
    {
      key: "name",
      label: "Pavadinimas",
      content: (document) => <span>{document.docName}</span>,
    },
    {
      key: "uploadDate",
      label: "Data",
      content: (document) => <span>{document.uploadDate}</span>,
    },

    {
      key: "download",
      label: "",
      content: (document) => (
        <button
          className="btn btn-primary btn-sm btn-block"
          onClick={() => onDownload(document)}
        >
          Atsisiųsti
        </button>
      ),
    },
    {
      key: "delete",
      label: "",
      content: (document) => (
        <button
          className="btn btn-outline-danger btn-sm btn-block"
          onClick={() => onDelete(document)}
        >
          Ištrinti
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={documents} />;
}

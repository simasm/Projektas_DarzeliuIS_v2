import React, { Component } from "react";
import "../../App.css";
import swal from "sweetalert";
import Swal from "sweetalert2";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

import UserApplicationsTable from "./UserApplicationsTable";

export class UserHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedApplications: [],
      registrationStatus: false,
      applications: [],
      userData: null,
    };
  }
  componentDidMount() {
    this.getUserApplications();
    this.getRegistrationStatus();
    this.getUserInfo();
    this.getUserApprovedApplications();
  }

  getUserApprovedApplications() {
    http
      .get(`${apiEndpoint}/api/prasymai/user_with_personal_code`)
      .then((response) => {
        this.setState({ approvedApplications: response.data });
      })
      .catch(() => {});
  }

  getUserApplications() {
    http
      .get(`${apiEndpoint}/api/prasymai/user`)
      .then((response) => {
        this.setState({ applications: response.data });
      })
      .catch(() => {});
  }
  getUserInfo() {
    http
      .get(`${apiEndpoint}/api/users/user`)
      .then((response) => {
        this.setState({ userData: response.data });
      })
      .catch(() => {});
  }
  getRegistrationStatus() {
    http
      .get(`${apiEndpoint}/api/status`)
      .then((response) => {
        this.setState({
          registrationStatus: response.data.registrationActive,
        });
      })
      .catch(() => {});
  }

  handleDownload = async (item) => {
    const table =
      '<div class="table-responsive-md">' +
      '<table class="table table-bordered">' +
      '<thead class="">' +
      "<tr>" +
      '<th scope="col" colspan=2>Vaiko atstovo duomeys</th>' +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "<tr> " +
      `<td class="text-start">Asmens kodas</td><td class="text-start">${this.state.userData.personalCode}</td>` +
      "</tr>" +
      "<tr> " +
      `<td class="text-start">Vardas</td><td class="text-start">${this.state.userData.name}</td>` +
      "</tr>" +
      "<tr> " +
      `<td class="text-start">Pavardė</td><td class="text-start">${this.state.userData.surname}</td>` +
      "</tr>" +
      "<tr> " +
      `<td class="text-start">Adresas</td><td class="text-start">${this.state.userData.address}, ${this.state.userData.city}</td>` +
      "</tr>" +
      "<tr> " +
      `<td class="text-start">Telefono numeris</td><td class="text-start">${this.state.userData.phone}</td>` +
      "</tr>" +
      "<tr> " +
      `<td class="text-start">El. paštas</td><td class="text-start">${this.state.userData.email}</td>` +
      "</tr>" +
      "</tbody>" +
      "</table>" +
      "</div>";

    const swal2 = Swal.mixin({
      customClass: { confirmButton: "btn btn-primary btn-lg" },
    });

    const { value: accept } = await swal2.fire({
      //  confirmButtonClass: "btn btn-primary btn-lg disabled",
      title: "Asmens duomenų patvirtinimas",
      input: "checkbox",
      inputValue: 0,
      showCloseButton: true,
      html: table,
      confirmButtonColor: "#0d6efd",
      inputPlaceholder: "Patvirtinu, kad duomenys teisingi",
      confirmButtonText: "Atsisiųsti sutartį",

      didOpen: function () {
        swal2.disableButtons();
        swal2.getInput().addEventListener("change", function (e) {
          if (!e.target.checked) {
            swal2.disableButtons();
          } else {
            swal2.enableButtons();
          }
        });
      },
    });

    if (accept) {
      // http
      // .get(`${apiEndpoint}/api/pdfgeneration/${item.id}`)
      http
        .request({
          url: `${apiEndpoint}/api/pdfgeneration/${item.id}`,
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
              " - Ikimokyklinio ugdymo sutartis.pdf"
          );
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((error) => {
          //console.log(error);
          swal({
            text: "Įvyko klaida atsisiunčiant sutartį.",
            buttons: "Gerai",
          });
        });
    }
  };

  handleDelete = (item) => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http
          .delete(`${apiEndpoint}/api/prasymai/user/delete/${item.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai",
            });
            this.getUserApplications();
          })
          .catch(() => {});
      }
    });
  };

  drawMessageQueueApproved(obj) {
    //console.log("prior status:" + JSON.stringify(obj));
    var status = obj.map((that) => that.status);
    var isConfirmed = false;
    for (var i = 0; i < status.length; i++) {
      //console.log(status[i] === 'Patvirtintas' || status[i] === 'Laukiantis');
      if (status[i] === "Patvirtintas" || status[i] === "Laukiantis") {
        isConfirmed = true;
        break;
      }
    }
    if (isConfirmed && !this.state.registrationStatus) {
      // console.log("+Prašymo statusas: " + status + ", registration status: " + this.state.registrationStatus +
      //   "status !== 'Pateiktas': " + (status == 'Pateiktas'));
      //console.log(status)
      return (
        <div className="alert alert-warning p-1" role="alert">
          Prašymų registracija baigėsi. Eilės patvirtintos
        </div>
      );
    }
    // else {
    //   // console.log("-Prašymo statusas: " + status + ", registration status: " + this.state.registrationStatus +
    //   //   "status !== 'Pateiktas': " + (status == 'Pateiktas'));
    //   //   console.log(status)
    // }
  }

  render() {
    const { length: count } = this.state.applications;

    if (count === 0)
      return (
        <div className="container pt-4">
          <h6 className="pl-2 pt-3">Jūs neturite pateiktų prašymų.</h6>
        </div>
      );

    return (
      <div className="container pt-4">
        <h5 className="pl-2 pt-3">Mano prašymai</h5>

        {this.drawMessageQueueApproved(this.state.applications)}

        <div className="row pt-2">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <UserApplicationsTable
              applications={this.state.applications}
              onDelete={this.handleDelete}
              onDownload={this.handleDownload}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserHomeContainer;

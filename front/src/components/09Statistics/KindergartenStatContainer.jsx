import React, { Component } from "react";

import "../../App.css";

import http from "../10Services/httpService";
import apiEndpoint from "../10Services/endpoint";

import KindergartenStatTable from "./KindergartenStatTable";
import Pagination from "./../08CommonComponents/Pagination";
import { KindergartenStatChart } from "./KindergartenStatChart";

export class KindergartenStatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darzeliai: [],
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,

      allKindergartens : null
    };
  }
  componentDidMount() {
    this.getKindergartenStat(this.state.currentPage);
  }

  getKindergartenStat(currentPage) {
    const { pageSize } = this.state;

    currentPage -= 1;
    if (currentPage < 0) currentPage = 0;

    var uri = `${apiEndpoint}/api/darzeliai/statistics?page=${currentPage}&size=${pageSize}`;
    var allUri = `${apiEndpoint}/api/darzeliai/visi`;

    http
      .get(uri)
      .then((response) => {
        this.setState({
          darzeliai: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1,
        });
     
      })
      .catch(() => { });
 
      http
      .get(allUri)
      .then((response) => {
        this.setState({
          allKindergartens: response.data
        });
        console.log(JSON.stringify( this.state.allKindergartens));
      })
      .catch(() => { });

  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getKindergartenStat(page);
  };



  render() {
    const { darzeliai, totalElements, pageSize } = this.state;
    let count = 0;

    if (darzeliai !== undefined) count = darzeliai.length;

    if (count === 0)
      return (
        <div className="container pt-5">
          <h6 className="pt-5">Informacija ruošiama</h6>
        </div>
      );

    return (
      <div className="container pt-4">


           <div className="row justify-content-end">
            <div className="col-5" >

            <div className="btn btn-primary me-2">1, 2 prioritetai</div>

              <div className="btn btn-primary me-2">3, 4 prioritetai</div>

              <div className="btn btn-primary">5 prioritetas</div>
            </div>

          </div>
          <div className="row">
            <div className="col-6">
              <KindergartenStatChart kindergartens={this.state.allKindergartens} />
            </div>
            <div className="col-6">
              <KindergartenStatChart kindergartens={this.state.allKindergartens} />
            </div>
         </div>



        <h6 className="pl-2 pt-3">Prašymų statistika</h6>

        <div className="row pt-2">
          <div className="col-12">
            <KindergartenStatTable darzeliai={darzeliai} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={totalElements}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>


      </div>
    );
  }
}

export default KindergartenStatContainer;

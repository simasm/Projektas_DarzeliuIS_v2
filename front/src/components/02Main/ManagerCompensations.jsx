import React, { useEffect, useState } from 'react';
import apiEndpoint from "../10Services/endpoint";
import axios from "axios";
import swal from "sweetalert";


const ManagerCompensations = () => {

    const [compensations, setCompensations] = useState([]);

    useEffect(() => {
        axios.get(apiEndpoint + `/api/kompensacija/manager`)
            .then((response) => {
                setCompensations(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                swal({
                    text: "Įvyko klaida nuskaitant visus kompensacijų prašymus. " + error.response.data,
                    button: "Gerai",
                });
            });
    }, [setCompensations]);

    return (
        <div class="container pt-4">
            <h3 style={{ fontWeight: 400 }}>Prašymai dėl kompensacijos</h3>
            <div class="row pt-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    {console.log("before sending: " + compensations.map(x => x.submittedAt))}
                    {/* <ManagerCompensationsTable compensations={compensations} /> */}
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{width: "18%"}}>Vaiko vardas</th>
                                <th style={{width: "18%"}}>Vaiko pavardė</th>
                                <th style={{width: "18%"}}>Pateikimo data</th>
                                <th style={{width: "46%"}}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {compensations.map(item => 
                                <tr key={item.id}>
                                    <td>{item.childName}</td>
                                    <td>{item.childSurname}</td>
                                    <td>{item.submittedAt}</td>
                                    <td style={{textAlign: "right"}}><button type="button" className="btn btn-outline-secondary">Peržiūrėti</button></td>
                                </tr>    
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManagerCompensations;
import React, { useEffect, useState } from 'react';
import apiEndpoint from "../10Services/endpoint";
import axios from "axios";
import swal from "sweetalert";
import { Link } from 'react-router-dom';
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import './../../App.css';

const ManagerCompensations = () => {

   const { compState, setCompState } = React.useContext(ManagerCompesationContext); 

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

    const spawnReview = (id) => {
      let kompensacija = compensations.filter(comp => comp.id === id);
        setCompState(kompensacija);
    }

    return (
        <div class="container pt-4">
            <h3 style={{ fontWeight: 400 }}>Prašymai dėl kompensacijos</h3>
            <div class="row pt-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
   
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
                                    <td className='table-style'>{item.childName}</td>
                                    <td className='table-style'>{item.childSurname}</td>
                                    <td className='table-style'>{item.submittedAt}</td>
                                    <td style={{textAlign: "right"}}>
                                    <Link className='text-decoration-none' type="button" onClick={() => spawnReview(item.id)} to={`/kompensacijos/${item.id}`}>
                                    <button className="btn btn-outline-secondary" >Peržiūrėti</button></Link>
                                    </td>
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
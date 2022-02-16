import React from 'react';
import { Link, useParams } from "react-router-dom";
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import './../../App.css';

const ManagerReviewTable = () => {
    const { compState, setCompState } = React.useContext(ManagerCompesationContext);
    const { id } = useParams();

    //console.log("Gauti duomenys: \n" + JSON.stringify(compState));
    return (
        <div class="container pt-4">
            <h3 style={{ fontWeight: 400 }}>Kompensacijos prašymas</h3>
            <div class="row pt-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "center" }}>Vaiko duomenys</h4>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Asmens kodas</th>
                                <th>Gimimo data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compState.map(item =>
                                <tr key={item.id}>
                                    <td className='table-style'>{item.childName}</td>
                                    <td className='table-style'>{item.childSurname}</td>
                                    <td className='table-style'>{item.childPersonalCode}</td>
                                    <td className='table-style'>{item.childBirthdate}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>  
                </div>
            </div>

            <div class="row pt-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "center" }}>Vaiko atstovo duomenys</h4>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Asmens kodas</th>
                                <th>Telefono numeris</th>
                                <th>El. paštas</th>
                                <th>Adresas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compState.map(item =>
                                <tr key={item.id}>
                                    <td className='table-style'>{item.mainGuardian.name}</td>
                                    <td className='table-style'>{item.mainGuardian.surname}</td>
                                    <td className='table-style'>{item.mainGuardian.personalcode}</td>
                                    <td className='table-style'>{item.mainGuardian.telephone}</td>
                                    <td className='table-style'>{item.mainGuardian.email}</td>
                                    <td className='table-style'>{item.mainGuardian.address}</td>
                                </tr>
                            )}
                        </tbody>
                    </table> 
                </div>
            </div>

            <div class="row pt-2">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "center" }}>Ugdymo įstaigos duomenys</h4>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Pavadinimas</th>
                                <th>Įstaigos kodas</th>
                                <th>Adresas</th>
                                <th>Telefono numeris</th>
                                <th>El. paštas</th>
                                <th>Banko pavadinimas</th>
                                <th>Sąskaitos numeris</th>
                                <th>Banko kodas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compState.map(item =>
                                <tr key={item.id}>
                                    <td className='table-style'>{item.kindergartenName}</td>
                                    <td className='table-style'>{item.kindergartenId}</td>
                                    <td className='table-style'>{item.kindergartenAddress}</td>
                                    <td className='table-style'>{item.kindergartenPhoneNumber}</td>
                                    <td className='table-style'>{item.kindergartenEmail}</td>
                                    <td className='table-style'>{item.kindergartenBankName}</td>
                                    <td className='table-style'>{item.kindergartenBankAccountNumber}</td>
                                    <td className='table-style'>{item.kindergartenBankCode}</td>
                                </tr>
                            )}
                        </tbody>
                    </table> 
                </div>
            </div>

            <Link className='text-decoration-none' type="button" to={`/kompensacijos`}>
                        <button className="btn btn-outline-secondary" >Atgal</button>
            </Link>
        </div>
    );
}

export default ManagerReviewTable;
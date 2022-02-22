import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import ManagerCompesationContext from "../11Context/ManagerCompesationContext";
import './../../App.css';
import { useHistory } from "react-router-dom";

const DownloadReviewTable = () => {
    const { compState, setCompState } = React.useContext(ManagerCompesationContext);
    const [back, setBack ] = useState(false);
    let history = useHistory();
    useEffect(() => {
        handleDownloadPdf();
        //history.push("/kompensacijos");
        setTimeout(() => {
            setBackOnScreen();
        }, 3000);

    }, []);

    const setBackOnScreen = () => {
        console.log("setting backAppear to true");
        setBack(true);
        // history.push("/kompensacijos");
    }

    const handleDownloadPdf = async () => {
        const input = document.getElementById('divToPrint');
        //console.log("element:\n" + input);
        const canvas = await html2canvas(input);

        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth()*0.9;
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(data, 'PNG', 10, 10, pdfWidth, pdfHeight);
        let filename = compState.map(item => item.childName + '-' + item.childSurname + '-' + item.submittedAt);
        pdf.save(filename);
    };

    return (
        <div id="divToPrint" className="container pt-4">
            <h3 style={{ fontWeight: 400 }}>Kompensacijos prašymas</h3>
            <div class="row pt-3">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "left" }}>Vaiko duomenys</h4>
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

            <div className="row pt-5">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "left" }}>Vaiko atstovo duomenys</h4>
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
                                    <td className='table-style'>{item.mainGuardian.personalCode}</td>
                                    <td className='table-style'>{item.mainGuardian.phone}</td>
                                    <td className='table-style'>{item.mainGuardian.email}</td>
                                    <td className='table-style'>{item.mainGuardian.address}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row pt-5">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <h4 style={{ textAlign: "left" }}>Ugdymo įstaigos duomenys</h4>
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
            <div className='row pt-4'>

            </div>
            <div>
                {back === true ? (
                    <Link className='text-decoration-none' type="button" to={`/kompensacijos`}>
                        <button className="btn btn-outline-secondary" >Atgal</button>
                    </Link>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default DownloadReviewTable;
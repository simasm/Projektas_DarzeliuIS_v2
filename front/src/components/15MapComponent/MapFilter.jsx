// import React, { useEffect, useState } from "react";
// import "../../App.css";
// import { useHistory } from "react-router-dom";
// import apiEndpoint from "../10Services/endpoint";
// import http from "../10Services/httpService";
// import SearchBox from "./../08CommonComponents/SeachBox";

// export default function MapFilter() {

//     const [allKindergartens, setAllKidergartens] = useState([]);

//     const [activeKindergarten, setActiveKindergarten] = useState(null);

//     const setActive = (kindergarten) => {
//         setActiveKindergarten(kindergarten);
    
//         // console.log(activeKindergarten);
//     };

//     const setActiveThroughMarker = (kindergarten) => {
//         setActiveKindergarten(kindergarten);
//         var tgtElement = document.getElementById(kindergarten.id);
//         tgtElement.scrollIntoView({ block: "center", behavior: "smooth" });
//     };
    
//       const setInactive = () => {
//         setActiveKindergarten(null);
//         // console.log(activeKindergarten);
//     };


//     useEffect(() => {
//         async function getAllKindergartens() {
//             await http
//             .get(`${apiEndpoint}/api/darzeliai/visi`)
//             .then((response) => setAllKidergartens(response.data));
//         }

//         getAllKindergartens();
//     }, []);
    

//     return(
//         <div>
//             <div className="container all-kindergarten-map">
//             {allKindergartens.map((k) => (
//                 <div 
//                 key={k.id} 
//                 id={k.id}
//                 style={
//                     activeKindergarten !== null && activeKindergarten.id === k.id
//                       ? { border: "solid 2px black" }
//                       : { border: "none" }
//                 }
//                 onClick={() => setActive(k)}
//                 >{k.name}</div>
//             ))}
//             </div>

//             <div>
//             <SearchBox
//                 placeholder={"Ieškoti darželio pagal pavadinimą"}
//             />
//             </div>
//         </div>
        
//     )
// }
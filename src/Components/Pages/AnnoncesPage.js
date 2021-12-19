/**
 * Render the AnnoncesPage
 */
 import {Redirect, Router} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import { Auctions } from "../../../../projet_js_backend/model/auctions";
const AnnoncesPage = async () => {
	const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = '';
  let tab = await getData();


  let tableAuctions = '';  
  console.log(tab)
  Array.prototype.forEach.call(tab,auction => {
    console.log("NAME"+auction.name)
    let htmlSegment = `<ul id="auctions">
    <li>
    <img style="width:20%;"  src="${auction.cover_photo}" >
    </li>
    <p>${auction.name}</p>
</div>`;

tableAuctions += htmlSegment;

});

pageDiv.innerHTML += `<br> 
<ul class="navbar-nav w-100 justify-content-center">
                            <div class="container" style =" margin:auto; width:50%;padding:50px; font-size:35px; text-align:center">
                            <h1>&#x2728;Les Annonces postées &#x2728;</h1>
                            <div id="searchWrapper">
                            <input type="text" id="myInput" onkeyup="filter()" placeholder="Recherche" value="">
                            </div>
                    </ul>
	<div class="row">		
	<div class="column">
 
	`;
console.log(document.getElementById('myInput').value)

pageDiv.innerHTML +=`</ul>`;

pageDiv.innerHTML  += tableAuctions;




};


async function getData() {
  
  try {
      const optionsAuction = {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
           // body data type must match "Content-Type" header
          headers: {
              "Content-Type": "application/json",
          },
      };

      console.log(optionsAuction);

      const responseAuction = await fetch('/api/auctions/allAuctions', optionsAuction); // fetch return a promise => we wait for the response

      if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'affichage des annonces.");

      const data = await responseAuction.json(); // json() returns a promise => we wait for the data
      console.log(data)
      return data;
      
  } catch (error) {
      console.error("Page::error: ", error);
      return undefined;
  };

  



}


export default AnnoncesPage;

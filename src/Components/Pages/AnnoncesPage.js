/**
 * Render the AnnoncesPage
 */
 import {Redirect, Router} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import { Auctions } from "../../../../projet_js_backend/model/auctions";
import { createTab } from "./HomePage";

const AnnoncesPage = async () => {
	
	const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML='';
    let tabEndSoon = await getData();

    let alternate = false;
    
    createTab(pageDiv, tabEndSoon, "Toutes les annonces", alternate);

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

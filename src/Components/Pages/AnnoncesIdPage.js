/**
 * Render the AnnoncesPage
 */
 import {Redirect, Router} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";

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
  
        const responseAuction = await fetch('/api/auctions/allAuctions', optionsAuction); // fetch return a promise => we wait for the response
        
        if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'affichage des annonces.");
  
        const data = await responseAuction.json(); // json() returns a promise => we wait for the data
        return data;
        
    } catch (error) {
        console.error("Page::error: ", error);
        return undefined;
    }
  
  };

export default AnnoncesPage;

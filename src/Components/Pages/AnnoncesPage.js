/**
 * Render the AnnoncesPage
 */
 import {Redirect, Router} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import { Auctions } from "../../../../projet_js_backend/model/auctions";
const AnnoncesPage = () => {
	const pageDiv = document.querySelector("#page");
  getData();
/*pageDiv.innerHTML = `<br> 
	<div class="row">		
	<div class="column">
    <img src="https://i.ibb.co/wCbQPWM/veil.png">
    <img src="https://i.ibb.co/kKfRzVr/diner.jpg">
    <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
  </div>
  <div class="column">
    <img src="https://i.ibb.co/wCbQPWM/veil.png">
    <img src="https://i.ibb.co/kKfRzVr/diner.jpg">
    <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
  </div>
  <div class="column">
    <img src="https://i.ibb.co/wCbQPWM/veil.png">
    <img src="https://i.ibb.co/kKfRzVr/diner.jpg">
    <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
  </div>
  <div class="column">
    <img src="https://i.ibb.co/wCbQPWM/veil.png">
    <img src="https://i.ibb.co/kKfRzVr/diner.jpg">
    <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
  </div>


	`;

	

pageDiv.innerHTML +=`</div>`

*/	
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
      console.log(data);


  } catch (error) {
      console.error("Page::error: ", error);
  }

  return Redirect("/");
}


export default AnnoncesPage;

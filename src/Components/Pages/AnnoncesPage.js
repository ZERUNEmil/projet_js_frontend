/**
 * Render the AnnoncesPage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import { Auctions } from "../../../../projet_js_backend/model/auctions";



const AnnoncesPage = () => {
	const pageDiv = document.querySelector("#page");

  const activeAuctions = await fetch ("/api/annonces/getAllActive");
  if(!activeAuctions.ok)alert("Erreur lors du get d'annonces en cours")


	pageDiv.innerHTML = `<br>
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

};

export default AnnoncesPage;

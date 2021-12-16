/**
 * Render the AnnoncesPage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import starryNightImage from "../../img/StarryNight.jpg";
import criImage from "../../img/cri.jpg";
import soleilImage from"../../img/soleil.jpg";


const AnnoncesPage = () => {
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = `<br>
	<div class="row">		
	<div class="column">
    <img src=${starryNightImage}>
    <img src=${criImage}>
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${soleilImage}>
    <img src=${criImage}>
    <img src=${starryNightImage}>
  </div>
  <div class="column">
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${criImage}>
    <img src=${soleilImage}>
  </div>
  <div class="column">
    <img src=${soleilImage}>
    <img src=${criImage}>
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${soleilImage}>
    <img src=${criImage}>
    <img src=${starryNightImage}>
  </div>
  <div class="column">
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${soleilImage}>
    <img src=${starryNightImage}>
    <img src=${criImage}>
    <img src=${soleilImage}>
  </div>
	
	`;

	

pageDiv.innerHTML +=`</div>`

};

export default AnnoncesPage;

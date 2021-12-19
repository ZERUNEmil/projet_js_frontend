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

const AnnoncesPage = () => {
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = `<br> Deal with the content of your AnnoncesPage`;
};

export default AnnoncesPage;

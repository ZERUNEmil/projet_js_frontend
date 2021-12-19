/**
 * Render the AnnoncesPage
 */
import {Redirect, Router} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { getSessionObject } from "../../utils/session";
import { addAnnounceChoiceNav, addAnnounceInfoNav } from "./AuctionAnnouncePage.mjs";
import { addBidsChoiceNav, addBidsInfoNav } from "./AuctionBidsPage.mjs";
import { addAddBidChoiceNav, addAddBidInfoNav } from "./AuctionAddBidsPage.mjs";




 const AnnoncesIdPage = async (idAuction) => {
	// reset #page div
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = "";

	const structure = document.createElement("section");

	await addTabContent(structure, idAuction);

	pageDiv.appendChild(structure);
};

async function getUser(){
    let userEmail = getSessionObject("user");
	if(! userEmail) return Redirect("/login");

	// Collecting the info of the user
	try{
		const response = await fetch("/api/users/"+userEmail.email);

		if(!response.ok){
			throw new Error(
				"fetch error : " + Response.status + " : " + response.statusText
			);
		}

		const user = await response.json();

        return user;
    } catch (error){
        console.error("ProfilView::error: " + error);
    }
}

async function getAuction(idAuction){
	// Collecting the info of the user
	try{
		const response = await fetch("/api/auctions/"+idAuction);

		if(!response.ok){
			throw new Error(
				"fetch error : " + Response.status + " : " + response.statusText
			);
		}

		const auction = await response.json();

        return auction;
    } catch (error){
        console.error("ProfilView::error: " + error);
    }
}

async function addTabContent(structure, idAuction){
    const auction = await getAuction(idAuction);

	structure.className = "my-3";

	const container = document.createElement("div");
	container.classList.add("container");
    container.id = "idAuction";
    container.setAttribute("id_auction", idAuction);

	const title = document.createElement("h1");
	title.className = "mb-5";
	title.textContent = auction.name;
	title.id = "title";

	const account = document.createElement("div");
	account.className = "shadow rounded-lg d-block d-sm-flex";
	account.id = "accountPage";


    addAnnounceChoiceNav(account, auction);

	addAnnounceInfoNav(account, auction);

	container.appendChild(title);
	container.appendChild(account);
	structure.appendChild(container);
}

async function generateAnnouncePage(){
    const idAuction = document.getElementById("idAuction").getAttribute("id_auction");
    const auction = await getAuction(idAuction);

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAnnounceChoiceNav(account, auction);

	addAnnounceInfoNav(account, auction);
}

async function generateBidsPage(){
    
    const idAuction = document.getElementById("idAuction").getAttribute("id_auction");
    const auction = await getAuction(idAuction);

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addBidsChoiceNav(account, auction);

	await addBidsInfoNav(account, auction);
}

async function generateAddBidPage(){
    const idAuction = document.getElementById("idAuction").getAttribute("id_auction");
    const auction = await getAuction(idAuction);

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAddBidChoiceNav(account, auction);

	await addAddBidInfoNav(account, auction);
}

function onWindow(e){
	window.location.href = "#"+anchor;
}

export function addNavActive(nameNav, namePage, destination){
	const nav = document.createElement("a");
	nav.className="nav-link active";
	nav.id = nameNav+"-tab";
	nav.setAttribute("data-toggle", "pill");
	nav.setAttribute("role", "tab");
	nav.setAttribute("aria-controls", nameNav);
	nav.setAttribute("aria-selected", "false");
	nav.onClick = onWindow, "acccount";

	const name = document.createElement("i");
	if (nameNav === "Informations"){
		name.className = "fa fa-home text-center mr-1";
	}else if(nameNav === "Enchères"){
		name.className = "fa fa-comments-dollar text-center mr-1";
	}else if(nameNav === "Soumettre une enchère"){
		name.className = "fa fa-dollar-sign text-center mr-1";
	}

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	destination.appendChild(nav);
}

export function addNavInactive(nameNav, namePage, destination){
	const navLi = document.createElement("li");
	navLi.className = "nav-item";

	const nav = document.createElement("a");
	nav.className="nav-link";
	nav.id = nameNav+"-tab";
	nav.setAttribute("data-toggle", "pill");
	nav.setAttribute("role", "tab");
	nav.setAttribute("aria-controls", nameNav);
	nav.setAttribute("aria-selected", "false");

	const name = document.createElement("i");
	if (nameNav === "Informations"){
		name.className = "fa fa-home text-center mr-1";
        nav.addEventListener("click",  generateAnnouncePage, false);
	}else if(nameNav === "Enchères"){
		name.className = "fa fa-comments-dollar text-center mr-1";
        nav.addEventListener("click",  generateBidsPage, false);
	}else if(nameNav === "Soumettre une enchère"){
		name.className = "fa fa-dollar-sign text-center mr-1";
        nav.addEventListener("click",  generateAddBidPage, false);
	}

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	navLi.appendChild(nav);
	destination.appendChild(navLi);
}

export function addInfoContent(row, content, contentName){
	const info = document.createElement("div");
	info.className = "col-md-6";

	const textContent = document.createElement("div");
	textContent.className = "form-group";

	const label = document.createElement("label");
	label.innerText = contentName;

	const input = document.createElement("input");
	input.id = contentName;
	input.type = "text";
	input.className = "form-control";
	input.value = content;
	input.setAttribute("content", content);


	textContent.appendChild(label);
	textContent.appendChild(input);
	info.appendChild(textContent);

	row.appendChild(info);
}

export function addInfoContentNotModify(row, content, contentName){
	const info = document.createElement("div");
	info.className = "col-md-6";

	const textContent = document.createElement("div");
	textContent.className = "form-group";

	const label = document.createElement("label");
	label.innerText = contentName;

	const input = document.createElement("text");
	input.id = contentName;
	input.type = "text";
	input.className = "form-control";
	if (!content) input.innerText = "Non disponible";
	else input.innerText = content;


	textContent.appendChild(label);
	textContent.appendChild(input);
	info.appendChild(textContent);

	row.appendChild(info);
}

export function addHeaderTable(tr, info){
	for (let key of Object.keys(info[0])){
		if (key != "id_user" && key != "id_auction" && key != "email"){
			const th = document.createElement("th");
			th.setAttribute("scope", "col");
			th.innerText = key;
			tr.appendChild(th);
		}
	}

}

export async function addInfoLine(body, content){
	const user = await getUser();

	let first = true;
	content.forEach((line) => {
		const tr = document.createElement("tr");
		for (let [key, value] of Object.entries(line)){
			if (first){
				const th = document.createElement("th");
				th.setAttribute("scope", "row");
				th.innerText = value;
				tr.appendChild(th);
				first = false;
			}else {
				if (key === "email"){
				}else if(key === "id_auction"){
				}else {
					const td = document.createElement("td");
					if (key === "Date") {
						td.innerText = value.substring(0,10);
					}else if (key === "Statut"){
						if (line["email"] === user.email && line["Statut"]) td.innerText = "Remportée";
						else if (line["Statut"]) td.innerText = "Perdue";
						else td.innerText = "En cours";
					}else if (key === "Votre enchère max" || key === "Enchère max"){
						td.innerText = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
					}else td.innerText = value;
					tr.appendChild(td);
				}
			}
		}
		first = true;
		body.appendChild(tr);
	})
}

export function errorMessage(message) {
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML=
	'<br><div class="alert alert-danger" role="alert" id="message">  Attention : '+ message  + ' </div>';
}

export function notificationMessage(message){
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML=
	'<br><div class="alert alert-success" role="alert" id="message">'+ message + '</div>';

}

export function emptyErrorMessage(){
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML= '<div id="message"></div>';
}

async function onSubmit(e){
	e.preventDefault();

	const newFirstname = document.getElementById("Prénom").value;
	if (newFirstname === ""){
		errorMessage("Veuillez remplir votre prénom.");
		return;
	} 
	const newLastname = document.getElementById("Nom de famille").value;
	if (newLastname === "") {
		errorMessage("Veuillez remplir votre nom de famille.");
		return;
	}
	const newEmail = document.getElementById("Email").value;
	if (newEmail === "") {
		errorMessage("Veuillez remplir votre email.");
		return;
	}

	let userEmail = getSessionObject("user");

	emptyErrorMessage();

	try {
		const options = {
		  method: "PUT", // *GET, POST, PUT, DELETE, etc.
		  body: JSON.stringify({
			email: newEmail,
			firstname: newFirstname,
			lastname: newLastname,
		  }), // body data type must match "Content-Type" header
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/updateProfil", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 304) errorMessage("Compte non-modifié");
			if (response.status === 420) errorMessage("Adresse email déjà utilisée");
			else errorMessage("Erreur lors de l'ajout");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data

		if (userEmail.email != newEmail) Redirect("/logout");
		
		await generateAccountPage();

		const divFirstname = document.getElementById("title")
		divFirstname.innerText = "Welcome, " + newFirstname;

		notificationMessage("Modification réussie.");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

async function onCancel(e){
	e.preventDefault();
	await generateAuctionPage();
}

export default AnnoncesIdPage;

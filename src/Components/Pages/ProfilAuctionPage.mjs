import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { addInfoContent, addNavActive, addNavInactive, emptyErrorMessage, errorMessage } from "./ProfilPage.js";



export function addAuctionChoiceNav(account, user, images){
	const choices = document.createElement("div");
	choices.className = "profile-tab-nav border-right";

	const userPresentation = document.createElement("div");
	userPresentation.className = "p-4";

	const usersPicture = document.createElement("div");
	usersPicture.className = "img-circle text-center mb-3";

	const picture = document.createElement("img");
	picture.src = images;
	picture.alt = "User\'s picture";
	picture.id = "UsersPicture";

	const userName = document.createElement("h4");
	userName.className = "text-center";
	userName.textContent = user.firstname;

	const navigation = document.createElement("div");
	navigation.className = "nav flex-column nav-pills";
	navigation.id = "v-pills-tab";
	navigation.setAttribute("role", "tablist");
	navigation.setAttribute("aria-orientation", "vertical");

	addNavInactive("Profil", "Account", navigation);
	addNavInactive("Sécurité", "Security", navigation);
	addNavInactive("Adresse", "Adress", navigation);
	addNavInactive("Crédits", "Credits", navigation);
	addNavActive("Historique d'enchères", "Auction", navigation);

	const content = document.createElement("div");
	content.className = "tab-content p-4 p-md-5";
	content.id = "v-pills-tabContent";
	
	usersPicture.appendChild(picture);
	userPresentation.appendChild(usersPicture);
	userPresentation.appendChild(userName);
	choices.appendChild(userPresentation);
	choices.appendChild(navigation);
	account.appendChild(choices);
}

export function addAuctionInfoNav(account, user){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Historique d'enchères";

	const rows = document.createElement("div");
	rows.className = "row";
	
	// addInfoContent(rows, "", "Nouveau mot de passe");
	// addInfoContent(rows, "", "Confirmer le nouveau mot de passe");

	const buttons = document.createElement("div");

	const submitButton = document.createElement("button");
	submitButton.className = "btn btn-outline-light btn-lg px-5";
	submitButton.type = "submit";
	submitButton.innerText = "Mettre à jour";

	const cancelButton = document.createElement("button");
	cancelButton.className = "btn btn-outline-secondary btn-lg px-5";
	cancelButton.type = "cancel";
	cancelButton.innerText = "Annuler";

	const message = document.createElement("div");
	message.id = "message";



	info.appendChild(title);
	info.appendChild(rows);
	submitButton.addEventListener("click", onSubmit, user);
	buttons.appendChild(submitButton);
	cancelButton.addEventListener("click", onCancel);
	buttons.appendChild(cancelButton);
	info.appendChild(buttons);
	info.appendChild(message);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
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
			if (response.status === 420) errorMessage("Paramètres invalides");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
		Redirect("/profil");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

async function onCancel(e){
	e.preventDefault();
	document.getElementById("Prénom").value = document.getElementById("Prénom").getAttribute("content");
	document.getElementById("Nom de famille").value = document.getElementById("Nom de famille").getAttribute("content");
	document.getElementById("Email").value = document.getElementById("Email").getAttribute("content");
}



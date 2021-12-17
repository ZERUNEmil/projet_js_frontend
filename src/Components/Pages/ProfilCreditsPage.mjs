import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { generateCreditsPage, addInfoContent, addInfoContentNotModify, addNavActive, addNavInactive, emptyErrorMessage, errorMessage, notificationMessage, getUser } from "./ProfilPage.js";

export function addCreditsChoiceNav(account, user, images){
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
	addNavActive("Crédits", "Credits", navigation);
	addNavInactive("Historique d'enchères", "Auction", navigation);

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

export function addCreditsInfoNav(account, user){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Crédits";

	const rows = document.createElement("div");
	rows.className = "row";
	
	addInfoContentNotModify(rows, user.effective_balance, "Vos crédits");
	addInfoContentNotModify(rows, user.shadow_balance, "Crédités pré-débité");
	addInfoContent(rows, "", "Crédits à ajouter");
	addInfoContent(rows, "", "Crédits à retirer");


	const buttons = document.createElement("div");

	const submitButton = document.createElement("button");
	submitButton.className = "btn btn-outline-light btn-lg px-5";
	submitButton.type = "submit";
	submitButton.innerText = "Ajouter des crédits";

	const secondSubmitButton = document.createElement("button");
	secondSubmitButton.className = "btn btn-outline-light btn-lg px-5";
	secondSubmitButton.type = "submit";
	secondSubmitButton.innerText = "Retirer des crédits";


	const message = document.createElement("div");
	message.id = "message";
	

	info.appendChild(title);
	info.appendChild(rows);
	submitButton.addEventListener("click", onSubmit, user);
	buttons.appendChild(submitButton);
	secondSubmitButton.addEventListener("click", onWithdrawal, user);
	buttons.appendChild(secondSubmitButton);
	info.appendChild(buttons);
	info.appendChild(message);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}

async function onSubmit(e){
	e.preventDefault();

	const credits = document.getElementById("Crédits à ajouter").value;
	if (credits === ""){
		errorMessage("Combien de crédits voulez-vous ajouter ?");
		return;
	}

	let userEmail = getSessionObject("user");

	emptyErrorMessage();

	try {
		const options = {
		  method: "PUT", // *GET, POST, PUT, DELETE, etc.
		  body: JSON.stringify({
			credits: credits,
		  }), // body data type must match "Content-Type" header
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/addCredits", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 304) errorMessage("Crédits non-ajoutés");
			if (response.status === 420) errorMessage("Paramètres invalides");
			else errorMessage("Erreur lors de l'ajout");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
		await generateCreditsPage();

		notificationMessage("Ajout réussi !");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

async function onWithdrawal(e){
	e.preventDefault();

	const user = await getUser();

	const credits = user.effective_balance;
	const retrait = document.getElementById("Crédits à retirer").value;

	console.log(credits + " /// " + retrait);
	if (retrait === ""){
		errorMessage("Combien de crédits voulez-vous ajouter ?");
		return;
	}else if(retrait > credits){
		errorMessage("Vous ne pouvez pas retirer cette somme .");
		return;
	}


	let userEmail = getSessionObject("user");

	emptyErrorMessage();

	try {
		const options = {
		  method: "PUT", // *GET, POST, PUT, DELETE, etc.
		  body: JSON.stringify({
			credits: 0-retrait,
		  }), // body data type must match "Content-Type" header
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/addCredits", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 304) errorMessage("Crédits non-ajoutés");
			if (response.status === 420) errorMessage("Paramètres invalides");
			else errorMessage("Erreur lors de l'ajout");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
		await generateCreditsPage();

		notificationMessage("Retrait réussi !");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}
}



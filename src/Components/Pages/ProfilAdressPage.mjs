import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { generateAdressPage, addInfoContent, addNavActive, addNavInactive, emptyErrorMessage, errorMessage, notificationMessage } from "./ProfilPage.js";



export function addAdressChoiceNav(account, user, images){
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
	addNavActive("Adresse", "Adress", navigation);
	addNavInactive("Crédits", "Credits", navigation);
	addNavInactive("Historique d'enchères", "Auction", navigation);
	addNavInactive("Mes annonces", "Annonces", navigation);

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

export async function addAdressInfoNav(account, user){
	let adress = await getAdress();
	if (! adress.number){
		adress.number = "";
		adress.street = "";
		adress.box = "";
		adress.city = "";
		adress.postalCode = "";
		adress.country = "";
	}
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Adresse";

	const rows = document.createElement("div");
	rows.className = "row";
	
    addInfoContent(rows, adress.number, "Numéro");
	addInfoContent(rows, adress.street, "Rue");
	addInfoContent(rows, adress.box, "Boîte");
	addInfoContent(rows, adress.city, "Ville");
	addInfoContent(rows, adress.postalCode, "Code postal");
	addInfoContent(rows, adress.country, "Pays");

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

	const number = document.getElementById("Numéro").value;
	if (number === ""){
		errorMessage("Veuillez remplir le numéro.");
		return;
	}
	const street = document.getElementById("Rue").value;
	if (street === "") {
		errorMessage("Veuillez remplir votre rue.");
		return;
	}
	const box = document.getElementById("Boîte").value;
	const city = document.getElementById("Ville").value;
	if (city === "") {
		errorMessage("Veuillez remplir votre ville.");
		return;
	}
	const postalCode = document.getElementById("Code postal").value;
	if (postalCode === "") {
		errorMessage("Veuillez remplir votre code postal.");
		return;
	}
	const country = document.getElementById("Pays").value;
	if (country === "") {
		errorMessage("Veuillez remplir votre pays.");
		return;
	}

	let userEmail = getSessionObject("user");

	// Est-ce que l'adresse existe déjà ?
	const adress = await getAdress();

	emptyErrorMessage();

	if (adress.number != undefined){
		try {
			const options = {
			  method: "PUT", // *GET, POST, PUT, DELETE, etc.
			  body: JSON.stringify({
				number: number,
				street: street,
				box: box,
				city: city,
				postalCode: postalCode,
				country: country,
			  }), // body data type must match "Content-Type" header
			  headers: {
				"Content-Type": "application/json",
			  },
			};
			
		   
			const response = await fetch("/api/users/" + userEmail.email + "/updateAdress", options); // fetch return a promise => we wait for the response
	  
			if (!response.ok) {
				if (response.status === 304) errorMessage("Adresse non-modifié");
				if (response.status === 420) errorMessage("Paramètres invalides");
				  throw new Error(
					"fetch error : " + response.status + " : " + response.statusText
				  );
			}
			const user = await response.json(); // json() returns a promise => we wait for the data

			await generateAdressPage();

			notificationMessage("Modification réussie !");
	
		} catch (error) {
		console.error("ProfilPage::error: ", error);
		}
	} else {
		try {
			const options = {
				method: "PUT", // *GET, POST, PUT, DELETE, etc.
				body: JSON.stringify({
				  number: number,
				  street: street,
				  box: box,
				  city: city,
				  postalCode: postalCode,
				  country: country,
				}), // body data type must match "Content-Type" header
				headers: {
				  "Content-Type": "application/json",
				},
			  };
			
		   
			const response = await fetch("/api/users/" + userEmail.email + "/setAdress", options); // fetch return a promise => we wait for the response
	  
			if (!response.ok) {
				if (response.status === 304) errorMessage("Adresse non-enregistrée");
				if (response.status === 420) errorMessage("Paramètres invalides");
				  throw new Error(
					"fetch error : " + response.status + " : " + response.statusText
				  );
			}
			const user = await response.json(); // json() returns a promise => we wait for the data
			
			await generateAdressPage();
			
			notificationMessage("Enregistrement réussi !");
		} catch (error) {
		console.error("ProfilPage::error: ", error);
		}
	}
	
}

async function onCancel(e){
	e.preventDefault();
	await generateAdressPage();
}

async function getAdress(){
	let userEmail = getSessionObject("user");

	try {
		const options = {
		  method: "GET", // *GET, POST, PUT, DELETE, etc.
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/getAdress", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 420) errorMessage("Paramètres invalides");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const adress = await response.json(); // json() returns a promise => we wait for the data
		
		return adress;
	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}
}



import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { generateSecurityPage, addSensitiveInfoContent, addNavActive, addNavInactive, emptyErrorMessage, errorMessage, notificationMessage } from "./ProfilPage.js";

export function addSecurityChoiceNav(account, user, images){
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

	addNavInactive("Profil", "account", navigation);
	addNavActive("Sécurité", "security", navigation);
	addNavInactive("Adresse", "adress", navigation);
	addNavInactive("Crédits", "credits", navigation);
	addNavInactive("Historique d'enchères", "auction", navigation);
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

export function addSecurityInfoNav(account, user){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Sécurité";

	const rows = document.createElement("div");
	rows.className = "row";
	
    addSensitiveInfoContent(rows, "", "Ancien mot de passe");
	rows.innerHTML += "<p></p>";
	addSensitiveInfoContent(rows, "", "Nouveau mot de passe");
	addSensitiveInfoContent(rows, "", "Confirmer le mot de passe");

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

    const lastPassword = document.getElementById("Ancien mot de passe").value;
    if (lastPassword === ""){
        errorMessage("Veuillez remplir votre ancien mot de passe.");
        return;
    }

	const newPassword = document.getElementById("Nouveau mot de passe").value;
	if (newPassword === ""){
		errorMessage("Veuillez remplir votre nouveau mot de passe.");
		return;
	} 
	const secondNewPassword = document.getElementById("Confirmer le mot de passe").value;
	if (secondNewPassword === "") {
		errorMessage("Veuillez confirmer votre mot de passe.");
		return;
	}

    if (newPassword != secondNewPassword){
        errorMessage("Les mots de passe ne correspondent pas.");
        return;
    }

	let userEmail = getSessionObject("user");

    try {
        const options = {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify({
            email: userEmail.email,
            password: lastPassword,
          }), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json",
          },
        };
  
       
        const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response
  
        if (!response.ok) {
            errorMessage("Votre ancien mot de passe n'est pas correct.");
            return;
        }
      } catch (error) {
        console.error("ProfilSecurityPage::error: ", error);
      }

	emptyErrorMessage();

	try {
		const options = {
		  method: "PUT", // *GET, POST, PUT, DELETE, etc.
		  body: JSON.stringify({
			password: newPassword,
		  }), // body data type must match "Content-Type" header
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/updatePassword", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 304) errorMessage("Compte non-modifié");
			if (response.status === 420) errorMessage("Paramètres invalides");
			else errorMessage("Erreur lors de l'ajout");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
		await generateSecurityPage();

        notificationMessage("Modification réussie.");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

async function onCancel(e){
	e.preventDefault();

	await generateSecurityPage();
}

import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import "../../stylesheets/profileStyle.css";

/**
 * Render the ProfilPage
 */

const ProfilSecurityPage = async () => {
	const images = importAll(require.context('../../img/users', false, /\.(png|jpe?g|svg)$/));

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
	

		// reset #page div
		const pageDiv = document.querySelector("#page");
		pageDiv.innerHTML = "";

		const structure = document.createElement("section");

		addTabContent(user, structure, images);

		pageDiv.appendChild(structure);
	} catch (error){
		console.error("ProfilView::error: " + error);
	}
};

function addTabContent(user, structure, images){
	structure.className = "py-5 my-5";

	const container = document.createElement("div");
	container.classList.add("container");

	const title = document.createElement("h1");
	title.className = "mb-5";
	title.textContent = "Welcome, " + user.firstname;

	const account = document.createElement("div");
	account.className = "shadow rounded-lg d-block d-sm-flex";

	container.appendChild(title);
	
	addChoiceNav(account, user, images);

    addInfoNav(account, user);


	container.appendChild(account);
	structure.appendChild(container);
}

function addChoiceNav(account, user, images){
	const choices = document.createElement("div");
	choices.className = "profile-tab-nav border-right";

	const userPresentation = document.createElement("div");
	userPresentation.className = "p-4";

	const usersPicture = document.createElement("div");
	usersPicture.className = "img-circle text-center mb-3";

	const picture = document.createElement("img");
	picture.src = images[user.profil_picture];
	picture.alt = "User\'s picture";

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

function addInfoNav(account, user){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Profil";

	const rows = document.createElement("div");
	rows.className = "row";
	
    addInfoContent(rows, "", "Ancien mot de passe");
    rows.innerHTML += "<p></p>";
	addInfoContent(rows, "", "Nouveau mot de passe");
	addInfoContent(rows, "", "Confirmer le nouveau mot de passe");

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
	const secondNewPassword = document.getElementById("Confirmer le nouveau mot de passe").value;
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
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
        notificationMessage("Modification réussie.");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

async function onCancel(e){
	e.preventDefault();
	document.getElementById("Nouveau mot de passe").value = "";
	document.getElementById("Confirmer le nouveau mot de passe").value = "";
}

function addInfoContent(row, content, contentName){
	const info = document.createElement("div");
	info.className = "col-md-6";

	const textContent = document.createElement("div");
	textContent.className = "form-group";

	const label = document.createElement("label");
	label.innerText = contentName;

	const input = document.createElement("input");
	input.id = contentName;
	input.type = "password";
	input.className = "form-control";
	input.value = content;
	input.setAttribute("content", content);


	textContent.appendChild(label);
	textContent.appendChild(input);
	info.appendChild(textContent);

	row.appendChild(info);
}

function addNavActive(nameNav, namePage, destination){
	const nav = document.createElement("a");
	nav.className="nav-link active";
	nav.id = nameNav+"-tab";
	nav.setAttribute("data-toggle", "pill");
	nav.href = "#";
	nav.setAttribute("role", "tab");
	nav.setAttribute("aria-controls", nameNav);
	nav.setAttribute("aria-selected", "false");

	const name = document.createElement("i");
	if (nameNav === "Profil"){
		name.className = "fa fa-home text-center mr-1";
	}else if(nameNav === "Crédits"){
		name.className = "fa fa-dollar-sign text-center mr-1";
	}else if(nameNav === "Historique d'enchères"){
		name.className = "fa fa-history text-center mr-1";
	}else if(nameNav === "Sécurité"){
		name.className = "fa fa-lock text-center mr-1";
	}else if(nameNav === "Adresse"){
		name.className = "fa fa-home text-center mr-1";
	}
	

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	destination.appendChild(nav);
}

function addNavInactive(nameNav, namePage, destination){
	const navLi = document.createElement("li");
	navLi.className = "nav-item";

	const nav = document.createElement("a");
	nav.className="nav-link";
	nav.id = nameNav+"-tab";
	nav.setAttribute("data-toggle", "pill");
	nav.href = "/profil/"+namePage;
	nav.setAttribute("role", "tab");
	nav.setAttribute("aria-controls", nameNav);
	nav.setAttribute("aria-selected", "false");

	const name = document.createElement("i");
	if (nameNav === "Profil"){
		name.className = "fa fa-home text-center mr-1";
	}else if(nameNav === "Crédits"){
		name.className = "fa fa-dollar-sign text-center mr-1";
	}else if(nameNav === "Historique d'enchères"){
		name.className = "fa fa-history text-center mr-1";
	}else if(nameNav === "Sécurité"){
		name.className = "fa fa-lock text-center mr-1";
	}else if(nameNav === "Adresse"){
		name.className = "fa fa-home text-center mr-1";
	}
	

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	navLi.appendChild(nav);
	destination.appendChild(navLi);
}

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
}

function errorMessage(message) {
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML=
	'<br><div class="alert alert-danger" role="alert" id="message">  Attention : '+ message  + ' </div>';
}

function notificationMessage(message) {
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML=
	'<br><div class="alert alert-success" role="alert" id="message">'+ message  + ' </div>';
}

function emptyErrorMessage(){
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML= '<div id="message"></div>';
}


export default ProfilSecurityPage;

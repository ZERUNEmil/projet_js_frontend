import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import "../../stylesheets/profileStyle.css";
import { addAccountChoiceNav, addAccountInfoNav } from "./ProfilAccountPage.mjs";
import { addCreditsChoiceNav, addCreditsInfoNav } from "./ProfilCreditsPage.mjs";
import { addSecurityChoiceNav, addSecurityInfoNav } from "./ProfilSecurityPage.mjs";
import { addAuctionChoiceNav, addAuctionInfoNav } from "./ProfilAuctionPage.mjs";
import { addMyAuctionChoiceNav, addMyAuctionInfoNav } from "./ProfilMyAuctionPage.mjs";
import { addAdressChoiceNav, addAdressInfoNav } from "./ProfilAdressPage.mjs";


/**
 * Render the ProfilPage
 */

const ProfilPage = async () => {
	// reset #page div
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = "";

	const structure = document.createElement("section");

	await addTabContent(structure);

	pageDiv.appendChild(structure);
};

export async function getUser(){
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

async function addTabContent(structure){
    const user = await getUser();
    const images = importAll(require.context('../../img/users', false, /\.(png|jpe?g|svg)$/));

	structure.className = "my-3";

	const container = document.createElement("div");
	container.classList.add("container-fluid");

	const title = document.createElement("h1");
	title.className = "mb-5";
	title.textContent = "Welcome, " + user.firstname;
	title.id = "title";

	const account = document.createElement("div");
	account.className = "shadow rounded-lg d-block d-sm-flex";
	account.id = "accountPage";

    addAccountChoiceNav(account, user, images[user.profil_picture]);

	addAccountInfoNav(account, user);

	container.appendChild(title);
	container.appendChild(account);
	structure.appendChild(container);
}

export async function generateAccountPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    
    addAccountChoiceNav(account, user, images);

	addAccountInfoNav(account, user);
}

export async function generateSecurityPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addSecurityChoiceNav(account, user, images);

	addSecurityInfoNav(account, user);
}

export async function generateCreditsPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addCreditsChoiceNav(account, user, images);

	addCreditsInfoNav(account, user);
}

export async function generateAuctionPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAuctionChoiceNav(account, user, images);

	await addAuctionInfoNav(account, user);
}

export async function generateAdressPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAdressChoiceNav(account, user, images);

	await addAdressInfoNav(account, user);

}

export async function generateMyAuctionPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addMyAuctionChoiceNav(account, user, images);

	await addMyAuctionInfoNav(account, user);

}

function onWindow(e){
	window.location.href = "#"+anchor;
}

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
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

export function addSensitiveInfoContent(row, content, contentName){
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
	input.innerText = content;


	textContent.appendChild(label);
	textContent.appendChild(input);
	info.appendChild(textContent);

	row.appendChild(info);
}

export function addInfoLine(body, content){
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
				const td = document.createElement("td");
				if (key === "Date") {
					td.innerText = value.substring(0,10);
				}else td.innerText = value;
				tr.appendChild(td);
			}
		}
		first = true;
		body.appendChild(tr);
	})
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
	}else if(nameNav === "Mes annonces"){
		name.className = "fa fa-scroll text-center mr-1";
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
	if (nameNav === "Profil"){
		name.className = "fa fa-home text-center mr-1";
        nav.addEventListener("click",  generateAccountPage, false);
	}else if(nameNav === "Crédits"){
		name.className = "fa fa-dollar-sign text-center mr-1";
        nav.addEventListener("click",  generateCreditsPage, false);
	}else if(nameNav === "Historique d'enchères"){
		name.className = "fa fa-history text-center mr-1";
        nav.addEventListener("click",  generateAuctionPage, false);
	}else if(nameNav === "Sécurité"){
		name.className = "fa fa-lock text-center mr-1";
        nav.addEventListener("click",  generateSecurityPage, false);
	}else if(nameNav === "Adresse"){
		name.className = "fa fa-home text-center mr-1";
        nav.addEventListener("click",  generateAdressPage, false);
	}else if(nameNav === "Mes annonces"){
		name.className = "fa fa-scroll text-center mr-1";
		nav.addEventListener("click", generateMyAuctionPage, false)
	}

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	navLi.appendChild(nav);
	destination.appendChild(navLi);
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

export default ProfilPage;

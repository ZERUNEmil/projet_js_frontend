import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import "../../stylesheets/profileStyle.css";
import { addAccountChoiceNav, addAccountInfoNav } from "./ProfilAccountPage.mjs";
import { addCreditsChoiceNav, addCreditsInfoNav } from "./ProfilCreditsPage.mjs";
import { addSecurityChoiceNav, addSecurityInfoNav } from "./ProfilSecurityPage.mjs";
import { addAuctionChoiceNav, addAuctionInfoNav } from "./ProfilAuctionPage.mjs";
import { addAdressChoiceNav, addAdressInfoNav } from "./ProfilAdressPage.mjs";


/**
 * Render the ProfilPage
 */

const ProfilAccountPage = async () => {
	// reset #page div
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = "";

	const structure = document.createElement("section");

	await addTabContent(structure);

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

async function addTabContent(structure){
    const user = await getUser();
    const images = importAll(require.context('../../img/users', false, /\.(png|jpe?g|svg)$/));

	structure.className = "py-5 my-5";

	const container = document.createElement("div");
	container.classList.add("container");

	const title = document.createElement("h1");
	title.className = "mb-5";
	title.textContent = "Welcome, " + user.firstname;

	const account = document.createElement("div");
	account.className = "shadow rounded-lg d-block d-sm-flex";
	account.id = "accountPage";

    addAccountChoiceNav(account, user, images[user.profil_picture]);

	addAccountInfoNav(account, user);

	container.appendChild(title);
	container.appendChild(account);
	structure.appendChild(container);
}

async function generateAccountPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    
    addAccountChoiceNav(account, user, images);

	addAccountInfoNav(account, user);
}

async function generateSecurityPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addSecurityChoiceNav(account, user, images);

	addSecurityInfoNav(account, user);
}

async function generateCreditsPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addCreditsChoiceNav(account, user, images);

	addCreditsInfoNav(account, user);
}

async function generateAuctionPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAuctionChoiceNav(account, user, images);

	addAuctionInfoNav(account, user);
}

async function generateAdressPage(){
    const user = await getUser();
    const images = document.getElementById("UsersPicture").src;

    const account = document.getElementById("accountPage");
    account.innerHTML = "";

    addAdressChoiceNav(account, user, images);

	addAdressInfoNav(account, user);
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

export function emptyErrorMessage(){
	const alertDiv = document.getElementById("message");
	alertDiv.innerHTML= '<div id="message"></div>';
}

export default ProfilAccountPage;
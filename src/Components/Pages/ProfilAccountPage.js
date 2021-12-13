import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";
import "../../stylesheets/profileStyle.css";

/**
 * Render the ProfilPage
 */

const ProfilAccountPage = () => {
	const images = importAll(require.context('../../img/users', false, /\.(png|jpe?g|svg)$/));

	let user = getSessionObject("user");
	console.log(user);
	if(! user) return Redirect("/login");

	// reset #page div
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = "";

	const structure = document.createElement("section");

	addTabContent(user, structure, images);

	pageDiv.appendChild(structure);
}

function addTabContent(user, structure, images){
	structure.className = "py-5 my-5";

	const container = document.createElement("div");
	container.classList.add("container");

	const title = document.createElement("h1");
	title.className = "mb-5";
	title.textContent = "Account Settings";

	const account = document.createElement("div");
	account.className = "shadow rounded-lg d-block d-sm-flex";

	const choices = document.createElement("div");
	choices.className = "profile-tab-nav border-right";

	const userPresentation = document.createElement("div");
	userPresentation.className = "p-4";

	const usersPicture = document.createElement("div");
	usersPicture.className = "img-circle text-center mb-3";

	const picture = document.createElement("img");
	picture.src = images['user2.jpg'];
	picture.alt = "User\'s picture";

	const userName = document.createElement("h4");
	userName.className = "text-center";
	userName.textContent = user.username;

	const navigation = document.createElement("div");
	navigation.className = "nav flex-column nav-pills";
	navigation.id = "v-pills-tab";
	navigation.setAttribute("role", "tablist");
	navigation.setAttribute("aria-orientation", "vertical");

	addNavActive("Account", "account", navigation);
	addNavInactive("Credits", "credits", navigation);
	addNavInactive("Auction history", "auction", navigation);

	const content = document.createElement("div");
	content.className = "tab-content p-4 p-md-5";
	content.id = "v-pills-tabContent";


	
	container.appendChild(title);
	usersPicture.appendChild(picture);
	userPresentation.appendChild(usersPicture);
	userPresentation.appendChild(userName);
	choices.appendChild(userPresentation);
	choices.appendChild(navigation);
	account.appendChild(choices);

	container.appendChild(account);
	structure.appendChild(container);
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
	if (nameNav === "Account"){
		name.className = "fa fa-home text-center mr-1";
	}else if(nameNav === "Credits"){
		name.className = "fa fa-dollar-sign text-center mr-1";
	}else if(nameNav === "Auction history"){
		name.className = "fa fa-history text-center mr-1";
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
	if (nameNav === "Account"){
		name.className = "fa fa-home text-center mr-1";
	}else if(nameNav === "Credits"){
		name.className = "fa fa-dollar-sign text-center mr-1";
	}else if(nameNav === "Auction history"){
		name.className = "fa fa-history text-center mr-1";
	}
	

	nav.appendChild(name);
	nav.innerHTML += " " + nameNav;

	navLi.appendChild(nav);
	destination.appendChild(navLi);
}

function addTab(nameTab, destination){

}

function importAll(r) {
	let images = {};
	r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
	return images;
  }

export default ProfilAccountPage;

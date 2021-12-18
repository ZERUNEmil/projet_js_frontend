import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { addInfoContent, addInfoLine, addNavActive, addNavInactive, emptyErrorMessage, errorMessage, generateAuctionPage } from "./ProfilPage.js";



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

export async function addAuctionInfoNav(account, user){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Historique d'enchères";

	const div = document.createElement("div");
	div.className = "row";

	const divTable = document.createElement("div");
	divTable.className = "table-responsive-xl";
	const table = document.createElement("table");
	table.className = "table";


	const header = document.createElement("thead");
	const tr = document.createElement("tr");
	
	const auctionsBids = await getAuctionBids();

	addHeaderTable(tr, auctionsBids);

	const body = document.createElement("tbody");
	addInfoLine(body, auctionsBids);

	info.appendChild(title);
	header.appendChild(tr);
	table.appendChild(header);
	table.appendChild(body);
	divTable.appendChild(table);
	div.appendChild(divTable);
	info.appendChild(div);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}

function addHeaderTable(tr, info){
	for (let key of Object.keys(info[0])){
		const th = document.createElement("th");
		th.setAttribute("scope", "col");
		th.innerText = key;
		tr.appendChild(th);
	}

}

async function getAuctionBids(){
	let userEmail = getSessionObject("user");

	try {
		const options = {
		  method: "GET", // *GET, POST, PUT, DELETE, etc.
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
	   
		const response = await fetch("/api/users/" + userEmail.email + "/getAuctionBids", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 420) errorMessage("Paramètres invalides");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const auctionBids = await response.json(); // json() returns a promise => we wait for the data
		
		return auctionBids;
	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}
}



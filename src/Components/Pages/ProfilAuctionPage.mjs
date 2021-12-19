import { Redirect } from "../Router/Router.js";
import { getSessionObject } from "../../utils/session.js";
import "../../stylesheets/profileStyle.css";
import { addInfoContent, addNavActive, addNavInactive, emptyErrorMessage, errorMessage, generateAuctionPage, getUser } from "./ProfilPage.js";



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

	const auctionsBids = await getAuctionBids();
	
	info.appendChild(title);

	if (auctionsBids != 0){
		const divTable = document.createElement("div");
		divTable.className = "table-responsive-xl";
		const table = document.createElement("table");
		table.className = "table table-hover";


		const header = document.createElement("thead");
		const tr = document.createElement("tr");


		addHeaderTable(tr, auctionsBids);

		const body = document.createElement("tbody");
		await addInfoLine(body, auctionsBids);

		header.appendChild(tr);
		table.appendChild(header);
		table.appendChild(body);
		divTable.appendChild(table);
		div.appendChild(divTable);
	}else{
		const div2 = document.createElement("div");
        div2.innerText = "Vous n'avez pas d'enchères.";
        div.appendChild(div2);
	}

	info.appendChild(div);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}

function addHeaderTable(tr, info){
	for (let key of Object.keys(info[0])){
		if (key != "id_user" && key != "id_auction" && key != "email"){
			const th = document.createElement("th");
			th.setAttribute("scope", "col");
			th.innerText = key;
			tr.appendChild(th);
		}
	}

}

async function addInfoLine(body, content){
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
					tr.addEventListener("click", onClickAuction);
					tr.setAttribute("id_auction", value);
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


export function onClickAuction(e){
	return Redirect("/annonces/id?"+e.currentTarget.getAttribute("id_auction"));
}



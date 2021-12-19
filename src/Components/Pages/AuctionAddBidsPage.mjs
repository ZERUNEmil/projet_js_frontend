import { addNavActive, addNavInactive,  } from "./AuctionIdPage.js";
import { getUser, addInfoContentNotModify, addInfoContent, errorMessage, getAuctionBids, emptyErrorMessage, generateBidsPage } from "./AuctionIdPage.js";


export function addAddBidChoiceNav(account, auction){
	const choices = document.createElement("div");
	choices.className = "profile-tab-nav border-right";

	const userPresentation = document.createElement("div");
	userPresentation.className = "p-4";

	const usersPicture = document.createElement("div");
	usersPicture.className = "text-center mb-3";

	const picture = document.createElement("img");
    picture.className = "img-fluid img-thumbnail"
	picture.src = auction.cover_photo;
	picture.alt = "Cover Photo";
	picture.id = "CoverPhoto";

	const navigation = document.createElement("div");
	navigation.className = "nav flex-column nav-pills";
	navigation.id = "v-pills-tab";
	navigation.setAttribute("role", "tablist");
	navigation.setAttribute("aria-orientation", "vertical");

	addNavInactive("Informations", "Informations", navigation);
	addNavInactive("Enchères", "Enchères", navigation);
    addNavActive("Soumettre une enchère", "Soumettre une enchère", navigation);

	const content = document.createElement("div");
	content.className = "tab-content p-4 p-md-5";
	content.id = "v-pills-tabContent";
	
	usersPicture.appendChild(picture);
	userPresentation.appendChild(usersPicture);
	choices.appendChild(userPresentation);
	choices.appendChild(navigation);
	account.appendChild(choices);
}

export async function addAddBidInfoNav(account, auction){
	const user = await getUser();
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Soumettre une enchère";

	const rows = document.createElement("div");
	rows.className = "row";
	
	addInfoContentNotModify(rows, new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(user.shadow_balance), "Crédités pré-débité");
	addInfoContent(rows, "", "Enchère");


	const buttons = document.createElement("div");

	const submitButton = document.createElement("button");
	submitButton.className = "btn btn-outline-light btn-lg px-5";
	submitButton.type = "submit";
	submitButton.innerText = "Enchérir";

	const message = document.createElement("div");
	message.id = "message";
	message.setAttribute("idAuction", auction.id_auction);
	

	info.appendChild(title);
	info.appendChild(rows);
	submitButton.addEventListener("click", onSubmit, user);
	buttons.appendChild(submitButton);
	info.appendChild(buttons);
	info.appendChild(message);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}

async function onSubmit(e){
	e.preventDefault();

	const credits = document.getElementById("Enchère").value;
	const idAuction = document.getElementById("idAuction").getAttribute("id_auction");
	const bids = await getAuctionBids(idAuction);

	if (credits === ""){
		errorMessage("Combien de crédits voulez-vous ajouter ?");
		return;
	}

	const user = await getUser();

	if (credits >= user.shadow_balance){
		errorMessage("Vous n'avez pas assez de crédits.");
		return;
	}

	if (bids[0] != undefined && credits <= bids[0].price){
		errorMessage("Vous êtes en dessous de la dernière enchère.");
		return;
	}

	emptyErrorMessage();

	try {
		const options = {
		  method: "PUT", // *GET, POST, PUT, DELETE, etc.
		  body: JSON.stringify({
			price: credits,
		  }), // body data type must match "Content-Type" header
		  headers: {
			"Content-Type": "application/json",
		  },
		};
		
		const user2 = await getUser();
	   
		const response = await fetch("/api/bids/" + user2.email + "/" + idAuction + "/addBid", options); // fetch return a promise => we wait for the response
  
		if (!response.ok) {
			if (response.status === 304) errorMessage("Crédits non-ajoutés");
			if (response.status === 420) errorMessage("Paramètres invalides");
			else errorMessage("Erreur lors de l'ajout");
		  	throw new Error(
				"fetch error : " + response.status + " : " + response.statusText
		  	);
		}
		const user = await response.json(); // json() returns a promise => we wait for the data
  
		await generateBidsPage();

		notificationMessage("Enchère réussie !");

	} catch (error) {
	console.error("ProfilPage::error: ", error);
	}


}

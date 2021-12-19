
import { addNavActive, addNavInactive, addInfoContentNotModify } from "./AuctionIdPage.js";

export function addAnnounceChoiceNav(account, auction){
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

	addNavActive("Informations", "Informations", navigation);
	addNavInactive("Enchères", "Enchères", navigation);
    addNavInactive("Soumettre une enchère", "Soumettre une enchère", navigation);

	const content = document.createElement("div");
	content.className = "tab-content p-4 p-md-5";
	content.id = "v-pills-tabContent";
	
	usersPicture.appendChild(picture);
	userPresentation.appendChild(usersPicture);
	choices.appendChild(userPresentation);
	choices.appendChild(navigation);
	account.appendChild(choices);
}

export function addAnnounceInfoNav(account, auction){
	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Informations";

	const rows = document.createElement("div");
	rows.className = "row";

	console.log(auction);

	let date = new Date(auction.start_time)
    date = date.setDate(date.getDate() + auction.day_duration);                    
	const options = { weekday: 'long',  month: 'numeric', year: 'numeric', day: 'numeric' };
	const dateFin = new Date(date).toLocaleDateString('be-BE', options);

	addInfoContentNotModify(rows, auction.name, "Nom de l'enchère");
	addInfoContentNotModify(rows, dateFin, "Date de fin");
	addInfoContentNotModify(rows, auction.description, "Description");
	addInfoContentNotModify(rows, auction.status, "Status");

	const message = document.createElement("div");
	message.id = "message";

	info.appendChild(title);
	info.appendChild(rows);
	info.appendChild(message);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}

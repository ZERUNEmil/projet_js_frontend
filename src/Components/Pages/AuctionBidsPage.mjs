import { addNavActive, addNavInactive, getAuction, addHeaderTable, addInfoLine, getAuctionBids } from "./AuctionIdPage.js";


export function addBidsChoiceNav(account, auction){
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
	addNavActive("Enchères", "Enchères", navigation);
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

export async function addBidsInfoNav(account, auction){
    const auctionsBids = await getAuctionBids(auction.id_auction);

	const infoTop = document.createElement("div");
	infoTop.className = "tab-content p-4 p-md-5 my-5";

	const info = document.createElement("div");
	info.className = "tab-pane fade show active";

	const title = document.createElement("h3");
	title.className = "mb-4";
	title.innerText = "Enchères";

    const div = document.createElement("div");
	div.className = "row";

	const rows = document.createElement("div");
	rows.className = "row";

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
        div2.innerText = "Il n'y a pas d'enchères.";
        div.appendChild(div2);
	}

	const message = document.createElement("div");
	message.id = "message";

	info.appendChild(title);
	rows.appendChild(div);
	info.appendChild(rows);
	info.appendChild(message);
	infoTop.appendChild(info);
	account.appendChild(infoTop);
}


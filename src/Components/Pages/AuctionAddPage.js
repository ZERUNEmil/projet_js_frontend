import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject, setSessionObject} from "../../utils/session";
import "../../stylesheets/profileStyle.css";

let auctionAddPage = `
  <form id="auctionAddForm">
  <br>
	<div class="container-md">
		<div class="auctionAdd-form" style="border-radius: 1rem;">
			<div class="card-body px-5 py-4 text-center">
				<h2 class="fw-bold mb-4 text-uppercase">Créer une annonce</h2>
				
				<div class="pb-4">
				    <hr>
				</div>
				
				<p class="text-white-50 mb-5">
					Remplissez les champs necessaire pour l'ANNONCE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'annonce - <i style="color: red;">Requis</i>
							<input type="text" id="auctionName" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date de début
							<input type="datetime-local" id="startTime" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Prix de départ
							<input type="number" min="0" step="1" id="startPrice" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Durée de l'enchère <i style="color: grey; font-size: 12px;">(en nombre de jours)</i>
							<input type="number" min="1" step="1" id="duration" class="form-control form-control-lg" placeholder=""/>
					</div>
				</div>
				<div class="form-outline form-white mb-4">
					Description
					<input type="text" id="auctionDescription" class="form-control form-control-lg" placeholder=""/>
				</div>
				<div class="form-outline form-white mb-4 pb-4">
					Image pour l'annonce <i style="color: grey; font-size: 12px;">(jpeg ou png)</i>
					<input type="url" id="coverPhoto" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder=""/>
				</div>
			
				<hr>
				
				<p class="text-white-50 mb-5 pt-4">
					Remplissez les champs necessaire pour l'OEUVRE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'oeuvre
							<input type="text" id="pieceName" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'artiste
							<input type="text" id="artist" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="mb-3">
						    L'auteur a-t-il signé l'oeuvre ?
						</div>
                            <div class="row">
                                <div class="col"></div>
                                <div class="col form-check ml-3">
                                    <input type="radio" class="form-check-input" name="signed" id="signed" value="1">Oui</input>
                                </div>
                                <div class="col form-check mr-3">
                                    <input type="radio" class="form-check-input" name="signed" id="signed" value="2" checked>Non</input>
                                </div>
                                <div class="col"></div>
                            </div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Type
							<select class="form-select form-select-lg mb-3" id="type">
                                <option selected value="0">Selectionnez le type</option>
                                <option value="1">Peinture</option>
                                <option value="2">Sculpture</option>
                                <option value="3">Photographie</option>
                                <option value="4">Autre</option>
                            </select>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Mouvement
                            <select class="form-select form-select-lg mb-3" id="artMovement">
                                <option selected value="0">Selectionnez le mouvement</option>
                                <option value="1">Réalisme</option>
                                <option value="2">Impressionnisme</option>
                                <option value="3">Fauvisme</option>
                                <option value="4">Expressionnisme</option>
                                <option value="5">Cubisme</option>
                                <option value="6">Futurisme</option>
                                <option value="7">Surréalisme</option>
                                <option value="8">Autre</option>
                            </select>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Dimension
							<input type="text" id="size" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
                </div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Commanditaire
							<input type="text" id="partner" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Collection
							<input type="text" id="collection" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Localisation actuelle
							<input type="text" id="location" class="form-control form-control-lg" placeholder=""/>
						</div>
				    </div>
                </div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date Precise <i style="color: grey; font-size: 12px;">(si connue)</i>
							<input type="date" id="preciseDate" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Millenaire
							<input type="number" min="-10" max="2" step="1" id="millenium" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Siècle - 1
							<input type="number" min="1" max="21" step="1" id="firstCentury" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Siècle - 2
							<input type="number" min="1" max="21" step="1" id="secondCentury" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
				</div>
                <div class="form-outline form-white mb-4">
                    Description
                    <input type="text" id="pieceDescription" class="form-control form-control-lg" placeholder=""/>
                </div>
				<div class="form-outline form-white mb-4 pb-4">
					Image(s) pour illustrer l'oeuvre <i style="color: grey; font-size: 12px;">(jpeg ou png)</i>
					<input type="file" id="piecePictures" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder="Adresse" multiple/>
				</div>
				
                <div>
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Ajouter votre annonce</button>
                </div>
            </div>
        </div>
    </form>
	<div class="pb-5"></div>
  `;


const AuctionAddPage = async () => {
    let user = getSessionObject("user");

    if (!user) return Redirect("/login");

    // reset #page div
    const pageDiv = document.querySelector("#page");

    pageDiv.innerHTML = "";
    pageDiv.innerHTML = auctionAddPage;

    const auctionAddForm = document.getElementById("auctionAddForm");
    auctionAddForm.addEventListener("submit", onSubmit, user);
}


async function onSubmit(e) {
    e.preventDefault();
    let userEmail = getSessionObject("user").email;

    // Auction
    let auctionName = document.getElementById("auctionName").value;
    if (auctionName === "") {
        alert("Veuillez remplir le nom de l'annonce.");
        return;
    }

    let auctionDescription = document.getElementById("auctionDescription").value;
    let startPrice = document.getElementById("startPrice").value;
    if (startPrice === "") startPrice = 0;
    let duration = document.getElementById("duration").value;
    if (duration === "") duration = 1;
    let startTime = document.getElementById("startTime").value;
    if (startTime === '') startTime = '2021-12-16 12:32';
    let coverPhoto = document.getElementById("coverPhoto").value;

    // Piece
    let pieceName = document.getElementById("pieceName").value;
    let pieceDescription = document.getElementById("pieceDescription").value;
    let artist = document.getElementById("artist").value;
    let signed = document.getElementById("signed").value;
    if (signed === 1) signed = true;
    else signed = false;
    let partner = document.getElementById("partner").value;
    let collection = document.getElementById("collection").value;
    let type = document.getElementById("type").value;
    if (type === 0) type = "";
    else if (type === 1) type = "Réalisme";
    else if (type === 2) type = "Impressionnisme";
    else if (type === 3) type = "Fauvisme";
    else if (type === 4) type = "Expressionnisme";
    else if (type === 5) type = "Cubisme";
    else if (type === 6) type = "Futurisme";
    else if (type === 7) type = "Surréalisme";
    else if (type === 8) type = "Autre";
    let size = document.getElementById("size").value;
    let artMovement = document.getElementById("artMovement").value;
    if (artMovement === 0) type = "";
    else if (artMovement === 1) type = "Peinture";
    else if (artMovement === 2) type = "Sculpture";
    else if (artMovement === 3) type = "Photographie";
    else if (artMovement === 4) type = "Autre";
    let location = document.getElementById("location").value;
    let millenium = document.getElementById("millenium").value;
    let firstCentury = document.getElementById("firstCentury").value;
    let secondCentury = document.getElementById("secondCentury").value;
    let preciseDate = document.getElementById("preciseDate").value;

    // Piece_Picture TODO comment géré ça ? ...
    let piecePictures = document.getElementById("piecePictures").value;

    try {
        // Add auction
        const optionsAuction = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({
                name: auctionName,
                description: auctionDescription,
                start_price: startPrice,
                day_duration: duration,
                start_time: startTime,
                cover_photo: coverPhoto,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responseAuction = await fetch("/api/auctions/" + userEmail + "/addAuction", optionsAuction); // fetch return a promise => we wait for the response

        if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'ajout de l'annonce.");

        const auction = await responseAuction.json(); // json() returns a promise => we wait for the data

        alert("Création de l'annonce réussie.");

        // Add Piece

        let idAuction = auction.id_auction;

        const optionsPiece = {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({
                name: pieceName,
                description: pieceDescription,
                artist: artist,
                signed: signed,
                partner: partner,
                collection: collection,
                type: type,
                size: size,
                art_movement: artMovement,
                location: location,
                id_auction: idAuction,
                millenium: millenium,
                first_century: firstCentury,
                second_century: secondCentury,
                precise_date: preciseDate,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responsePiece = await fetch("/api/pieces/" + idAuction + "/addPiece", optionsPiece);

        if (!responsePiece.ok) alert("Une erreur s'est produite lors de l'ajout de l'oeuvre.")

        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        alert("Création de l'oeuvre réussie.")

        // Add PiecePictures

        let idPiece = piece.id_piece;

        const optionsPiecePicture = {
            id_piece: idPiece,
        }

    } catch (error) {
        console.error("AuctionAddPage::error: ", error);
    }

    return Redirect("/");
}

export default AuctionAddPage;

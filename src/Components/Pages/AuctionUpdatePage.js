import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject} from "../../utils/session";
import "../../stylesheets/profileStyle.css";



let auctionUpdatePage = `
  <form id="auctionUpdateForm">
  <br>
	<div class="container-md">
		<div class="auctionUpdate-form" style="border-radius: 1rem;">
			<div class="card-body px-5 py-4 text-center">
				<h2 class="fw-bold mb-4 text-uppercase">Mettre à jour une annonce</h2>
				
				<div class="pb-1">
				    <hr>
				</div>	
				
				<p class="text-white-50 mb-4">
					Remplissez les champs necessaire pour l'ANNONCE ci-dessous
                </p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'annonce - <i style="color: red;">Requis</i>
							<input type="text" id="auctionName" class="form-control form-control-lg"required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date de début
							<input type="datetime-local" id="startTime" class="form-control form-control-lg"/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Prix de départ
							<input type="number" min="0" step="1" id="startPrice" class="form-control form-control-lg"/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Durée de l'enchère <i style="color: grey; font-size: 12px;">(en nombre de jours)</i>
							<input type="number" min="1" step="1" id="duration" class="form-control form-control-lg"/>
					</div>
				</div>
				<div class="form-outline form-white mb-4">
					Description
					<input type="text" id="auctionDescription" class="form-control form-control-lg"/>
				</div>
				<div class="form-outline form-white mb-4 pb-4">
					Image pour l'annonce <i style="color: grey; font-size: 12px;">(jpeg ou png)</i>
					<input type="url" id="coverPhoto" accept="image/png, image/jpeg" class=" form-control form-control-lg"/>
				</div>
			
				<hr>
				
				<p class="text-white-50 mb-5 pt-4">
					Remplissez les champs necessaire pour l'OEUVRE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'oeuvre
							<input type="text" id="pieceName" class="form-control form-control-lg"/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'artiste
							<input type="text" id="artist" class="form-control form-control-lg"/>
						</div>
					</div>
					<div class="col">
						<div class="mb-3">
						    L'auteur a-t-il signé l'oeuvre ?
						</div>
                            <div class="row">
                                <div class="col"></div>
                                <div class="col form-check ml-3">
                                    <input type="radio" class="form-check-input" name="signed" id="signed" value="true">Oui</input>
                                </div>
                                <div class="col form-check mr-3">
                                    <input type="radio" class="form-check-input" name="signed" id="signed" value="false" checked>Non</input>
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
                                <option selected value="Inconnu">Selectionnez le type</option>
                                <option value="Peinture">Peinture</option>
                                <option value="Sculpture">Sculpture</option>
                                <option value="Photographie">Photographie</option>
                                <option value="Autre">Autre</option>
                            </select>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Mouvement
                            <select class="form-select form-select-lg mb-3" id="artMovement">
                                <option selected value="Inconnu">Selectionnez le mouvement</option>
                                <option value="Réalisme">Réalisme</option>
                                <option value="Impressionnisme">Impressionnisme</option>
                                <option value="Fauvisme">Fauvisme</option>
                                <option value="Expressionnisme">Expressionnisme</option>
                                <option value="Cubisme">Cubisme</option>
                                <option value="Futurisme">Futurisme</option>
                                <option value="Surréalisme">Surréalisme</option>
                                <option value="Autre">Autre</option>
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
                </div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date
							<input type="text" id="date" class="form-control form-control-lg" placeholder=""/>
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
                            Description
                            <input type="text" id="pieceDescription" class="form-control form-control-lg" placeholder=""/>
                        </div>
                    </div>
                </div>
				<div class="row">
				    <div class="col">
				        <div class="form-outline form-white mb-4">
                            Image(s) pour illustrer l'oeuvre <i style="color: grey; font-size: 12px;">(jpeg ou png)</i>
                            <input type="url" id="piecePictures" class=" form-control form-control-lg" placeholder=""/>
				        </div>
                    </div>
				</div>
				
				<div class="px-5">
				    <hr>
				</div>
				
                <div class="row px-5">
                    <div class="col">
                        <button class="btn btn-danger btn-lg" id="delete">Supprimer votre annonce</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-outline-light btn-lg" type="submit" id="id_auction">Modifier votre annonce</button>
                    </div>
                    <div class="col">
                        <button class="btn btn-outline-info btn-lg" id="posted">Poster votre annonce</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
	<div class="pb-3"></div>
  `;


async function AuctionUpdatePage(param) {
    let user = getSessionObject("user");
    if (!user) return Redirect("/login");

    // reset #page div
    const pageDiv = document.querySelector("#page");

    pageDiv.innerHTML = "";
    pageDiv.innerHTML = auctionUpdatePage;

    const auctionUpdateForm = document.getElementById("auctionUpdateForm");
    auctionUpdateForm.addEventListener("submit", onSubmit);

    const deleteFunction = document.getElementById("delete");
    deleteFunction.addEventListener("click", deleteAuction);

    const id_auction = document.getElementById("id_auction");
    id_auction.value = param;

    let auctionInfos, pieceInfos;
    [auctionInfos, pieceInfos] = await getAuctionInfos(param);

    console.log(auctionInfos, pieceInfos);

    const auctionName = document.getElementById("auctionName");
    auctionName.value = auctionInfos.name;
    const auctionDescription = document.getElementById("auctionDescription");
    auctionDescription.value = auctionInfos.description;
    const startPrice = document.getElementById("startPrice");
    startPrice.value = auctionInfos.start_price;
    const duration = document.getElementById("duration");
    duration.value = auctionInfos.day_duration;
    const startTime = document.getElementById("startTime");
    startTime.value = auctionInfos.start_time.substring(0,10);
    const coverPhoto = document.getElementById("coverPhoto");
    coverPhoto.value = auctionInfos.cover_photo;

    const pieceName = document.getElementById("pieceName");
    pieceName.value = pieceInfos.name;
    const pieceDescription = document.getElementById("pieceDescription");
    pieceDescription.value = pieceInfos.description;
    const artist = document.getElementById("artist");
    artist.value = pieceInfos.artists;
    const signed = document.getElementById("signed");
    signed.value = pieceInfos.signed;
    const partner = document.getElementById("partner");
    partner.value = pieceInfos.partner;
    const collection = document.getElementById("collection");
    collection.value = pieceInfos.collection;
    const type = document.getElementById("type");
    type.value = pieceInfos.type;
    const size = document.getElementById("size");
    size.size = pieceInfos.size;
    const artMovement = document.getElementById("artMovement");
    artMovement.value = pieceInfos.art_movement;
    const location = document.getElementById("location");
    location.value = pieceInfos.location;
    const date = document.getElementById("date");
    date.value = pieceInfos.date;
}

async function getAuctionInfos(id) {
    try {
        const options = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
        };
        const responseAuction = await fetch("/api/auctions/" + id, options); // fetch return a promise => we wait for the response

        if (!responseAuction.ok) {
            if (responseAuction.status === 420)
            throw new Error(
                "fetch error : " + responseAuction.status + " : " + responseAuction.statusText
            );
        }
        const auction = await responseAuction.json(); // json() returns a promise => we wait for the data

        const responsePiece = await fetch("/api/pieces/" + id, options); // fetch return a promise => we wait for the response

        if (!responsePiece.ok) {
            if (responsePiece.status === 420)
            throw new Error(
                "fetch error : " + responsePiece.status + " : " + responsePiece.statusText
            );
        }
        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        return [auction, piece];

    } catch (error) {
        console.error("ProfilPage::error: ", error);
    }
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
    if (startTime === '') startTime = '2000-01-01 00:00';
    let coverPhoto = document.getElementById("coverPhoto").value;

    // Piece
    let pieceName = document.getElementById("pieceName").value;
    let pieceDescription = document.getElementById("pieceDescription").value;
    let artist = document.getElementById("artist").value;
    let signed = document.getElementById("signed").value;
    let partner = document.getElementById("partner").value;
    let collection = document.getElementById("collection").value;
    let type = document.getElementById("type").value;
    let size = document.getElementById("size").value;
    let artMovement = document.getElementById("artMovement").value;
    let location = document.getElementById("location").value;
    let date = document.getElementById("date").value;
    if (date === '') date = '2000-01-01';

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

        const idAuctionSelected = document.getElementById("id_auction").value;


        const responseAuction = await fetch("/api/auctions/" + idAuctionSelected + "/updateAuction", optionsAuction); // fetch return a promise => we wait for the response

        if (!responseAuction.ok) alert("Une erreur s'est produite lors de la modification de l'annonce.");

        const auction = await responseAuction.json(); // json() returns a promise => we wait for the data

        // Add Piece

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
                date: date,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responsePiece = await fetch("/api/pieces/" + idAuctionSelected + "/updatePiece", optionsPiece);

        if (!responsePiece.ok) alert("Une erreur s'est produite lors de la modification de l'oeuvre.");

        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        alert("Modification de l'annonce et de l'oeuvre réussie.")

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


async function deleteAuction() {
    let text = "Vous êtes sur le point de supprimer votre annonce !\nConfirmez par OK ou annulez la suppression.";
    if (confirm(text) == false) {
        alert("Vous avez annulé la suppresion de l'annonce !");
        return;
    }

    const options = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
    };

    const responseDeletePiece = await fetch("/api/pieces/" + idSelectedAuction + "/deletePiece", options);
    const responseDeleteAuction = await fetch("/api/auctions/" + idSelectedAuction + "/deleteAuction", options);

    if (!responseDeletePiece || !responseDeleteAuction) {
        alert("Une erreur s'est produite lors de la suppresion de l'annonce !");
    } else {
        alert("Vous avez bien suprimer votre annonce !");
        return Redirect("/profil");
    }
}

export default AuctionUpdatePage;

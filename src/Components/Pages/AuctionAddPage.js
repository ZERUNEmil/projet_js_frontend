import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject} from "../../utils/session";
import "../../stylesheets/profileStyle.css";
import axios from "axios";
import Swal from "sweetalert2";

let auctionAddPage = `
  <form id="auctionAddForm">
  <br>
	<div class="container-md">
		<div class="auctionAdd-form" style="border-radius: 1rem;">
			<div class="card-body px-5 py-4 text-center">
				<h2 class="fw-bold mb-4 text-uppercase">Créer une annonce</h2>
				
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
					<input type="file" id="coverPhoto" accept="image/png, image/jpeg" class=" form-control form-control-lg" required/>
				</div>
                <div>
                    <img id="IMAGE" style="display:none"/>
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
                                    <input type="radio" class="form-check-input" name="signed" id="signedTrue">Oui</input>
                                </div>
                                <div class="col form-check mr-3">
                                    <input type="radio" class="form-check-input" name="signed" id="signedFalse">Non</input>
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
				
				<div class="px-5">
				    <hr>
				</div>
				
                <div class="row px-5">
                    <div class="col">
                        <button class="btn btn-outline-light btn-lg" type="submit" id="id_auction">Ajouter votre annonce</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
	<div class="pb-3"></div>
  `;


const AuctionAddPage = async () => {
    let user = getSessionObject("user");

    if (!user) return Redirect("/login");
    ;

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
        Swal.fire("Attention !", "Veuillez remplir le nom de l'annonce.", "warning");
        return;
    }

    let dateNow = new Date();
    let dateStr =
        ("00" + dateNow.getDate()).slice(-2) + "/" +
        ("00" + (dateNow.getMonth() + 1)).slice(-2) + "/" +
        dateNow.getFullYear() +
        "T" + "23" + ":" + "59";

    let auctionDescription = document.getElementById("auctionDescription").value;
    let startPrice = document.getElementById("startPrice").value;
    if (startPrice === "") startPrice = 0;
    let duration = document.getElementById("duration").value;
    if (duration === "") duration = 1;
    let startTime = document.getElementById("startTime").value;
    if (startTime === '') startTime = '2000-01-01T00:00';
    let coverPhoto = document.getElementById("coverPhoto").value;
    // Upload cover_photo
    Swal.fire("Upload en cours", "Upload de votre image pour l'annonce", "info");
    const filePicture = e.target[5].files[0];
    let urlPicture = "";
    if (filePicture !== undefined) urlPicture = await uploadImage(filePicture);
    else {
        Swal.fire("Attention", "Veuillez selectionner une image pour l'annonce.", "warning");
        return;
    }

    // Piece
    let pieceName = document.getElementById("pieceName").value;
    let pieceDescription = document.getElementById("pieceDescription").value;
    let artist = document.getElementById("artist").value;
    let signed;
    if (document.getElementById('signedTrue').checked === true) signed = true;
    else signed = false;
    let partner = document.getElementById("partner").value;
    let collection = document.getElementById("collection").value;
    let type = document.getElementById("type").value;
    let size = document.getElementById("size").value;
    let artMovement = document.getElementById("artMovement").value;
    let location = document.getElementById("location").value;
    let date = document.getElementById("date").value;
    if (date === '') date = '';


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
                cover_photo: urlPicture,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responseAuction = await fetch("/api/auctions/" + userEmail + "/addAuction", optionsAuction); // fetch return a promise => we wait for the response

        if (!responseAuction.ok)
            Swal.fire("Erreur", "Une erreur s'est produite lors de l'ajout de l'annonce !", "error");

        const auction = await responseAuction.json(); // json() returns a promise => we wait for the data

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
                date: date,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responsePiece = await fetch("/api/pieces/" + idAuction + "/addPiece", optionsPiece);

        if (!responsePiece.ok)
            Swal.fire("Erreur", "Une erreur s'est produite lors de l'ajout de l'oeuvre !", "error")

        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        let idPiece = piece.id_piece;

        Swal.fire("Reussite", "Création de l'annonce et de l'oeuvre réussie !", "success");

        return Redirect("/annonces/id?" + responseAuction.id_auction);

    } catch (error) {
        console.error("AuctionAddPage::error: ", error);
    }
}

async function uploadImage(img) {
    let body = new FormData()
    body.set('key', 'b799672908d39df77cd5a53f169de4ca')
    body.append('image', img)

    let response = await axios({
        method: 'post',
        url: 'https://api.imgbb.com/1/upload',
        data: body
    })

    let json = JSON.parse(response.request.response);

    return json.data.url;
}

export default AuctionAddPage;

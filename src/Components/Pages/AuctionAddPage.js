import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject} from "../../utils/session";
import "../../stylesheets/profileStyle.css";
import axios from "axios";

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
					<input type="file" id="coverPhoto" accept="image/png, image/jpeg" class=" form-control form-control-lg"/>
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
				<div class="row">
				    <div class="col">
				        <div class="form-outline form-white mb-4">
                            Image(s) pour illustrer l'oeuvre <i style="color: grey; font-size: 12px;">(jpeg ou png)</i>
                            <input type="file" id="piecePictures" class=" form-control form-control-lg" placeholder="" multiple/>
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
                    <div class="col">
                        <div class="btn btn-outline-info btn-lg" id="posted">Poster votre annonce</div>
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

    // reset #page div
    const pageDiv = document.querySelector("#page");

    pageDiv.innerHTML = "";
    pageDiv.innerHTML = auctionAddPage;

    const auctionAddForm = document.getElementById("auctionAddForm");
    auctionAddForm.addEventListener("submit", onSubmit, user);


    const postAuctionFunction = document.getElementById("posted");
    postAuctionFunction.addEventListener("click", postAuction);
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

    let dateNow = new Date();
    let dateStr =
        ("00" + dateNow.getDate()).slice(-2) + "/" +
        ("00" + (dateNow.getMonth() + 1)).slice(-2) + "/" +
        dateNow.getFullYear() +
        " " + "23" + ":" + "59";
    console.log(dateStr);

    let auctionDescription = document.getElementById("auctionDescription").value;
    let startPrice = document.getElementById("startPrice").value;
    if (startPrice === "") startPrice = 0;
    let duration = document.getElementById("duration").value;
    if (duration === "") duration = 1;
    let startTime = document.getElementById("startTime").value;
    if (startTime === '') startTime = dateStr;
    let coverPhoto = document.getElementById("coverPhoto").value;
    // Upload cover_photo
    alert("Upload de votre image pour l'annonce !");
    const filePicture = e.target[5].files[0];
    let urlPicture = "";
    if (filePicture != undefined) urlPicture = await uploadImage(filePicture);

    // Piece
    let pieceName = document.getElementById("pieceName").value;
    let pieceDescription = document.getElementById("pieceDescription").value;
    let artist = document.getElementById("artist").value;
    let signed;
    if (document.getElementById('signedTrue').checked == true) signed = true;
    else signed = false;
    let partner = document.getElementById("partner").value;
    let collection = document.getElementById("collection").value;
    let type = document.getElementById("type").value;
    let size = document.getElementById("size").value;
    let artMovement = document.getElementById("artMovement").value;
    let location = document.getElementById("location").value;
    let date = document.getElementById("date").value;
    if (date === '') date = '2000-01-01';

    // Piece_Picture
    alert("Upload de votre/vos image/s pour l'oeuvre !");

    const piecePictures = e.target[18].files;
    const urlPiecePictures = [];
    if (piecePictures.length != 0) {
        for (let picture of Object.entries(piecePictures)){
            urlPiecePictures.push(await uploadImage(filesToUpload));
        }
    }

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

        if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'ajout de l'annonce.");

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

        if (!responsePiece.ok) alert("Une erreur s'est produite lors de l'ajout de l'oeuvre.");

        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        let idPiece = piece.id_piece;

        for (let picture of urlPiecePictures){
            const optionsPiece = {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify({
                    name: "",
                    picture: picture,
                    label: ""
                }), // body data type must match "Content-Type" header
                headers: {
                    "Content-Type": "application/json",
                },
            };
    
            const responsePiece = await fetch("/api/pieces/" + idPiece + "/addPicture", optionsPiece);
    
            if (!responsePiece.ok) alert("Une erreur s'est produite lors de l'ajout de la photo.");
        }
       

        alert("Création de l'annonce et de l'oeuvre réussie.")



    } catch (error) {
        console.error("AuctionAddPage::error: ", error);
    }

    return Redirect("/");
}

async function postAuction() {
    let text = "Vous êtes sur le point de mettre en ligne votre annonce !\n" +
        "Vous ne pourrez plus la modifiée et tout champs non remplis sera specifié : Non renseigné\n" +
        "\nConfirmez par OK ou annulez la suppression.";
    if (confirm(text) == false) {
        alert("Vous avez annulé la mise en ligne de l'annonce !");
        return;
    }

    let userEmail = getSessionObject("user").email;

    let dateNow = new Date();
    let dateStr =
        ("00" + dateNow.getDate()).slice(-2) + "/" +
        ("00" + (dateNow.getMonth() + 1)).slice(-2) + "/" +
        dateNow.getFullYear() +
        " " + "23" + ":" + "59";
    console.log(dateStr);

    // Check no Null fields
    // Auction
    let auctionName = document.getElementById("auctionName").value;
    if (auctionName === "") {
        alert("Veuillez remplir le nom de l'annonce.");
        return;
    }
    let auctionDescription = document.getElementById("auctionDescription").value;
    let startPrice = document.getElementById("startPrice").value;
    if (startPrice === "" || startPrice < 0) startPrice = 0;
    let duration = document.getElementById("duration").value;
    if (duration === "" || duration <= 0) duration = 1;
    let startTime = document.getElementById("startTime").value;
    if (startTime === '' || startTime.toString() <= dateStr.toString()) startTime = dateStr;
    let coverPhoto = document.getElementById("coverPhoto").value;
    if (coverPhoto === "") coverPhoto = "Frontend/src/img/users/user.jpg";

    // Piece
    let pieceName = document.getElementById("pieceName").value;
    if (pieceName === "") {
        alert("Veuillez remplir le nom de l'oeuvre.");
        return;
    }
    let pieceDescription = document.getElementById("pieceDescription").value;
    let artist = document.getElementById("artist").value;
    if (artist === "") artist = "Non renseigné";
    let signed;
    if (document.getElementById('signedTrue').checked == true && artist != "Non renseigné") signed = true;
    else signed = false;
    let partner = document.getElementById("partner").value;
    if (partner === "") partner = "Non renseigné";
    let collection = document.getElementById("collection").value;
    if (collection === "") collection = "Non renseigné";
    let type = document.getElementById("type").value;
    if (type === "") type = "Non Renseigné";
    let size = document.getElementById("size").value;
    if (size === "") size = "Non Renseigné";
    let artMovement = document.getElementById("artMovement").value;
    if (artMovement === "") artMovement = "Non renseigné";
    let location = document.getElementById("location").value;
    if (location === "") artMovement = "Non renseigné";
    let date = document.getElementById("date").value;
    if (date === "") date = "Non renseigné";

    // Piece_Picture
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
                status: "Posted",
                cover_photo: coverPhoto,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const idAuctionSelected = document.getElementById("id_auction").value;

        const responseAddAuction = await fetch("/api/auctions/" + userEmail + "/addAuction", optionsAuction); // fetch return a promise => we wait for the response

        if (!responseAddAuction.ok) alert("Une erreur s'est produite lors l'ajout de l'annonce.");

        const auction = await responseAddAuction.json(); // json() returns a promise => we wait for the data

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
                id_auction: idAuctionSelected,
                date: date,
            }), // body data type must match "Content-Type" header
            headers: {
                "Content-Type": "application/json",
            },
        };

        const responsePostAuction = await fetch("/api/auctions/" + auction.id_auction + "/postAuction", optionsAuction);

        if (!responsePostAuction.ok) alert("Une erreur s'est produite lors de la mise en ligne de l'oeuvre.");

        const responsePiece = await fetch("/api/pieces/" + auction.id_auction + "/postPiece", optionsPiece);

        if (!responsePiece.ok) alert("Une erreur s'est produite lors de la mise en ligne de l'oeuvre.");

        const piece = await responsePiece.json(); // json() returns a promise => we wait for the data

        alert("La mise en ligne de l'oeuvre a réussie.");
        // return Redirect("/profil");

        // Add PiecePictures

        let idPiece = piece.id_piece;

        const optionsPiecePicture = {
            id_piece: idPiece,
        }

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

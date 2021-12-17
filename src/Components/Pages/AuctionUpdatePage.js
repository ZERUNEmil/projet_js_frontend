import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject, setSessionObject} from "../../utils/session";
import "../../stylesheets/profileStyle.css";

// TODO chopper TOUTES les infos de l'enchere à modif
let idAuction = 1;

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
				
                <div class="pb-1">
                    <button class="btn btn-outline-light btn-danger px-5" onclick="deleteAuction(idAuction)">Supprimer votre annonce</button>
                </div>
                
                <div class="pb-3">
				    <hr>
				</div>
				
				<p class="text-white-50 mb-4">
					Remplissez les champs necessaire pour l'ANNONCE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'annonce
							<input type="text" id="auctionName" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date de début - <i>Optionnel</i>
							<input type="datetime-local" id="startDateTime" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Prix de départ - <i>Optionnel</i>
							<input type="number" min="1" step="1" id="startPrice" class="form-control form-control-lg" placeholder="1"/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Durée (en nombre de jours) - <i>Optionnel</i>
							<input type="number" min="1" step="1" id="duration" class="form-control form-control-lg" placeholder="1"/>
					</div>
				</div>
				<div class="form-outline form-white mb-4">
					Description - <i>Optionnel</i>
					<input type="text" id="auctionDescription" class="form-control form-control-lg" placeholder=""/>
				</div>
				<div class="form-outline form-white mb-4 pb-4">
					Photo de couverture de l'annonce (jpeg ou png) - <i>Optionnel</i>
					<input type="file" id="auctionPicture" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder="Adresse"/>
				</div>
			
				<hr>
				
				<p class="text-white-50 mb-4 pt-4">
					Remplissez les champs necessaire pour l'OEUVRE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'oeuvre
							<input type="text" id="pieceName" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Nom de l'artiste
							<input type="text" id="artist" class="form-control form-control-lg" placeholder="" required/>
						</div>
					</div>
					<div class="col">
						<div class="pb-3">
    						L'auteur a-t-il signé l'oeuvre ?
						</div>
						<div class="row">
							<div class="col"></div>
							<div class="col form-check ml-3">
								<input type="radio" class="form-check-input" name="signed" id="signedTrue">Oui</input>
							</div>
							<div class="col form-check mr-3">
								<input type="radio" class="form-check-input" name="signed" id="signedFalse" checked>Non</input>
							</div>
							<div class="col"></div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Type
							<input type="text" id="type" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Mouvement
							<input type="text" id="artMovement" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Dimension
							<input type="text" id="size" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
                </div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Collection - <i>Optionnel</i>
							<input type="text" id="collection" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Localisation actuelle
							<input type="text" id="location" class="form-control form-control-lg" placeholder="" required/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Commanditaire - <i>Optionnel</i>
							<input type="text" id="partner" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Lieu de création
							<input type="text" id="creationPlace" class="form-control form-control-lg" placeholder="" required/>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							Date Precise (si connue) - <i>Optionnel</i>
							<input type="date" id="preciseDate" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Millenaire
							<input type="number" min="-10" max="2" step="1" id="millenium" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Siècle - 1
							<input type="number" min="1" max="21" step="1" id="firstCentury" class="form-control form-control-lg" placeholder="" required />
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							Siècle - 2 - <i>Optionnel</i>
							<input type="number" min="1" max="21" step="1" id="secondCentury" class="form-control form-control-lg" placeholder=""/>
						</div>
					</div>
				</div>
                <div class="form-outline form-white mb-4">
                    Description - <i>Optionnel</i>
                    <input type="text" id="pieceDescription" class="form-control form-control-lg" placeholder=""/>
                </div>
				<div class="form-outline form-white mb-4 pb-4">
					Image(s) pour illustrer l'oeuvre (jpeg ou png)
					<input type="file" id="piecePictures" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder="Adresse" multiple required/>
				</div>
				
                <div>
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Ajouter votre annonce</button>
                </div>
            </div>
        </div>
    </form>
	<div class="pb-5"></div>
  `;


function AuctionUpdatePage() {
    // reset #page div
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = "";

    pageDiv.innerHTML = auctionUpdatePage;
    const auctionUpdateForm = document.getElementById("auctionUpdateForm");

    let user = getSessionObject("user");
    if (!user) {
        Navbar();
        Redirect("/login");
    } else {
        auctionUpdateForm.addEventListener("submit", onSubmit);
    }
}

function deleteAuction(id){
    let text = "Vous êtes sur le point de supprimer votre annonce !\n";
    // if (confirm(text) === true) {
    //
    // } else {
    //
    // }
    document.getElementById("demo").innerHTML = text;
}

export default AuctionUpdatePage;

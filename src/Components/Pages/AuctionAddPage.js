import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import {getSessionObject} from "../../utils/session";
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
							<input type="text" id="auctionName" class="form-control form-control-lg" placeholder="" required />
							Nom de l'annonce
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="datetime-local" id="startedDateTime" class="form-control form-control-lg" placeholder=""/>
							Date de début - <i>Optionnel</i>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="number" min="1" step="0.01" id="startedPrice" class="form-control form-control-lg" placeholder="1"/>
							Prix de départ - <i>Optionnel</i>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="number" min="1" step="1" id="duration" class="form-control form-control-lg" placeholder="1"/>
							Durée (en nombre de jours) - <i>Optionnel</i>
					</div>
				</div>
				<div class="form-outline form-white mb-4">
					<input type="text" id="auctionDescription" class="form-control form-control-lg" placeholder=""/>
					Description - <i>Optionnel</i>
				</div>
				<div class="form-outline form-white mb-4 pb-4">
					<input type="file" id="auctionPicture" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder="Adresse"/>
					Photo de couverture de l'annonce (jpeg ou png) - <i>Optionnel</i>
				</div>
			
				<hr>
				
				<p class="text-white-50 mb-5 pt-4">
					Remplissez les champs necessaire pour l'OEUVRE ci-dessous
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="pieceName" class="form-control form-control-lg" placeholder="" required />
							Nom de l'oeuvre
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="artist" class="form-control form-control-lg" placeholder="" required/>
							Nom de l'artiste
						</div>
					</div>
					<div class="col">
						<div class="form-check form-outline form-white mb-4">
							<input type="checkbox" id="signed" class="form-control form-control-lg form-check-input" placeholder="1" required/>
							L'oeuvre est-elle signée ?
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="type" class="form-control form-control-lg" placeholder="" required />
							Type
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="art_movement" class="form-control form-control-lg" placeholder="" required />
							Mouvement
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="size" class="form-control form-control-lg" placeholder="" required />
							Dimension
						</div>
					</div>
                </div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="collection" class="form-control form-control-lg" placeholder=""/>
							Collection - <i>Optionnel</i>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="Location" class="form-control form-control-lg" placeholder="" required/>
							Localisation actuelle
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="partner" class="form-control form-control-lg" placeholder=""/>
							Commanditaire - <i>Optionnel</i>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="text" id="creationPlace" class="form-control form-control-lg" placeholder="" required/>
							Lieu de création
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="date" id="preciseDate" class="form-control form-control-lg" placeholder=""/>
							Date Precise (si connue) - <i>Optionnel</i>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="number" min="-10" max="2" step="1" id="millenium" class="form-control form-control-lg" placeholder="" required />
							Millenaire
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="number" min="1" max="21" step="1" id="firstCentury" class="form-control form-control-lg" placeholder="" required />
							Siècle - 1
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<input type="number" min="1" max="21" step="1" id="secondCentury" class="form-control form-control-lg" placeholder=""/>
							Siècle - 2 - <i>Optionnel</i>
						</div>
					</div>
				</div>
                <div class="form-outline form-white mb-4">
                    <input type="text" id="pieceDescription" class="form-control form-control-lg" placeholder=""/>
                    Description - <i>Optionnel</i>
                </div>
				<div class="form-outline form-white mb-4 pb-4">
					<input type="file" id="piecePicture" accept="image/png, image/jpeg" class=" form-control form-control-lg" placeholder="Adresse" multiple required/>
					Image(s) pour illustrer l'oeuvre (jpeg ou png)
				</div>
				
                <div>
                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Ajouter votre annonce</button>
                </div>
            </div>
        </div>
    </form>
	<div class="pb-5"></div>
  `;


function AuctionAddPage() {
    // reset #page div
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = "";

    pageDiv.innerHTML = auctionAddPage;
    const auctionAddForm = document.getElementById("auctionAddForm");

    let user = getSessionObject("user");
    if (!user) {
        Navbar();
        Redirect("/login");
    } else {
        auctionAddForm.addEventListener("submit", onSubmit);
    }
}

export default AuctionAddPage;
/**
 * Render the HomePage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
import starryNightImage from "../../img/StarryNight.jpg";
import criImage from "../../img/cri.jpg";
import soleilImage from"../../img/soleil.jpg";

const HomePage = () => {
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = `<br><h1> All'Astra <h1>
	<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="${starryNightImage}" alt="First slide" style="max-width: 900px; max-height: 700px; margin : auto">
      <div class="carousel-caption d-none d-md-block">
      <h5>Starry Night</h5>
      <p>54132€</p>
    </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${criImage}" alt="Second slide" style="max-width: 900px; max-height: 700px; margin : auto">
      <div class="carousel-caption d-none d-md-block">
      <h5>Le Cri</h5>
      <p>9999€</p>
    </div>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="${soleilImage}" alt="Third slide" style="max-width: 900px; max-height: 700px; margin : auto">
      <div class="carousel-caption d-none d-md-block">
      <h5>1 2 3 Soleil</h5>
      <p>56€</p>
    </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
`;
};

export default HomePage;

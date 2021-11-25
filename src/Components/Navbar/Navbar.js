// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar } from "bootstrap";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
	const navbarWrapper = document.querySelector("#navbarWrapper");
	// if (user ?
	let navbar = `
  <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center navbar-dark bg-dark">
			<a href="/" class="navbar-brand d-flex w-50 mr-auto">All'Asta</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="navbar-collapse collapse w-100" id="Navbar">
				<ul class="navbar-nav w-100 justify-content-center">
					<li class="nav-item">
						<a class="nav-link" aria-current="page" href="#" data-uri="/">Accueil</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" data-uri="/annonces">Annonces</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" data-uri="/vendeurs">Vendeurs</a>
					</li>
				</ul>
				<ul class="nav navbar-nav ml-auto w-100 justify-content-end">
					<li class="nav-item">
						<a class="nav-link" href="#" data-uri="/register">Register</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" data-uri="/login">Log in</a>
					</li>
				</ul>
			</div>
		</nav>
  `;
	// :
	// `
	//   <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center navbar-dark bg-dark">
	// 		<a href="/" class="navbar-brand d-flex w-50 mr-auto">All'Asta</a>
	// 		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
	// 			<span class="navbar-toggler-icon"></span>
	// 		</button>
	// 		<div class="navbar-collapse collapse w-100" id="Navbar">
	// 			<ul class="navbar-nav w-100 justify-content-center">
	// 				<li class="nav-item">
	// 					<a class="nav-link" aria-current="page" href="#" data-uri="/">Accueil</a>
	// 				</li>
	// 				<li class="nav-item">
	// 					<a class="nav-link" href="#" data-uri="/Annonces">Annonces</a>
	// 				</li>
	// 				<li class="nav-item">
	// 					<a class="nav-link" href="#" data-uri="/vendeurs">Vendeurs</a>
	// 				</li>
	// 			</ul>
	// 			<ul class="nav navbar-nav ml-auto w-100 justify-content-end">
	// 				<li class="nav-item">
	// 					<a class="nav-link" href="#" date-uri="/profil">Profil</a>
	// 				</li>
	// 				<li class="nav-item">
	// 					<a class="nav-link" href="#" date-uri="/">Log Out</a>
	// 				</li>
	// 			</ul>
	// 		</div>
	// 	</nav>
	// `;
	// )
	navbarWrapper.innerHTML = navbar;
};

export default Navbar;

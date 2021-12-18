import HomePage from "../Pages/HomePage";
import AnnoncesPage from "../Pages/AnnoncesPage";
import AuctionAddPage from "../Pages/AuctionAddPage"
import AuctionUpdatePage from "../Pages/AuctionUpdatePage";
import VendeursPage from "../Pages/VendeursPage";
import SignupPage from "../Pages/SignupPage";
import LoginPage from "../Pages/LoginPage";
import Logout from "../Logout/Logout";
import ProfilPage from "../Pages/ProfilPage";

// Configure your routes here
const routes = {
	"/": HomePage,
	"/annonces": AnnoncesPage,
	"/auction/add": AuctionAddPage,
	"/auction/update": AuctionUpdatePage,
	"/vendeurs": VendeursPage,
	"/signup": SignupPage,
	"/login": LoginPage,
	"/logout": Logout,
	"/profil": ProfilPage
};

/**
 * Deal with call and auto-render of Functional Components following click events
 * on Navbar, Load / Refresh operations, Browser history operation (back or next) or redirections.
 * A Functional Component is responsible to auto-render itself : Pages, Header...
 */

const Router = () => {
	/* Manage click on the Navbar */
	let navbarWrapper = document.querySelector("#navbarWrapper");
	navbarWrapper.addEventListener("click", e => {
		// To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase).
		let uri = e.target.dataset.uri;

		if (uri) {
			e.preventDefault();
			/* use Web History API to add current page URL to the user's navigation history
       & set right URL in the browser (instead of "#") */
			window.history.pushState({}, uri, window.location.origin + uri);
			/* render the requested component
      NB : for the components that include JS, we want to assure that the JS included 
      is not runned when the JS file is charged by the browser
      therefore, those components have to be either a function or a class*/
			redirection(uri);
		}
	});

	/* Route the right component when the page is loaded / refreshed */
	window.addEventListener("load", e => {
		redirection(window.location.pathname);
	});

	// Route the right component when the user use the browsing history
	window.addEventListener("popstate", () => {
		const componentToRender = routes[window.location.pathname];
		componentToRender();
	});
};

/**
 * Call and auto-render of Functional Components associated to the given URL
 * @param {*} uri - Provides an URL that is associated to a functional component in the
 * routes array of the Router
 */

const Redirect = uri => {
	// use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
	window.history.pushState({}, uri, window.location.origin + uri);
	// render the requested component
	redirection(uri);
};

function redirection(URLPath){
	const parsedURL = URLPath.split('?');
	const uri = parsedURL[0];
	const params = parsedURL[1];
	const componentToRender = routes[uri];
	if (routes[uri]) {
		componentToRender(params);
	} else {
		throw Error("The " + uri + " ressource does not exist");
	}
}

export { Router, Redirect };

import { Redirect } from "../Router/Router";
import { getSessionObject } from "../../utils/session";

/**
 * Render the ProfilPage
 */

const ProfilPage = () => {
	let user = getSessionObject("user");
	if(! user) return Redirect("/login");
	

	// reset #page div
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = "";
};

export default ProfilPage;

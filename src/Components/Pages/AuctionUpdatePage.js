
import HomePage from "./HomePage";
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session";

/**
 * Render the HomePage
 */

const AuctionUpdatePage = () => {
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = `<br> Deal with the content of your AuctionUpdatePage`;
};

export default AuctionUpdatePage;

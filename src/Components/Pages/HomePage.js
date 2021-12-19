/**
 * Render the HomePage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
 import "../../stylesheets/homePageStyle.css";

const HomePage = async () => {
	const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML='';
    let tabEndSoon = await getEndingData();

    let alternate = false;
    
    createTab(pageDiv, tabEndSoon, "Annonces finissant bientôt", alternate);

    let tabRecentDate = await getRecentData();

    pageDiv.innerHTML += `<p></p>`;

    createTab(pageDiv, tabRecentDate, "Nouvelles annonces", alternate);

};

export function createTab(page, pictures, titleTab, alternate){
    const info = document.createElement("div");
	info.className = "tab-content p-4 p-md-5 my-5";

	const title = document.createElement("h2");
	title.className = "mb-4";
	title.innerText = titleTab;

	const rows = document.createElement("div");
	rows.className = "row";

	pictures.forEach(picture =>{
        appendRow(rows, picture, alternate);
        if (alternate) alternate = false;
        else alternate = true;
    })

	info.appendChild(title);
	info.appendChild(rows);
	page.appendChild(info);
};

function appendRow(row, picture, alternate){
    const info = document.createElement("div");
	info.className = "col-md-6";

    const a = document.createElement("a");
    a.className = "column col-xs-6"
    a.id = "caption";

    const span = document.createElement("span");
    span.className = "text";

    const h1 = document.createElement("h1");
    h1.innerText = picture.name;
    
    if (alternate) {
        const test = document.createElement("div");
        test.className = "col-md-6";
        row.appendChild(test);
    }

	const image = document.createElement("img");
	image.className = "img-responsive img-fluid img-thumbnail mb-3";
    image.src = picture.cover_photo;
    image.style = "cursor: pointer;";
    image.addEventListener("click", onSubmit, false);
    image.setAttribute("id_auction", picture.id_auction);

    span.appendChild(h1);
    a.appendChild(span);
    a.appendChild(image);
	info.appendChild(a);
	row.appendChild(info);

    if (! alternate) {
        const test = document.createElement("div");
        test.className = "col-md-6";
        row.appendChild(test);
    }
};

function onSubmit(e){
    return Redirect("/annonces/id?"+e.currentTarget.getAttribute("id_auction"));
};
    
async function getEndingData() {
  
  try {
      const optionsAuction = {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
           // body data type must match "Content-Type" header
          headers: {
              "Content-Type": "application/json",
          },
      };

      const responseAuction = await fetch('/api/auctions/endingAuctions', optionsAuction); // fetch return a promise => we wait for the response
      
      if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'affichage des annonces.");

      const data = await responseAuction.json(); // json() returns a promise => we wait for the data
      return data;
      
  } catch (error) {
      console.error("Page::error: ", error);
      return undefined;
  }

};

async function getRecentData() {
  
  try {
      const optionsAuction = {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
           // body data type must match "Content-Type" header
          headers: {
              "Content-Type": "application/json",
          },
      };

      const responseAuction = await fetch('/api/auctions/recentAuctions', optionsAuction); // fetch return a promise => we wait for the response

      if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'affichage des annonces.");

      const data = await responseAuction.json(); // json() returns a promise => we wait for the data
      return data;
      
  } catch (error) {
      console.error("Page::error: ", error);
      return undefined;
  }

};

export default HomePage;

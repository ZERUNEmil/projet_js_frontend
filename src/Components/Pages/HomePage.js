/**
 * Render the HomePage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
/*const  { rows } = await pool.query('SELECT * FROM project.user WHERE id_user = $1', [id]);
if (! rows) return;
return rows[0];
*/


const HomePage = async () => {
 
	const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML='';
  let tab = await getEndingData();
  let tableAuctions = '';  
  console.log("WA")

  Array.prototype.forEach.call(tab,auction => {
    let htmlSegment = `<div class="auction">
    <img src="${auction.cover_photo}" >
    <h2>${auction.name}</h2>
</div>`;

tableAuctions += htmlSegment;

});

pageDiv.innerHTML += `<br> 
	<div class="row">		
	<div class="column">
	`;
pageDiv.innerHTML += tableAuctions;
pageDiv.innerHTML +=`</div> 

<div style ="background:purple; border-radius:25px; margin:150px; padding:50px; font-size:35px;">
Les annonces actives récemment
</div>`

let tabRecent = await getRecentData();
console.log("RECENT"+tabRecent)
let tableRecent = '';  
Array.prototype.forEach.call(tabRecent,auction => {
  let htmlSegment = `<div class="auction">
  <img src="${auction.cover_photo}" >
  <h2>${auction.name}</h2>
</div>`;

tableRecent += htmlSegment;
pageDiv.innerHTML += tableRecent;
});

    
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
      console.log("ENDING"+data)
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

      console.log(optionsAuction);

      const responseAuction = await fetch('/api/auctions/recentAuctions', optionsAuction); // fetch return a promise => we wait for the response

      if (!responseAuction.ok) alert("Une erreur s'est produite lors de l'affichage des annonces.");

      const data = await responseAuction.json(); // json() returns a promise => we wait for the data
      return data;
      
  } catch (error) {
      console.error("Page::error: ", error);
      return undefined;
  }

}
}

export default HomePage;

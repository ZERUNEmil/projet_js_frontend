/**
 * Render the HomePage
 */
 import {Redirect} from "../Router/Router";
 import Navbar from "../Navbar/Navbar";
/*const  { rows } = await pool.query('SELECT * FROM project.user WHERE id_user = $1', [id]);
if (! rows) return;
return rows[0];
*/


const HomePage = () => {
	const pageDiv = document.querySelector("#page");

  
	pageDiv.innerHTML = `
  
  <br><h1> All'Astra <h1>
  <div class="container">


<div style="padding:25px;  background:#9D4F96; border-radius:25px; margin:200px " >
<h1>Les enchères les plus actives du moment</h1>
</div>

<div class="row">		
<div class="columnHome">
  <img src="https://i.ibb.co/wCbQPWM/veil.png">
</div>
<div class="columnHome">
  <img src="https://i.ibb.co/kKfRzVr/diner.jpg">
</div>
<div class="columnHome">
  <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
</div>
<div class="columnHome">
  <img src="https://i.ibb.co/QNvvyQX/pearl.jpg">
</div>
`;

};


export default HomePage;

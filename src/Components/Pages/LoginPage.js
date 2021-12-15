import HomePage from "./HomePage";
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session";



/**    Version 1
  const form = document.createElement("form");
  form.className = "p-5";
  form.id ="login-form";
  

  //email
  const email = document.createElement("input");
  email.type = "text";
  email.id = "email";
  email.placeholder = "email";
  email.required = true;
  email.className = "form-control mb-3";

  //password
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "password";
  password.className = "form-control mb-3";

  //submit
  const submit = document.createElement("input");
  submit.value = "Login";
  submit.type = "submit";
  submit.className = "btn btn-danger";

  //error message
  const message = document.createElement("div");
  message.id = "message";

  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(submit);
  form.appendChild(message);
 */


//    Version 2
 let loginPage =`
 <form id="loginForm">
   <div class="container py-4"><br><br>
     <div class="row d-flex justify-content-center align-items-center h-100">
       <div class="col-12 col-md-8 col-lg-6 col-xl-5">
         <div class="login-form" style="border-radius: 1rem;">
           <div class="card-body px-5 py-4 text-center">
             <div class="mt-md-4 pb-3">
               <h2 class="fw-bold mb-4 text-uppercase">Login</h2>
               <p class="text-white-50 mb-5">Veuillez entrer votre email et mot de passe</p><br>
               <div class="form-outline form-white mb-4">
                 <input type="email" id="email" class="form-control form-control-lg" />
                 <label class="form-label" for="email">Email</label>
               </div>
               <div class="form-outline form-white mb-4">
                 <input type="password" id="password" class="form-control form-control-lg" />
                 <label class="form-label" for="pasword">Mot de passe</label><br><br>
               </div>
               <button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button><br><br>								
               <p class="mt-4">Vous n'avez pas encore de compte ? <a href="/signup" class="text-white-50 fw-bold">Sign Up</a></p>
               <div id="message"></div>
             </div>
           </div>
         </div>
       </div>
     </div>
  </div>
 </form>
 `;


function LoginPage() {
  // reset #page div

  const pageDiv = document.querySelector("#page");
  
  pageDiv.innerHTML = loginPage;
  const loginForm = document.getElementById("loginForm");

  let user = getSessionObject("user");
  if (user) {
    // re-render the navbar for the authenticated user
    Navbar();
    Redirect("/");
  } else {
    loginForm.addEventListener("submit", onSubmit);
  }
};


  async function onSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    console.log("credentials", email.value, password.value);
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

     
      const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        throw new Error(
          "fetch error : " + response.status + " : " + response.statusText
        );
      }
      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // save the user into the localStorage
      setSessionObject("user", user);

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      Navbar({ isAuthenticated: true });

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("LoginPage::error: ", error);
      errorMessage('Aucun compte correspondant');
      //alert("Attention : Aucun compte correspondant");
    }
  }

function errorMessage(message) {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=
  '<br><div class="alert alert-danger" role="alert">  Attention : '+ message  + ' </div>';
  throw new Error("fetch error");
}


export default LoginPage;
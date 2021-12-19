
import HomePage from "./HomePage";
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
import { getSessionObject } from "../../utils/session";
import "../../stylesheets/profileStyle.css";

 /*    version 1
  // create a login form
  const form = document.createElement("form");
  form.className = "p-5";  
  form.id ="signup-form";

  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.placeholder = "Type your firstname";
  username.required = true;
  username.className = "form-control mb-3";

  const userlastname = document.createElement("input");
  userlastname.type = "text";
  userlastname.id = "userlastname";
  userlastname.placeholder = "Type your lastname";
  userlastname.required = true;
  userlastname.className = "form-control mb-3";

  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  password.placeholder = "Type your password";
  password.className = "form-control mb-3";

  const password2 = document.createElement("input");
  password2.type = "password";
  password2.id = "password2";
  password2.required = true;
  password2.placeholder = "Confirme your password";
  password2.className = "form-control mb-3";

  const email = document.createElement("input");
  email.type = "text";
  email.id = "email";
  email.placeholder = "Type your email address";
  email.required = true;
  email.className = "form-control mb-3";

  const address = document.createElement("input");
  address.type = "text";
  address.id = "address";
  address.placeholder = "Type your addresss";
  address.required = false;
  address.className = "form-control mb-3";

  const submit = document.createElement("input");
  submit.value = "Register";
  submit.type = "submit";
  submit.className = "btn btn-danger";

  //error message
  const message = document.createElement("div");
  message.id = "message";

  
  form.appendChild(username);
  form.appendChild(userlastname);
  form.appendChild(password);
  form.appendChild(password2);
  form.appendChild(email);
  form.appendChild(address);
  form.appendChild(submit);
  
  form.appendChild(message);

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);
 */
 
 //    version 2     align-items-center 
  let signupPage =`
  <form id="signupForm">
	<div class="container-sm">
		<br>
		<br>
		<div class="signup-form px-4 " style="border-radius: 1rem;">
			<div class="card-body px-5 py-4 text-center">
				<h2 class="fw-bold mb-4 text-uppercase">Sign up</h2>
				<p class="text-white-50 mb-5">
					Remplissez les champs avec vos données
				</p>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<i class="fa fa-user"></i>
							<input type="text" id="firstName" class="form-control form-control-lg" placeholder="Prénom" required /><br>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<i class="fa fa-user"></i>
							<input type="text" id="lastName" class="form-control form-control-lg" placeholder="Nom" required /><br>
						</div>
					</div>
				</div>
				<div class="form-outline form-white mb-4">
					<i class="fa fa-envelope"></i>
					<input type="email" id="email" class="form-control form-control-lg" placeholder="Email" required /><br>
				</div>
				<div class="row">
					<div class="col">
						<div class="form-outline form-white mb-4">
							<i class="fa fa-lock"></i>
							<input type="password" id="password1" class="form-control form-control-lg" placeholder="Mot de passe" required /><br>
						</div>
					</div>
					<div class="col">
						<div class="form-outline form-white mb-4">
							<i class="fa fa-lock"></i>
							<input type="password" id="password2" class="form-control form-control-lg" placeholder="Confirmation du mot de passe" required /></div>
					</div>
				</div>
					<button class="btn btn-outline-light btn-lg px-5" type="submit">Sign Up</button>
					<br>
					<p class="mt-4">
						Vous avez déjà un compte ?
						<a href="/login" class="text-white-50 fw-bold">Login</a>
					</p>
					<div id="message"></div>
				</div>
			</div>
		</div>
	</form>
	<br><br>
	<br><br>
  `;
  
  
function SignupPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";

  pageDiv.innerHTML = signupPage;
  const signupForm = document.getElementById("signupForm");

  let user = getSessionObject("user");
  if (user) {
    // re-render the navbar for the authenticated user
    Navbar();
    Redirect("/");
  } else {
    signupForm.addEventListener("submit", onSubmit);
  }
};

 
  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("firstName");
    const userlastname = document.getElementById("lastName");
    const password = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const email = document.getElementById("email");

    if(username.value === "" || userlastname.value === "" || password.value === "" ){
      errorMessage('Tous les champs sont obligatoires');
    }

    if(password.value !== password2.value){
      errorMessage('Les mots de passe ne corespondent pas');
    }
    
    if(! email.value.match('[a-zA-Z0-9+.-]+@[a-zA-Z0-9+.-]+.[a-zA-Z0-9+.-]+')){
      errorMessage('Cette email n\'est pas valide');
    }

    console.log("credentials", username.value, userlastname.value, password.value, email.value  );
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({		  
          username: username.value,
          userlastname: userlastname.value,
          password: password.value,
          email: email.value
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/signup", options); // fetch return a promise => we wait for the response
     
        if (!response.ok) {
          if (response.status === 304) errorMessage("Compte non-modifié");
          if (response.status === 420) errorMessage("Paramètres invalides");
            throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
       
      }

      const user = await response.json(); // json() returns a promise => we wait for the data
      console.log("user authenticated", user);
      // what to do whith the token ? To be dealt with in next step

      // Rerender the navbar for an authenticated user : temporary step prior to deal with token
      setSessionObject("user",user);
      Navbar({isAuthenticated:true});

      // call the HomePage via the Router
      Redirect("/");
    } catch (error) {
      console.error("SignupPage::error: ", error);
      errorMessage('Cette email existe déjà');
    }
  }




function errorMessage(message) {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=
  '<br><div class="alert alert-danger" role="alert">  Attention : '+ message  + ' </div>';
  throw new Error("fetch error");
}

export default SignupPage;

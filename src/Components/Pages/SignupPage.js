
import HomePage from "./HomePage";
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";

/**
 * View the Signup form :
 * render a Signup page into the #page div (formerly render function)
 */
 
 
 
function SignupPage() {
  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
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

  async function onSubmit(e) {
    e.preventDefault();
    const username = document.getElementById("username");
    const userlastname = document.getElementById("userlastname");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    if(password.value !== password2.value){
      errorPassewords();
    }

    if(! email.value.match('[a-zA-Z0-9+.-]+@[a-zA-Z0-9+.-]+.[a-zA-Z0-9+.-]+')){
      errorEmail();
    }

    console.log("credentials", username.value, userlastname.value, password.value, email.value, address.value,  );
    try {
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({		  
          username: username.value,
          userlastname: userlastname.value,
          password: password.value,
          email: email.value,
          address: address.value,
        }), // body data type must match "Content-Type" header
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/signup", options); // fetch return a promise => we wait for the response

      if (!response.ok) {
        errorSignup();
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
      errorSignup();
    }
  }
}



function errorPassewords() {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=`<br><div class="alert alert-danger" role="alert">
     Attention : Les mots de passe sont differents</div>`;
  throw new Error("fetch error");
}

function errorEmail() {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=`<br><div class="alert alert-danger" role="alert">
     Attention : Cette email n'est pas valide</div>`;
  throw new Error("fetch error");
}

function errorSignup() {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=`<br><div class="alert alert-danger" role="alert">
     Attention : Cette email existe déjà</div>`;
  throw new Error("fetch error");
}




export default SignupPage;

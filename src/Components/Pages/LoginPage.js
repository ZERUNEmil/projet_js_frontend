import HomePage from "./HomePage";
import {Redirect} from "../Router/Router";
import Navbar from "../Navbar/Navbar";
import { setSessionObject } from "../../utils/session";
/**
 * View the Login form :
 * render a login page into the #page div (formerly login function)
 */
function LoginPage() {


  // reset #page div
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
  // create a login form
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

  form.addEventListener("submit", onSubmit);
  pageDiv.appendChild(form);

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
      errorLogin();
      //alert("Attention : Aucun compte correspondant");
    }
  }
}

function errorLogin() {
  console.log("alert");
  const alertDiv = document.getElementById("message");
  alertDiv.innerHTML=`<br><div class="alert alert-danger" role="alert">
     Attention : Aucun compte correspondant</div>`;
  throw new Error("fetch error");
}


export default LoginPage;
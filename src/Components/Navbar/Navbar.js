// When using Bootstrap to style components, the CSS is imported in index.js
// However, the JS has still to be loaded for each Bootstrap's component that needs it.
// Here, because our JS component 'Navbar' has the same name as Navbar Bootstrap's component
// we change the name of the imported Bootstrap's 'Navbar' component
import { Navbar as BootstrapNavbar } from "bootstrap";
import { getSessionObject } from "../../utils/session";

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */
 const Navbar = () => {
    const navbarWrapper = document.querySelector("#navbarWrapper");
    let navbar;
    // Get the user object from the localStorage
    let user = getSessionObject("user");
  
    if (!user) {
      navbar =  `
            <nav class="navbar navbar-light bg-light navbar-expand-md bg-faded justify-content-center">
                <a href="#" data-uri="/" class="navbar-brand d-flex w-25 px-3 mr-auto">All'Asta</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse w-100" id="Navbar">
                    <ul class="navbar-nav w-100 justify-content-left">
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/annonces">Annonces</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/vendeurs">Vendeurs</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav w-100 justify-content-center">
                        <li>
                            <div class="input-group rounded">
                                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <span class="input-group-text border-0" id="search-addon">
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav ml-auto w-100 justify-content-end px-3">
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/login">Log in</a>
                            </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/signup">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
    } else {
        navbar = `
            <nav class="navbar navbar-light bg-light navbar-expand-md bg-faded justify-content-center">
                <a href="#" data-uri="/" class="navbar-brand d-flex w-25 px-3 mr-auto">All'Asta</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse w-100" id="Navbar">
                    <ul class="navbar-nav w-100 justify-content-left">
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/annonces">Annonces</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/vendeurs">Vendeurs</a>
                        </li>
                            <a class="nav-link" href="#" data-uri="/auction/add">Add</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/auction/update">Update</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav w-100 justify-content-center">
                        <li>
                            <div class="input-group rounded">
                                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <span class="input-group-text border-0" id="search-addon">
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav ml-auto w-100 justify-content-end px-3">
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/profil">Profil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-uri="/logout">Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        `;
    }    
    navbarWrapper.innerHTML = navbar;
};

export default Navbar;

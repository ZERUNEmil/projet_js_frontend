const Footer = () => {
  const footerDiv = document.querySelector("footer");

  // Create the audio and load the file via webpack file-loader
  //const footer = `<h1>But we also love JS</h1>`;
  footerDiv.innerHTML = footer;

  const footer = `
  <!-- Grid container -->
  <div class="container p-4" id="infosFooter">




    

    <!-- Section: Text -->
    <section class="mb-4">
      <p>
        Voici All' Asta, l'application que nous avons développé en groupe pour le projet Web 2. 
         All’ Asta (A la vente aux enchères), est une application de service de vente aux enchères d’œuvre d’art en ligne. 
         </p>
    </section>
    <!-- Section: Text -->


    
    <!-- Section: Social media -->
    <section class="mb-6">
      <!-- Facebook -->
      <a class="btn btn-primary btn-floating m-1"  id="linkFooter"  href="#!" role="button"><i class="fab fa-facebook-f"></i></a>
      <!-- Google -->
      <a class="btn btn-primary btn-floating m-1"  id="linkFooter"  href="https://e-vinci.github.io/myjscourse/" role="button"><i class="fab fa-google"></i></a>
      <!-- Linkedin -->
      <a class="btn btn-primary btn-floating m-1"  id="linkFooter"  href="#!" role="button"><i class="fab fa-linkedin-in"></i></a>
      <!-- Github -->
      <a class="btn btn-primary btn-floating m-1"  id="linkFooter"  href="https://github.com/ZERUNEmil/projet_js_frontend" role="button"><i class="fab fa-github"></i></a>
      <!-- Github -->
      <a class="btn btn-primary btn-floating m-1"  id="linkFooter"  href="https://github.com/ZERUNEmil/projet_js_backend" role="button"><i class="fab fa-github"></i></a>
    
    </section>
    <!-- Section: Social media -->

  </div>
  <!-- Grid container -->

  <!-- Copyright -->
  <div class="text-center p-3" id="copyrightFooter">
    © 2020 Copyright:
    <a class="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
  <!-- Copyright -->
        `;
        footerDiv.innerHTML = footer;     
};


// <!-- Section: Names -->
// <section class="">
//   <div class="row">
//     <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
//       <h5 class="text-uppercase">Vanmuysewinkel</h5>
//     </div>

//     <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
//       <h5 class="text-uppercase">Croquet</h5>
//     </div>

//     <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
//       <h5 class="text-uppercase">Edwards</h5>
//     </div>

//     <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
//       <h5 class="text-uppercase">Zerun</h5>
//     </div>
//   </div><br><br>
// </section>
// <!-- Section: Links -->

export default Footer;

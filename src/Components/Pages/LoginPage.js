import { Redirect } from "../Router/Router";

/**
 * Render the NewPage :
 * Just an example to demonstrate how to use the router to "redirect" to a new page
 */
function LoginPage() {
	// Deal with your NewPage content here
	const pageDiv = document.querySelector("#page");
	pageDiv.innerHTML = `
	<section class="gradient-custom">
		<div class="container py-4">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-6 col-xl-5">
					<div class="card bg-dark text-white" style="border-radius: 1rem;">
						<div class="card-body px-5 py-4 text-center">

							<div class="mt-md-4 pb-3">

								<h2 class="fw-bold mb-4 text-uppercase">Login</h2>
								<p class="text-white-50 mb-5">Please enter your login and password!</p>

								<div class="form-outline form-white mb-4">
									<input type="email" id="typeEmailX" class="form-control form-control-lg" />
									<label class="form-label" for="typeEmailX">Email</label>
								</div>

								<div class="form-outline form-white mb-4">
									<input type="password" id="typePasswordX" class="form-control form-control-lg" />
									<label class="form-label" for="typePasswordX">Password</label>
								</div>

								<p class="small mb-4 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

								<button class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

								<div class="d-flex justify-content-center text-center mt-3 pt-1">
									<a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
									<a href="#!" class="text-white"><i class="fab fa-twitter mx-4 fa-lg"></i></a>
									<a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
								</div>
								
								<p class="mt-4">Don't have an account? <a href="#!" class="text-white-50 fw-bold">Sign Up</a></p>
							</div>


						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	`;
}

export default LoginPage;

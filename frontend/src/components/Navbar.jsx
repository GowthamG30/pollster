import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">	
				<a href="#" class="navbar-brand">Pollster</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarToggler">
					<ul class="navbar-nav ml-auto">
						<li class="nav-item">
							<a class="nav-link" href="#pricing">Public Polls</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#cta">About Us</a>
						</li>
					</ul>
				</div>
			</nav>
  );
}

export default Navbar;
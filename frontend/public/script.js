const toggleButton = document.querySelector('.hamburger');
// console.log(toggleButton);
const navList = document.querySelector('.nav-list');
// console.log(navList);

toggleButton.addEventListener('click', () => {
	navList.classList.toggle('navbar-toggle');
});

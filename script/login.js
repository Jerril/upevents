// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// when search is clicked
	document.getElementById('signin-form').addEventListener('submit', handleSubmit);
}

eventListeners();

//functions
// get a unique id
function uniqueID() {
	return Math.floor(Math.random() * Date.now());
}

//
function init() {
	// navbar init
	const currUser = db.isLoggedIn();

	if(currUser) {
		// redirect to the index page
		let locArr = window.location.href.split('/');		
		if(locArr[locArr.length-1] === 'login.html' ) {
			locArr[locArr.length-1] = `index.html`;
			window.location.href = locArr.join('/');
		}
	}
}

// handle submit
function handleSubmit(e) {
	e.preventDefault();

	const { email, password } = e.target;

	//
	const userData = {
		"email": email.value,
		"password": password.value
	}

	// save new user in database
	if(db.loginAdmin(userData)) {
		// redirect to the index page
		let locArr = window.location.href.split('/');		
		if(locArr[locArr.length-1] === 'login.html' ) {
			locArr[locArr.length-1] = `index.html`;
			window.location.href = locArr.join('/');
		}
	}else {
		const loc = document.querySelector('#signin-form div.error');
		ui.printMessage("Invalid, Check entered email/password", loc);
	}
}
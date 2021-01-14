// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// when search is clicked
	document.getElementById('register-form').addEventListener('submit', handleSubmit);
}

eventListeners();

// functions
//
function init() {
	// navbar init
	const currUser = db.isLoggedIn();
	console.log(currUser);
	const authDiv = document.querySelector('.main-nav .auth');

	if(currUser) {
		// redirect to the index page
		let locArr = window.location.href.split('/');		
		if(locArr[locArr.length-1] === 'register.html' ) {
			locArr[locArr.length-1] = `index.html`;
			window.location.href = locArr.join('/');
		}
	}
}

// get a unique id
function uniqueID() {
	return Math.floor(Math.random() * Date.now());
}

// handle submit
function handleSubmit(e) {
	e.preventDefault();

	const { email, password, cf_password } = e.target;

	// check if password & cf_password match
	if(password.value === cf_password.value) {
		// get uniqueId
		const userData = {
			"id": uniqueID(),
			"email": email.value,
			"password": password.value
		}

		// save new user in database
		db.registerAdmin(userData);

		// redirect to the index page
		let locArr = window.location.href.split('/');		
		if(locArr[locArr.length-1] === 'register.html' ) {
			locArr[locArr.length-1] = `index.html`;
			window.location.href = locArr.join('/');
		}
	}else {
		const loc = document.querySelector('#register-form div.error');
		ui.printMessage("Password does not match", loc);
	}
}
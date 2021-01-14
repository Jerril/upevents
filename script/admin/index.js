// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// event delegation - logout button
	document.querySelector('.main-nav .auth').addEventListener('click', e => {
		if(e.target.classList.contains('logoutBtn')) {
			e.preventDefault();
			
			// clear session
			db.logoutAdmin()

			// redirect to homepage
			let locArr = window.location.href.split('/');
			locArr.pop();
			locArr[locArr.length-1] = 'index.html';
			window.location.href = locArr.join('/');
		}
	});

	// event delegation - delete button
	document.querySelector('.admin-body ul').addEventListener('click', e => {
		if(e.target.classList.contains('deleteBtn')) {
			const id = e.target.dataset.id;

			// delete event from local storage
			db.deleteFromLS(id);

			// reload current page
			location.reload();
		}
	});
}

eventListeners();


// functions
function init() {
	// navbar init
	const currUser = db.isLoggedIn();
	const authDiv = document.querySelector('.main-nav .auth');

	if(currUser) {
		authDiv.innerHTML = `
			<li><a href="">signed in as ${currUser}</a></li>
			<li><a class="logoutBtn" href="">logout</a></li>
		`;
	}else {
		// not accessible
		let locArr = window.location.href.split('/');
		locArr.pop();
		locArr[locArr.length-1] = 'index.html';
		window.location.href = locArr.join('/');
	}

	// get the events in database
	const allEvents = db.getFromLS();

	// display the events in the admin-UI
	const loc = document.querySelector('.admin .admin-body');
	if(allEvents.length >= 1) {
		ui.displayEventsAdmin(allEvents);
	}else {
		ui.printMessage("There are no added events", loc);
	}
}
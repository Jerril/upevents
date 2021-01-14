// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// when search is clicked
	document.getElementById('search').addEventListener('submit', e => {
		e.preventDefault();

		const query = document.querySelector('#search .form--input').value;

		if (query && query.trim()) {
			let locArr = window.location.href.split('/');
		
			if(locArr[locArr.length-1] === 'index.html' ) {
				locArr[locArr.length-1] = `search.html?q=${query}`;
				window.location.href = locArr.join('/');
			}
		};
	});

	// event delegation
	document.querySelector('.main-nav .auth').addEventListener('click', e => {
		if(e.target.classList.contains('logoutBtn')) {
			e.preventDefault();
			
			// clear session
			db.logoutAdmin()

			// redirect to homepage
			let locArr = window.location.href.split('/');
			locArr[locArr.length-1] = 'index.html';
			window.location.href = locArr.join('/');
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
			<li><a href="admin/index.html">signed in as ${currUser}</a></li>
			<li><a class="logoutBtn" href="logout.html">logout</a></li>
		`;
	}

	// initialize localstorage
	// db.initLS();

	// get the events in database
	const allEvents = db.getFromLS();

	// display the events in the UI
	const loc = document.querySelector('#events .grid');
	if(allEvents.length >= 1) {
		ui.displayEvents(allEvents, loc, query=null);
	}else {
		ui.printMessage("There are no upcoming events currently.", loc);
	}
}
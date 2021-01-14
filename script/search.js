// instanciate the classes classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

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
	
	// get the search term from the URL query string
	const query = document.location.search.split('=')[1].split('%20');
	
	// get events by search
	const events = db.getEventsBySearch(query);

	// display events
	const loc = document.querySelector('#result .grid');
	if(events.length >= 1){
		ui.displayEvents(events, loc, query.join(' '));
	}else {
		ui.printMessage("No results found.", loc);
	}
}
// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// when search is clicked
	document.getElementById('create-form').addEventListener('submit', handleSubmit);

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
}

eventListeners();

//functions
//
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
}

// get a unique id
function uniqueID() {
	return Math.floor(Math.random() * Date.now());
}

// handle submit
function handleSubmit(e) {
	e.preventDefault();

	const { title, image, host,location, date, start_time, end_time, leap, meetup, recruiting_mission, hackathon, free_paid, description } = e.target;

	// get uniqueId

	const eventData = {
		"id": uniqueID(),
		"title": title.value,
		"image": image.value,
		"host": host.value,
		"location": location.value,
		"date": date.value,
		"start_time": start_time.value,
		"end_time": end_time.value,
		"leap": leap.value,
		"meetup": meetup.value,
		"recruiting_mission": recruiting_mission.value,
		"hackathon": hackathon.value,
		"free_paid": free_paid.value,
		"description": description.value
	}

	// sanitize user input
	// const response    = processUser(username.value, password.value);

	// save new event in database
	db.saveIntoLS(eventData);

	// redirect to the index page
	let locArr = window.location.href.split('/');		
	if(locArr[locArr.length-1] === 'create.html' ) {
		locArr[locArr.length-1] = `index.html`;
		window.location.href = locArr.join('/');
	}
}
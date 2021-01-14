// instanciate the classes
const db = new UpEventsDB(),
	  ui = new UpEventsUI();


// event listeners
function eventListeners() {
	// when page loads
	window.addEventListener('DOMContentLoaded', init);

	// when search is clicked
	document.getElementById('edit-form').addEventListener('submit', handleSubmit);

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

// functions
// get event id
function getEventId() {
	return document.location.search.split('=')[1];
}

// initialize form
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

	// get the event id from the URL query string
	const id = getEventId();

	// get event based on ID
	const event = db.getEventById(id);

	// populate the form based on retrieved data
	const { title, image, host, location, date, start_time, end_time, leap, meetup, recruiting_mission, hackathon, free_paid, description } = document.getElementById('edit-form');
	
	//
	title.value = event.title,
	image.value = event.image,
	host.value = event.host,
	location.value = event.location,
	date.value = event.date,
	start_time.value = event.start_time,
	end_time.value = event.end_time
	leap.value = event.leap,
	meetup.value = event.meetup,
	recruiting_mission.value = event.recruiting_mission,
	hackathon.value = event.hackathon,
	free_paid.value = event.free_paid,
	description.value = event.description;
}

// handle submit
function handleSubmit(e) {
	e.preventDefault();

	const id = getEventId();

	const { title, image, host,location, date, start_time, end_time, leap, meetup, recruiting_mission, hackathon, free_paid, description } = e.target;

	const newEvent = {
		"id": id,
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

	// get the all events from database
	const events = db.getFromLS();

	// get index of updated event
	const eventIndex = events.findIndex(event => event.id == id)

	// insert updated event
	events.splice(eventIndex, 1, newEvent);

	// save events in database
	db.initLS(events);

	// redirect to the index page
	let locArr = window.location.href.split('/');		
	if(locArr[locArr.length-1] === `edit.html?id=${id}` ) {
		locArr[locArr.length-1] = `index.html`;
		window.location.href = locArr.join('/');
	}
}
class UpEventsDB {

	/*
		events
	*/

	// initialize local storage
	initLS(events) {
		localStorage.setItem('events', JSON.stringify(events));
	}

	// clear local storage
	clearLS() {
		localStorage.remove('events');
	}

	// get data from local storage
	getFromLS() {
		let events = localStorage.getItem('events');

		if(events === null) {
			events = [];
		} else {
			events = JSON.parse(events);
		}

		return events;
	}

	// save data into localstorage
	saveIntoLS(event) {
		// get all events
		const events = this.getFromLS();

		events.push(event)

		// save into LS
		localStorage.setItem('events', JSON.stringify(events));
	}

	// get event by id
	getEventById(id) {
		// get all events
		const events = this.getFromLS();

		const event = {...events.filter(item => item.id == id)[0]};

		return event;

	}

	// get events by search
	getEventsBySearch(query) {
		// get all events
		const events = this.getFromLS();

		let foundEvents = [];

		// search ops
		query.forEach(item => {
            // create the match/check algo or regex
            const regex = new RegExp(`${item}`, 'gi');
            // 2. check if the query appears in name/desc of any of the event in DB using the above algo
            events.forEach(event => {
                // if it appears; it means the user might need it
                if (event["title"].search(regex) >= 0 || event["description"].search(regex) >= 0){
                    
                    // check if event not in the array yet.
                    if(foundEvents.length > 0){
                        foundEvents.forEach(et => {
                            if(!Object.is(event, et)){
                                // If not in, push it into a new arr; else do nothing
                                foundEvents.push(event);
                            }
                        })
                    }else{
                        foundEvents.push(event);
                    }
                }
            });
        });

		return foundEvents;
	}

	// delete event from local storage
	deleteFromLS(id) {
		// get the all events from database
		const events = this.getFromLS();

		// get index of updated event
		const eventIndex = events.findIndex(event => event.id == id)

		// delete event
		events.splice(eventIndex, 1);

		// save updated events in database
		db.initLS(events);
	}

	/* 
		admin
	*/

	// get admin
	getAdmin() {
		let admin = localStorage.getItem('admin');

		if(admin === null) {
			admin = null;
		}else{
			admin = JSON.parse(admin);
		}

		return admin;
	}

	// register admin into local storage
	registerAdmin(data) {
		// create user
		localStorage.setItem('admin', JSON.stringify(data));

		// login user
		sessionStorage.setItem('currentUser', data.email);
	}

	// login admin
	loginAdmin(data) {
		// get admin from db
		const admin = this.getAdmin();

		if(admin) {
			// check
			if(data.email === admin.email && data.password === admin.password) {
				// create session
				sessionStorage.setItem('currentUser', data.email);
				//
				return true;
			}
		}

		return false;
	}

	// logout admin
	logoutAdmin() {
		sessionStorage.clear();
	}

	// check if user is logged in
	isLoggedIn() {
		const currUser = sessionStorage.getItem('currentUser');

		if(currUser) {
			return currUser;
		}

		return false;
	}
}
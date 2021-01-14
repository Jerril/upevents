class UpEventsUI {
	
	printMessage(message, loc) {
		loc.innerHTML = `<p>${message}</p>`;
	}

	displayEvents(events, loc, query) {
		let resultHeader = document.querySelector('#result .result--header');
		if(resultHeader) {
			resultHeader.innerHTML = `<h4>${query}</h4> <span>${events.length} result(s)</span>`;
		}

		events.forEach(event => {
			const figure = document.createElement('figure');

			figure.classList.add('grid-item');

			figure.innerHTML = `
				<a href="event.html?id=${event.id}">
					<p class="event-type free">Free</p>
					<div class="image-container">
						<img src="${event.image}" alt="event picture">
					</div>
					<figcaption>
						<p class="date">d: ${event.date} t: ${event.start_time}</p>
						<p class="title">${event.title}</p>
					</figcaption>
				</a>
			`;

			loc.prepend(figure);
		});
	}

	displayEvent(event) {
		const eventsDiv = document.querySelector('#event-details .container');

		eventsDiv.innerHTML = `<section class="event-intro">
			<div class="event-banner">
				<img src="${event.image}" alt="event image">
			</div>

			<div class="event-info">
				<p class="event-date">${event.date}</p>
				<h3 class="event-title">${event.title}</h3>

				<p class="event-host">${event.host}</p>

				<p class="price">Price: Free</p>

				<button class="btn lg">Apply</button>
			</div>
		</section>

		<section class="event-desc">
			<div class="left">
				<h3>About this Event</h3>
				<p>${event.description}</p>
			</div>

			<div class="right">
				<div class="date-time">
					<p>Date And Time</p>
					<p>Fri, Jan 1, 2021, 4:00 AM – Sun, Jan 3, 2021, 6:00 AM WAT</p>
				</div>
				<div class="location">
					<p>Location</p>
					<p>${event.location}</p>
				</div>
			</div>
		</section>`;
	}

	displayEventsAdmin(events) {
		let eventsCountDiv = document.querySelector('.admin .admin--header h4 span');
		if(eventsCountDiv) {
			eventsCountDiv.textContent = `(${events.length})`;
		}

		let eventsSpace = document.querySelector('.admin .admin-body ul');
		events.forEach(event => {
			const li = document.createElement('li');

			li.innerHTML = `<span class="title">${event.title}</span>
							<span class="host">${event.host}</span>
							<span class="price">$500</span>
							<span class="date">${event.date}</span>
							<span class="ops">
								<a href="edit.html?id=${event.id}" class="fas fa-edit edit" title="Edit"></a>
								<button  class="far fa-trash-alt trash deleteBtn" data-id="${event.id}" title="Delete"></button>
								<a href="../event.html?id=${event.id}" class="fas fa-eye view" title="View"></a>
							</span>`;
			eventsSpace.prepend(li);
		});
	}
}
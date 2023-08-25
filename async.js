const BASE_URL = "https://swapi.dev/api/";

let page = 1;
let startingIndex = 1;
let headerAdded = false;
let currentCategory = "";

// paginacja
const pages = document.getElementById("pages");

// prev
let prevButton = document.createElement("button");
let prevText = document.createTextNode("Prev");
prevButton.appendChild(prevText);
pages.appendChild(prevButton);

// next
let nextButton = document.createElement("button");
let nextText = document.createTextNode("Next");
nextButton.appendChild(nextText);
pages.appendChild(nextButton);

const refreshPage = () => {
	if (currentCategory === "") {
		prevButton.disabled = true;
		nextButton.disabled = true;
	} else {
		prevButton.disabled = false;
		nextButton.disabled = false;
	}
	if (page <= 1) {
		prevButton.disabled = true;
	} else prevButton.disabled = false;
};

refreshPage();

const getButtons = async () => {
	const response = await fetch(`${BASE_URL}`);
	const data = await response.json();
	return data;
};

const getData = async (category, page) => {
	const response = await fetch(`${BASE_URL}/${category}?page=${page}`);
	const data = await response.json();
	const results = data.results;
	return results;
};


const generateButtons = async () => {
	const buttons = document.getElementById("buttons");
	const data = await getButtons();
	const names = Object.keys(data);

	for (let i = 0; i < names.length; i++) {
		let navButton = document.createElement("button");
		let navTitle = document.createTextNode(names[i]);
		navButton.appendChild(navTitle);

		navButton.addEventListener("click", async () => {
			currentCategory = names[i];
			const fetchedData = await getData(names[i], page);
			printTable(fetchedData, names[i]);
			refreshPage();
		});
		buttons.appendChild(navButton);
	}
};

// tabelka
const printTable = (val, category) => {
	const table = document.getElementById("table");
	table.innerHTML = "";
	headerAdded = false;
	let html = "";

	val.forEach((element, index) => {
		html += fillCategoryWithData(
			element,
			(index = index + startingIndex),
			category
		);
	});

	table.innerHTML = html;
};

generateButtons();

//
// klasy

class Person {
	constructor({ name, height, mass, gender }, index) {
		this.index = index;
		this.name = name;
		this.height = height;
		this.mass = mass;
		this.gender = gender;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.name}</td>
		<td>${this.height}</td>
		<td>${this.mass}</td>
		<td>${this.gender}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details person index${this.index}">
		details</button><button class="delete person index${
			this.index
		}">delete</button></td>
		</tr>`;
	}
}
class Planet {
	constructor({ name, climate, terrain, population }, index) {
		this.index = index;
		this.name = name;
		this.climate = climate;
		this.terrain = terrain;
		this.population = population;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.name}</td>
		<td>${this.climate}</td>
		<td>${this.terrain}</td>
		<td>${this.population}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details planet index${this.index}">
		details</button><button class="delete planet index${
			this.index
		}">delete</button></td>
		</tr>`;
	}
}
class Film {
	constructor({ title, director, producer, release_date }, index) {
		this.index = index;
		this.title = title;
		this.director = director;
		this.producer = producer;
		this.release_date = release_date;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.title}</td>
		<td>${this.director}</td>
		<td>${this.producer}</td>
		<td>${this.release_date}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details film index${this.index}">
		details</button><button class="delete film index${
			this.index
		}">delete</button></td>
		</tr>`;
	}
}
class Species {
	constructor({ name, classification, designation, average_height }, index) {
		this.index = index;
		this.name = name;
		this.classification = classification;
		this.designation = designation;
		this.average_height = average_height;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.name}</td>
		<td>${this.classification}</td>
		<td>${this.designation}</td>
		<td>${this.average_height}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details species index${this.index}">
		details</button><button class="delete species index${
			this.index
		}">delete</button></td>
		</tr>`;
	}
}

class Vehicle {
	constructor({ name, model, length, passengers }, index) {
		this.index = index;
		this.name = name;
		this.model = model;
		this.length = length;
		this.passengers = passengers;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.name}</td>
		<td>${this.model}</td>
		<td>${this.length}</td>
		<td>${this.passengers}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details vehicle index${this.index}">
		details</button><button class="delete vehicle index${
			this.index
		}">delete</button></td>
		</tr>`;
	}
}
class Starship {
	constructor({ name, model, length, passengers }, index) {
		this.index = index;
		this.name = name;
		this.model = model;
		this.length = length;
		this.passengers = passengers;
	}
	toHTML() {
		return `<tr id="rowPerson${this.index}">
		<td>${this.index}</td>
		<td>${this.name}</td>
		<td>${this.model}</td>
		<td>${this.length}</td>
		<td>${this.passengers}</td>
		<td>${new Date().toLocaleDateString()}</td>
		<td><button class="details starship index">
		details</button><button class="delete starship index${this.index}"
		>delete</button></td>
		</tr>`;
	}
}

// funkcja wporwadzajaca dane
const fillCategoryWithData = (val, index, category) => {
	let html = "";

	const addHeader = (flag) => {
		if (!flag) {
			switch (true) {
				case category === "people":
					html += `<tr>
					<th>id</th>
					<th>name</th>
					<th>birth</th>
					<th>gender</th>
					<th>height</th>
					<th>created</th>
					<tr>
					`;
					break;
				case category === "planets":
					html += `<tr>
						<th>id</th>
						<th>name</th>
						<th>climate</th>
						<th>terrain</th>
						<th>population</th>
						<th>created</th>
						<tr>
						`;
					break;
				case category === "films":
					html += `<tr>
							<th>id</th>
							<th>title</th>
							<th>director</th>
							<th>producer</th>
							<th>release_date</th>
							<th>created</th>
							<tr>
							`;
					break;
				case category === "species":
					html += `<tr>
						<th>id</th>
						<th>name</th>
						<th>classification</th>
						<th>designation</th>
						<th>average_height</th>
						<th>created</th>
						<tr>
						`;
					break;
				case category === "vehicles":
					html += `<tr>
						<th>id</th>
						<th>name</th>
						<th>model</th>
						<th>length</th>
						<th>passengers</th>
						<th>created</th>
						<tr>
						`;
					break;
				case category === "starships":
					html += `<tr>
						<th>id</th>
						<th>name</th>
						<th>model</th>
						<th>length</th>
						<th>passengers</th>
						<th>created</th>
						<tr>
						`;
					break;
			}
			headerAdded = true;
		}
	};

	switch (true) {
		case category === "people":
			const person = new Person(val, index);
			addHeader(headerAdded);
			return (html += person.toHTML());
		case category === "planets":
			const planet = new Planet(val, index);
			addHeader(headerAdded);
			return (html += planet.toHTML());
		case category === "films":
			const film = new Film(val, index);
			addHeader(headerAdded);
			return (html += film.toHTML());
		case category === "species":
			const species = new Species(val, index);
			addHeader(headerAdded);
			return (html += species.toHTML());
		case category === "vehicles":
			const vehicle = new Vehicle(val, index);
			addHeader(headerAdded);
			return (html += vehicle.toHTML());
		case category === "starships":
			const starship = new Starship(val, index);
			addHeader(headerAdded);
			return (html += starship.toHTML());
	}
};

// info
let pagination = document.createElement("p");
table.appendChild(pagination);

// logika next
nextButton.addEventListener("click", async () => {
	page++;
	startingIndex += 10;
	refreshPage();
	const fetchedData = await getData(currentCategory, page);
	headerAdded = false;
	printTable(fetchedData, currentCategory);
});

// logika prev

prevButton.addEventListener("click", async () => {
	page--;
	startingIndex -= 10;
	refreshPage();
	const fetchedData = await getData(currentCategory, page);
	headerAdded = false;
	printTable(fetchedData, currentCategory);
});

// details & delete
// details button
const Details = (event) => {
	const targetButton = event.target;

	if (targetButton.classList.contains("details")) {
		const detailsDiv = document.createElement("div");
		detailsDiv.textContent = "Szczegóły";
		detailsDiv.classList.add("details-div");
		detailsDiv.style.color = "blue";
		targetButton.parentNode.appendChild(detailsDiv);
	}
};

// delete button
const Delete = (event) => {
	const targetButton = event.target;

	if (targetButton.classList.contains("delete")) {
		const detailsDiv = targetButton.parentNode.querySelector(".details-div");
		if (detailsDiv) {
			detailsDiv.remove();
		}
	}
};

document.addEventListener("click", (event) => {
	const targetButton = event.target;
	if (targetButton.classList.contains("details")) {
		Details(event);
	} else if (targetButton.classList.contains("delete")) {
		Delete(event);
	}
});

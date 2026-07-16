const spotlight = document.getElementById("spotlight");

async function getHonoluluWeather() {
	const apiKey = "64f7adcaef0fcd163c3e1d2c94be1294";
	
	const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=honolulu&appid=${apiKey}&units=metric`);
	const currentData = await currentRes.json();
	const temperature = currentData.main.temp;
	const conditions = currentData.weather[0].description;
	
	const temperatureElement = document.getElementById("temperature");
	temperatureElement.textContent = `${temperature}°C`;
	const conditionsElement = document.getElementById("conditions");
	conditionsElement.textContent = conditions;
	
	const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=honolulu&appid=${apiKey}&units=metric`);
	const forecastData = await forecastRes.json();
	
	const days = {};
	
	forecastData.list.forEach(entry => {
		const date = entry.dt_txt.split(" ")[0];
		if (!days[date]) days[date] = [];
		days[date].push(entry);
	});
	
	const nextThreeDays = Object.keys(days).slice(0, 3);
	
	nextThreeDays.forEach((date, i) => {
		const entries = days[date];
	
		const temps = entries.map(e => e.main.temp);
		const min = Math.min(...temps);
		const max = Math.max(...temps);
	
		const midday = entries.find(e => e.dt_txt.includes("12:00:00")) || entries[0];
		const description = midday.weather[0].description;
	
		document.getElementById(`low-${i + 1}`).textContent = `${min}°C`;
		document.getElementById(`high-${i + 1}`).textContent = `${max}°C`;
		document.getElementById(`conditions-${i + 1}`).textContent = description;
	});
}

async function loadMembers() {
	const response = await fetch("./data/members.json");
	const members = await response.json();
	const proMembers = members.filter(member => member.level >= 2);
	const spotlightMembers = [];
	for (let i = 0; i < 3; i++) {
		const randomIndex = Math.floor(Math.random() * proMembers.length - 0);
		const spotlightMember = proMembers.splice(randomIndex, 1)[0];
		spotlightMembers.push(spotlightMember);
	}
	spotlightMembers.forEach(member => createSpotlightCard(
		member.name, 
		member.tagline, 
		member.address, 
		member.phone, 
		member.website, 
		member.image,
		member.level
	)
	);
};

function createSpotlightCard(
	name,
	tagline,
	address,
	phone,
	website,
	imageSrc,
	level
) {
	// Card Wrapper
	const card = document.createElement("div");
	card.classList.add("card");
	
	// Top Section
	const top = document.createElement("div");
	top.classList.add("flex-row");
	top.classList.add("space-between");
	
	const h2 = document.createElement("h2");
	h2.textContent = name;
	
	const spanTagline = document.createElement("span");
	spanTagline.textContent = tagline;
	spanTagline.classList.add("truncate");
	
	const main = document.createElement("div");
	main.appendChild(h2);
	main.appendChild(spanTagline);
	top.appendChild(main);
	const levelDiv = document.createElement("div");
	const levelText = ["member", "silver", "gold"][level - 1];
	levelDiv.textContent = levelText;
	levelDiv.classList.add(levelText);
	top.appendChild(levelDiv);
	
	// Bottom Section
	const bottom = document.createElement("div");
	bottom.classList.add("flex-row");
	
	const img = document.createElement("img");
	img.classList.add("profile");
	img.src = imageSrc;
	img.alt = name;
	
	const information = document.createElement("div");
	information.classList.add("flex-column");
	information.classList.add("break");
	
	const addressSpan = document.createElement("span");
	addressSpan.innerHTML = `<strong>ADDRESS:</strong> ${address}`;
	
	const phoneSpan = document.createElement("span");
	phoneSpan.innerHTML = `<strong>PHONE:</strong> ${phone}`;
	
	const urlSpan = document.createElement("span");
	urlSpan.innerHTML = `<strong>URL:</strong> ${website}`;
	
	information.appendChild(addressSpan);
	information.appendChild(phoneSpan);
	information.appendChild(urlSpan);
	
	bottom.appendChild(img);
	bottom.appendChild(information);
	
	// Card Assembly
	card.appendChild(top);
	card.appendChild(bottom);
	
	spotlight.appendChild(card);
};

loadMembers();
getHonoluluWeather();

const directory = document.getElementById("directory");

async function loadMembers() {
	const response = await fetch("./data/members.json");
	console.log(response);
	const members = await response.json();

	members.forEach(member => createDirectoryCard(
		member.name, 
		member.tagline, 
		member.email, 
		member.phone, 
		member.website, 
		member.image)
	);
};

function createDirectoryCard(
	name,
	tagline,
	email,
	phone,
	website,
	imageSrc
) {
	// Card Wrapper
	const card = document.createElement("div");
	card.classList.add("card");
	
	// Top Section
	const top = document.createElement("div");
	
	const h2 = document.createElement("h2");
	h2.textContent = name;
	
	const spanTagline = document.createElement("span");
	spanTagline.textContent = tagline;
	spanTagline.classList.add("truncate");
	
	top.appendChild(h2);
	top.appendChild(spanTagline);
	
	// Bottom Section
	const bottom = document.createElement("div");
	bottom.classList.add("flex-row");
	
	const img = document.createElement("img");
	img.classList.add("profile");
	img.src = imageSrc;
	
	const information = document.createElement("div");
	information.classList.add("flex-column");
	
	const emailSpan = document.createElement("span");
	emailSpan.innerHTML = `<strong>EMAIL:</strong> ${email}`;
	
	const phoneSpan = document.createElement("span");
	phoneSpan.innerHTML = `<strong>PHONE:</strong> ${phone}`;
	
	const urlSpan = document.createElement("span");
	urlSpan.innerHTML = `<strong>URL:</strong> ${website}`;
	
	information.appendChild(emailSpan);
	information.appendChild(phoneSpan);
	information.appendChild(urlSpan);
	
	bottom.appendChild(img);
	bottom.appendChild(information);
	
	// Card Assembly
	card.appendChild(top);
	card.appendChild(bottom);
	
	directory.appendChild(card);
};

loadMembers();

document.getElementById("grid-button").addEventListener("click", () => {
	directory.classList.add("grid");
	directory.classList.remove("flex-column");
});
document.getElementById("list-button").addEventListener("click", () => {
	directory.classList.add("flex-column");
	directory.classList.remove("grid");
});
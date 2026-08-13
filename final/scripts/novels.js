const novels = [
	{
		name: "Miss Perception",
		link: "miss-perception.html"
	},
	{
		name: "Creatures of a Liminal Space",
		link: "creatures-of-a-liminal-space.html"
	},
	{
		name: "Stuck in the Rain",
		link: "stuck-in-the-rain.html"
	},
	{
		name: "Strangers on the Next Flight Over",
		link: "strangers-on-the-next-flight-over.html"
	}
];

function setSeenClasses() {
	const seen = JSON.parse(localStorage.getItem("seen")) || [];
	for (const name of seen) {
		const seenElement = document.getElementById(name);
		seenElement.classList.add("seen");
	}
}

function updateSeen(name) {
	const seen = JSON.parse(localStorage.getItem("seen")) || [];
	if (!seen.includes(name)) {
		seen.push(name);
		localStorage.setItem("seen", JSON.stringify(seen));
	}
	setSeenClasses();
}

const novelsNav = document.getElementById("novels");


for (const {name, link} of novels) {
	const novelElement = document.createElement("a");
	novelElement.classList.add("novel");
	novelElement.innerText = name;
	novelElement.id = name;
	novelElement.href = `novels/${link}`;
	novelElement.addEventListener("click", () => updateSeen(name));
	novelsNav.appendChild(novelElement);
}

setSeenClasses();
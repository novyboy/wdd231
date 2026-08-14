const params = new URLSearchParams(window.location.search);

const fields = [
	"name",
	"email",
	"type",
	"details"
];

const results = document.getElementById("results");

for (const field of fields) {
	const value = params.get(field);
	if (value) {
		const div = document.createElement("div");
		div.className = "field";
		div.innerHTML = `<strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${value}`;
		results.appendChild(div);
	}
};
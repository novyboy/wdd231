import art from "../data/art.mjs";

const gallery = document.getElementById("gallery");
const dialog = document.getElementById("viewer");

const viewerImg = document.getElementById("viewer-img");
const viewerTitle = document.getElementById("viewer-title");
const viewerDescription = document.getElementById("viewer-description");
const viewerDate = document.getElementById("viewer-date");

// Build gallery
art.forEach(section => {
  section.content.forEach(item => {
	const img = document.createElement("img");
	img.src = item.file;
	img.alt = item.name;
	img.loading = "lazy";
	img.classList.add("art");

	img.addEventListener("click", () => {
	  viewerImg.src = item.file;
	  viewerTitle.textContent = item.name;
	  viewerDescription.textContent = item.description;
	  viewerDate.textContent = item.date;
	  dialog.showModal();
	});

	gallery.appendChild(img);
  });
});

// Close viewer when clicking outside content
dialog.addEventListener("click", (e) => {
  const clickedInside = e.target.closest(".viewer-content");
  if (!clickedInside) dialog.close();
});
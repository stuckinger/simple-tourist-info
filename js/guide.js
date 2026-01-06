const params = new URLSearchParams(window.location.search);
const place = params.get("place");

if(!place){
	document.body.innerHTML = "<p>Kein Ort ausgewählt.</p>";
	throw new Error("Missing place parameter");
}

fetch(`data/${place}.json`)
  .then(response => response.json())
  .then(data => renderPage(data))
  .catch(() => {
	  document.body.innerHTML = "<p>Inhalt nicht gefunden.</p>";
  });

function renderPage(data){
	document.getElementById("page-title").textContent = data.title;
	document.getElementById("title").textContent = data.title;
	document.getElementById("subtitle").textContent = data.subtitle;

	const desc = document.getElementById("description");

	data.description.forEach(text => {
		const p = document.createElement("p");
		p.textContent = text;
		desc.appendChild(p);
	});

	const mediaContainer = document.getElementById("media");

	data.media.forEach(item => {
		const figure = document.createElement("figure");

		if (item.type === "image") {
			const img = document.createElement("img");
			img.src = item.src;
			img.alt = item.alt || "";
			figure.appendChild(img);
		}

		if (item.type === "video") {
			const video = document.createElement("video");
			video.controls = true;
			video.src = item.src;
			figure.appendChild(video);
		}

		if (item.caption) {
			const figcaption = document.createElement("figcaption");
			figcaption.textContent = item.caption;
			figure.appendChild(figcaption);
		}

		mediaContainer.appendChild(figure);

	});

	document.getElementById("footer").textContent = data.footer;
}

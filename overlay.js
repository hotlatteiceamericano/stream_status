// read from status.json and update to the html
const STATUS_URL = "status.json";

async function loadStatus() {
	try {
		const res = await fetch(`${STATUS_URL}?t=${Date.now()}`);
		const data = await res.json();

		console.log(`topic: ${data.topic}`);
		document.getElementById("topic").textContent = data.topic;

		document.getElementById("progress").innerHTML = `
      <span class="done">${(data.done || []).join(" → ")}</span>
      <span class="arrow"> → </span>
      <span class="current">${data.current}</span>
      <span class="arrow"> → </span>
      <span class="next">${data.next}</span>
    `;
	} catch (e) {
		console.error("Failed to load status.json", e);
	}
}

setInterval(loadStatus, 2000);
loadStatus();

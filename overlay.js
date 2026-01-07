const STATUS_URL = "status.json";

async function loadStatus() {
  try {
    const res = await fetch(`${STATUS_URL}?t=${Date.now()}`);
    const data = await res.json();

    document.getElementById("project").textContent = data.project;

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

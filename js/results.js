const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query")?.toLowerCase() || "";
const grid = document.getElementById("resultsGrid");
const showMoreBtn = document.getElementById("showMoreBtn");

let visibleCount = 12;
let filtered = [];

function createTile(activity) {
  const tile = document.createElement("div");
  tile.className = "activity-tile";
  tile.innerHTML = `
    <img src="${activity.image_url || "placeholder.jpg"}" alt="${
    activity.name
  }" />
    <h3>${activity.name}</h3>
    <p>${activity.price_sek} SEK</p>
    <a href="activity.html?id=${activity.id}" class="book-btn">Book</a>
  `;
  return tile;
}

function renderTiles() {
  grid.innerHTML = "";
  const toShow = filtered.slice(0, visibleCount);
  toShow.forEach((act) => grid.appendChild(createTile(act)));

  showMoreBtn.style.display =
    visibleCount >= filtered.length ? "none" : "block";
}

showMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderTiles();
});

fetch("json/activities.json")
  .then((res) => res.json())
  .then((data) => {
    filtered = data.activities.filter((a) =>
      a.name.toLowerCase().includes(query)
    );
    renderTiles();
  })
  .catch((err) => console.error("Failed to load activities:", err));

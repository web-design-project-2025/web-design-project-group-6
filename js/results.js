var urlParams = new URLSearchParams(window.location.search);
var queryParam = urlParams.get("query");
var query = queryParam ? queryParam.toLowerCase() : "";

var grid = document.getElementById("resultsGrid");
var showMoreBtn = document.getElementById("showMoreBtn");

var visibleCount = 12;
var filtered = [];

function createTile(activity) {
  var tile = document.createElement("div");
  tile.className = "activity-tile";

  var imageUrl = activity.image_url ? activity.image_url : "placeholder.jpg";

  tile.innerHTML =
    '<img src="' +
    imageUrl +
    '" alt="' +
    activity.name +
    '" />' +
    "<h3>" +
    activity.name +
    "</h3>" +
    "<p>" +
    activity.price_sek +
    " SEK</p>" +
    '<a href="activity.html?id=' +
    activity.id +
    '" class="book-btn">Book</a>';

  return tile;
}

function renderTiles() {
  grid.innerHTML = "";
  var toShow = filtered.slice(0, visibleCount);

  for (var i = 0; i < toShow.length; i++) {
    var tile = createTile(toShow[i]);
    grid.appendChild(tile);
  }

  if (visibleCount >= filtered.length) {
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "block";
  }
}

showMoreBtn.addEventListener("click", function () {
  visibleCount += 3;
  renderTiles();
});

fetch("json/activities.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    filtered = data.activities.filter(function (activity) {
      return activity.name.toLowerCase().indexOf(query) !== -1;
    });
    renderTiles();
  })
  .catch(function (error) {
    console.error("Failed to load activities:", error);
  });

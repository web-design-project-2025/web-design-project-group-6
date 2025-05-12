/* The lines below are here to get the keyword given by user from the previously created url and use it to filter through activities in json */
/* idea learned from https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams */
var urlParams = new URLSearchParams(window.location.search);
var queryParam = urlParams.get("query");
/*Added this to also filter based on the home page shortcuts*/
var categoryParam = urlParams.get("category");
/*this was needed to avoid errors from using upper and lower cases, so everything is converrted to lowercase or left empty - "" */
var query = queryParam ? queryParam.toLowerCase() : "";
var category = categoryParam ? categoryParam.toLowerCase() : "";

/* this gets the place defined in html (resultsGrid) where I want to place the tiles with activities*/
var grid = document.getElementById("resultsGrid");
var showMoreBtn = document.getElementById("showMoreBtn");
var showLessBtn = document.getElementById("showLessBtn");

var visibleCount = 4;

/*This is my array for activities filtered from keyword */
var filtered = [];

/* creating the tiles with the classic createElement command */
function createTile(activity) {
  var tile = document.createElement("div");
  tile.className = "activity-tile";

  var imageUrl = activity.image_url;

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
    /*this is important here so that we can be transfered to a detail page for the activity */
    activity.id +
    '" class="book-btn">Book</a>';

  return tile;
}

function renderTiles() {
  /*this is to clear the grid element at the beginning of rendering */
  grid.innerHTML = "";
  /*this goes back to predefined value 12 in var vicibleCount so that only 12 tiles are visible above show more button - may need tor evisit later */
  var toShow = filtered.slice(0, visibleCount);

  for (var i = 0; i < toShow.length; i++) {
    var tile = createTile(toShow[i]);
    grid.appendChild(tile);
  }
  /*important rule for when show more should be visible */
  if (visibleCount >= filtered.length) {
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "block";
  }

  if (visibleCount > 4) {
    showLessBtn.style.display = "block";
  } else {
    showLessBtn.style.display = "none";
  }
}

/*these 2 functions work the logic of clicking on them  */
showMoreBtn.addEventListener("click", function () {
  /*I used 3 so that we can use all 15 activities currently in json, but we can change this later - depends on how many activities we do */
  visibleCount += 3;
  renderTiles();
});

showLessBtn.addEventListener("click", function () {
  visibleCount -= 3;
  if (visibleCount < 4) {
    visibleCount = 4;
  }
  renderTiles();
});

/*loading from json is this one + using the filtering for keywords - it matches them to activity name!!*/
fetch("json/activities.json")
  .then(function (response) {
    return response.json();
  })
  /*filter idea from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter */
  .then(function (data) {
    filtered = data.activities.filter(function (activity) {
      var nameMatch = activity.name.toLowerCase().indexOf(query) !== -1;
      var categoryMatch = activity.category.toLowerCase() === category;

      return (query && nameMatch) || (category && categoryMatch);
    });
    renderTiles();
  })

  /*for now like this, but probably will do an error message page if we proceed with the search bar */
  .catch(function (error) {
    console.error("Failed to load activities:", error);
  });

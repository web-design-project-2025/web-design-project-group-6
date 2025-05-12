var params = new URLSearchParams(window.location.search);
var activityId = params.get("id");

fetch("json/activities.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var activity = data.activities.find(function (act) {
      return act.id === activityId;
    });

    if (!activity) {
      document.body.innerHTML = "<h2>Activity not found.</h2>";
      return;
    }

    var hero = document.getElementById("activityHero");
    hero.style.backgroundImage = "url(" + activity.image_url + ")";
    document.getElementById("activityName").textContent = activity.name;
    document.getElementById("activityCategory").textContent = activity.category;

    document.getElementById("activityDescription").textContent =
      activity.description;
    document.getElementById("activityAddress").textContent = activity.location;
    document.getElementById("activityDuration").textContent = activity.duration;

    var carousel = document.getElementById("carouselContainer");
    var images = activity.carousel_images.slice(0, 5);
    images.forEach(function (imgUrl) {
      var img = document.createElement("img");
      img.src = imgUrl;
      img.alt = activity.name;
      carousel.appendChild(img);
    });
  })
  .catch(function (error) {
    console.error("Error loading activity:", error);
    document.body.innerHTML = "<h2>Error loading activity.</h2>";
  });

/* Recommendations function */
// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create tile using same logic for consistency
function createRecommendationTile(activity) {
  var tile = document.createElement("div");
  tile.className = "activity-tile";

  tile.innerHTML =
    '<img src="' +
    activity.image_url +
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

function renderRecommendations(activities) {
  var container = document.getElementById("recommendationsGrid");
  container.innerHTML = ""; // Clear previous content

  shuffleArray(activities); // Shuffle activities

  const randomFour = activities.slice(0, 4);
  randomFour.forEach(function (activity) {
    var tile = createRecommendationTile(activity);
    container.appendChild(tile);
  });
}

// Fetch and display recommendations
fetch("json/activities.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    renderRecommendations(data.activities);
  })
  .catch(function (error) {
    console.error("Failed to load recommended activities:", error);
  });

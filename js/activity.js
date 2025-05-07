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
    document.getElementById("activityAddress").textContent = activity.address;
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

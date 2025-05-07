const params = new URLSearchParams(window.location.search);
const activityId = params.get("id");

fetch("json/activities.json")
  .then((res) => res.json())
  .then((data) => {
    const activity = data.activities.find((act) => act.id == activityId);

    if (!activity) {
      document.body.innerHTML = "<h2>Activity not found.</h2>";
      return;
    }

    // Set hero background and text
    const hero = document.getElementById("activityHero");
    hero.style.backgroundImage = `url(${activity.image_url})`;
    document.getElementById("activityName").textContent = activity.name;
    document.getElementById("activityCategory").textContent = activity.category;

    // Set text content
    document.getElementById("activityDescription").textContent =
      activity.description;
    document.getElementById("activityAddress").textContent = activity.address;
    document.getElementById("activityDuration").textContent = activity.duration;

    // Create carousel
    const carousel = document.getElementById("carouselContainer");
    activity.carousel_images.slice(0, 5).forEach((imgUrl) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = activity.name;
      carousel.appendChild(img);
    });
  })
  .catch((err) => {
    console.error("Error loading activity:", err);
    document.body.innerHTML = "<h2>Error loading activity.</h2>";
  });

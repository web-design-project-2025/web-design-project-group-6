//This function helps with the serach bar input registration
document.getElementById("searchButton").addEventListener("click", function () {
  var queryInput = document.getElementById("searchInput");

  /*trim is to remove blank spaces if user leaves any*/
  /*.value is here to get the current value of the input field: found at https://www.shecodes.io/athena/72807-understanding-the-value-property-in-javascript*/
  var query = queryInput.value.trim();

  /*The encodeURIComponent is needed here so that whatever the user writes in can be used as url in redirecting to results page - came from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent */
  var encodedQuery = encodeURIComponent(query);

  /*This composes the url */
  var url = "results.html?query=" + encodedQuery;

  /*Line below syntax learned from https://www.geeksforgeeks.org/how-to-get-browser-to-navigate-url-in-javascript/ */
  window.location.href = url;
});

/*Language menu - just a word switch, maybe add json data for languages later */
document.addEventListener("DOMContentLoaded", function () {
  var languageSelector = document.querySelector(".language-selector");
  var selectedLangSpan = document.querySelector(".selected-lang");
  var languageMenu = document.querySelector(".language-menu");

  languageSelector.addEventListener("click", function (event) {
    if (languageMenu.classList.contains("show") === true) {
      languageMenu.classList.remove("show");
    } else {
      languageMenu.classList.add("show");
    }

    event.stopPropagation();
  });

  languageMenu.addEventListener("click", function (event) {
    var clickedItem = event.target;

    if (clickedItem.tagName === "LI") {
      var newLanguage = clickedItem.getAttribute("data-lang");
      selectedLangSpan.textContent = newLanguage;
      languageMenu.classList.remove("show");
    }
  });

  document.addEventListener("click", function () {
    languageMenu.classList.remove("show");
  });
});

//Autofill feature for our search bar

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  let suggestions = [];

  // Fetch JSON data from the autofill folder
  fetch("json/autofill.json")
    .then((response) => response.json())
    .then((data) => {
      suggestions = data;
    })
    .catch((error) => {
      console.error("Failed to load suggestions:", error);
    });

  // Input handling is this
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (query.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    filtered.forEach((item) => {
      const div = document.createElement("div");
      div.textContent = item;
      div.addEventListener("click", function () {
        searchInput.value = item;
        suggestionsBox.style.display = "none";
      });
      suggestionsBox.appendChild(div);
    });

    suggestionsBox.style.display = "block";
  });

  // This one added to hide suggestions when user clicks outside!!! important
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-container")) {
      suggestionsBox.style.display = "none";
    }
  });
});

// this simulates pressing enter as if it were the click - made for simplification reasons
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchButton.click();
  }
});

// Food gallery carousel logic - inspired by: https://www.youtube.com/watch?v=9HcxHDS2w1s and https://www.youtube.com/watch?v=VYsVOamdB0g
document.addEventListener("DOMContentLoaded", function () {
  // Get all the necessary elements
  var track = document.querySelector(".gallery-track");
  var prevButton = document.querySelector(".carousel-prev");
  var nextButton = document.querySelector(".carousel-next");

  // Set the starting index of visible items
  var currentIndex = 0;

  // Get the width of one gallery item, also with gap
  var galleryItem = track.querySelector(".gallery-item");
  var itemWidth = galleryItem.offsetWidth + 16;

  // Number of items visible at once (we want 4 on full screen size)
  var visibleItems = 4;

  // Tota number of pictures
  var totalItems = track.children.length;

  // Function to update the gallery position
  function updateGallery() {
    var moveX = currentIndex * itemWidth;
    track.style.transform = "translateX(-" + moveX + "px)";
  }

  // Next button clicked function
  nextButton.addEventListener("click", function () {
    if (currentIndex < totalItems - visibleItems) {
      currentIndex = currentIndex + 1;
      updateGallery();
    }
  });

  // Previous button is clicked
  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex = currentIndex - 1;
      updateGallery();
    }
  });
});

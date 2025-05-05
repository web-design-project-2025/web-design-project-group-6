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

/*Language menu */
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

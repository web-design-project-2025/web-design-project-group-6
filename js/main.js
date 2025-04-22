document.getElementById("searchButton").addEventListener("click", function () {
  var queryInput = document.getElementById("searchInput");
  var dateInput = document.getElementById("dateInput");

  /*trim is to remove blank spaces if user leaves any*/
  var query = queryInput.value.trim();
  /*.value is here to get the current value of the input field: found at https://www.shecodes.io/athena/72807-understanding-the-value-property-in-javascript*/
  var date = dateInput.value;

  /*The encodeURIComponent is needed here so that whatever the user writes in can be used as url in redirecting to results page - came from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent */
  var encodedQuery = encodeURIComponent(query);
  var encodedDate = encodeURIComponent(date);

  /*This composes the url */
  var url = "results.html?query=" + encodedQuery + "&date=" + encodedDate;

  /*Line below syntax learned from https://www.geeksforgeeks.org/how-to-get-browser-to-navigate-url-in-javascript/ */
  window.location.href = url;
});

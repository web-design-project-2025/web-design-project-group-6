document.getElementById("searchButton").addEventListener("click", function () {
  var queryInput = document.getElementById("searchInput");
  var dateInput = document.getElementById("dateInput");

  /*trim is to remove blank spaces if user leaves any*/
  var query = queryInput.value.trim();
  /*.value is here to get the current value of the input field: found at https://www.shecodes.io/athena/72807-understanding-the-value-property-in-javascript*/
  var date = dateInput.value;

  var encodedQuery = encodeURIComponent(query);
  var encodedDate = encodeURIComponent(date);

  var url = "results.html?query=" + encodedQuery + "&date=" + encodedDate;
  window.location.href = url;
});

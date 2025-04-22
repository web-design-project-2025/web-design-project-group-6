document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  const date = document.getElementById("dateInput").value;

  // Redirect to results page with query params
  window.location.href = `results.html?query=${encodeURIComponent(
    query
  )}&date=${encodeURIComponent(date)}`;
});

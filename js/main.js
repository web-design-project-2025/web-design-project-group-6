// Placeholder JSON data (this will be dynamic later)
const activityData = [
    { name: "Museum", category: "Museums" },
    { name: "Food Tour", category: "Food" },
    { name: "Live Concert", category: "Events" },
  ];
  
  // Search function placeholder
  document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const date = document.getElementById('dateInput').value;
  
    console.log("Searching for:", query, "on", date);
  
    // Filter activities - real implementation will depend on actual data
    const results = activityData.filter(a =>
      a.name.toLowerCase().includes(query))
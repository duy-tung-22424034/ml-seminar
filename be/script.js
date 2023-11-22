document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    var query = document.getElementById('queryInput').value;
    fetch('http://localhost:5000/search?query=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => displayResults(data))
        .catch(error => console.error('Error:', error));
});

function displayResults(results) {
    console.log(results);
    var resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = ''; // Clear previous results

    // Add new results to the list
    results.forEach(function(movie) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(movie));
        resultsList.appendChild(li);
    });
}

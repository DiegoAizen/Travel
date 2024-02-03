document.addEventListener('DOMContentLoaded', function() {
    loadRecommendations();

    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.querySelector('.ResultsContainer'); 
    const clearButton = document.getElementById('clearButton');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            alert('Please enter a search term.');
            return;
        }

        fetch("/travelRecommendation/travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = ''; // Clear previous results
                // Here, ensure we're filtering correctly across all categories including 'Recomendation'
                filterAndDisplayResults(data, searchTerm, resultsContainer);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error loading the data.');
            });
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
        loadRecommendations();
    });

    function loadRecommendations() {
        fetch("/travelRecommendation/travel_recommendation_api.json")
            .then(response => response.json())
            .then(data => {
                resultsContainer.innerHTML = '';
                // Directly display 'Recomendation' items
                displayResults(data.Recomendation, resultsContainer);
            })
            .catch(error => {
                console.error('Error loading recommendations:', error);
            });
    }

    function filterAndDisplayResults(data, searchTerm, container) {
        let found = false;
        // Include 'Recomendation' in the search process
        ['countries', 'temples', 'beaches', 'Recomendation'].forEach(category => {
            if(data[category]){
                data[category].forEach(item => {
                    if (category === 'countries' && item.cities) {
                        item.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(searchTerm)) {
                                displayResult(city, container);
                                found = true;
                            }
                        });
                    } else if (item.name.toLowerCase().includes(searchTerm)) {
                        displayResult(item, container);
                        found = true;
                    }
                });
            }
        });

        if (!found) {
            alert('No results found.');
        }
    }

    function displayResult(item, container) {
        const html = `
            <div class="ResultItem">
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="${item.name}" />
                <p>${item.description}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    }

    function displayResults(results, container) {
        results.forEach(item => {
            displayResult(item, container);
        });
    }
});

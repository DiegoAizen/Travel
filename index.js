document.addEventListener('DOMContentLoaded', function() {
    const iconPath = "/assets/icons/montanas.png";
    const topBarHTML = `
        <header class="topBar">
            <div class="Bar">
                <img alt="icon" src="${iconPath}" class="IconImagen" />
                <span>Travel Adventure</span>
            </div>
            <div class="CenterText">
                <a href="/travelRecommendation/travel_recommendation.html">Home</a> <!-- Hace que "Home" dirija a home.html -->
                <a href="/travelRecommendation/about/about.html">About Us</a> <!-- Hace que "About Us" dirija a about.html -->
                <a href="/travelRecommendation/contact/contact.html">Contact Us</a> <!-- Hace que "Contact Us" dirija a contact.html -->
            </div>
            <div class="search-container">
                  <input type="text" id="searchInput" class="search-input" placeholder="Enter a destination">
                <button id="searchButton" class="search-button">Search</button>
                <button id="clearButton" class="clear-button">Clear</button>
            </div>
        </header>
    `;

   
    document.body.insertAdjacentHTML('afterbegin', topBarHTML);
});

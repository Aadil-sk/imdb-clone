const favoritesGrid = document.getElementById('favorites-grid');

function navigateToSearch() {
    window.location.href = "index.html";
}


// Function to load favorite movies from localStorage
function loadFavorites() {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (favoriteMovies.length === 0) {
        favoritesGrid.innerHTML = '<p>No favorite movies found.</p>';
        return;
    }

    // Clear the favorites grid
    favoritesGrid.innerHTML = '';


     // For each favorite movie ID, fetch its details from the OMDB API and display it
    favoriteMovies.forEach(async (movieId) => {
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=a149aa8d`);
        const data = await response.json();
        if (data.Response === 'True') {
            displayFavoriteMovie(data);
        }
    });
}

function displayFavoriteMovie(details) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('favorite-movie');
    movieItem.innerHTML = `
    <div class="movie-poster">
        <img src="${details.Poster !== 'N/A' ? details.Poster : 'image_not_found.png'}" alt="Movie Poster">
    </div>
    <div class="movie-info">
        <h2>${details.Title}</h2>
        <p><strong>Year:</strong> ${details.Year}</p>
        <p><strong>Plot:</strong> ${details.Plot}</p>
        <button class="remove-btn" onclick="removeFromFavorites('${details.imdbID}')">Remove from Favorites</button>
    </div>`;
    favoritesGrid.appendChild(movieItem);
}

function removeFromFavorites(movieId) {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies = favoriteMovies.filter(id => id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    loadFavorites();
}

window.onload = loadFavorites;

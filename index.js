let search = document.getElementById("search");
const submit = document.getElementById("submit");
const movieList = document.getElementById("movie-list");

submit.addEventListener("click", e => {
    e.preventDefault();
    searchMovies(search.value);
})

async function searchMovies(input) {
    movieList.innerHTML = ""
    const response = await fetch(`http://www.omdbapi.com/?apikey=9054129a&t=${search.value}`)
    const data = await response.json()
    // console.log(data.Title)
    movieList.innerHTML += `
            <div class="movie">
                <div class="movie-image"><img src="${data.Poster}" alt="${data.Title}"></div>
                <div class="movie-info">
                    <div class="top">
                        <h2 class="movie-title">${data.Title}</h2>
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                    <div class="length-genre-watchlist">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <p id="watchlist" class="watchlist">Watchlist</p>
                    </div>
                    <div class="paragraph"><p>${data.Plot}</p></div>
                </div>
            </div>
    `
}

document.addEventListener("click", function(e){
    if (e.target.id.includes("watchlist")) {
        e.target.textContent = "Added";

        const movie = e.target.closest(".movie")
        const movieTitle = movie.querySelector(".movie-title").textContent;

        const existing = JSON.parse(localStorage.getItem("watchlist")) || [];

        const isAlreadyAdded = existing.some(movie => movie.Title === movieTitle);
        if (isAlreadyAdded) return;

        const movieDict = {
            Title: movieTitle,
            Poster: movie.querySelector("img").src,
            imdbRating: movie.querySelector(".rating").textContent,
            Runtime: movie.querySelector(".length-genre-watchlist p:nth-child(1)").textContent,
            Genre: movie.querySelector(".length-genre-watchlist p:nth-child(2)").textContent,
            Plot: movie.querySelector(".paragraph p").textContent,
        };

        existing.push(movieDict);
        localStorage.setItem("watchlist", JSON.stringify(existing));
    }
});
// console.log(localStorage.getItem("watchlist"));

// next add when watchlist is clicked it removes the word watchlist and then adds it to the local storage thing for it, then have all the watchlist ones appear on the other page
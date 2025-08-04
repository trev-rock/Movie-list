// console.log(localStorage.getItem("watchlist"));
const movieListHTML = document.getElementById("movie-list")
const watchlist = JSON.parse(localStorage.getItem("watchlist"));

console.log(watchlist);
displayMovies(watchlist);

// console.log(watchlist.length)

function displayMovies(watchlist) {
    let counter = 0
    // console.log(watchlist)
    watchlist.forEach(movie => {
        // console.log(movie)
        let htmlString = movieString(movie, counter);
        // console.log(htmlString)
        if(counter != watchlist.length-1) {
            htmlString += "<hr>"
        }
        movieListHTML.innerHTML += htmlString
        counter++
    })
}

function movieString(movie, counter) {
    return `
            <div class="movie">
                <div class="movie-image"><img src="${movie.Poster}"></div>
                <div class="movie-info">
                    <div class="top">
                        <h2 class="movie-title">${movie.Title}</h2>
                        <p class="rating">${movie.imdbRating}</p>
                    </div>
                    <div class="length-genre-watchlist">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <p id="remove-movie-${counter}" class="remove">Remove</p>
                    </div>
                    <div class="paragraph"><p>${movie.Plot}</p></div>
                </div>
            </div>
    `
}

document.addEventListener("click", function(e) {
    if(e.target.id.includes("remove-movie")) {
        // console.log(e.target.closest(".movie"))
        const movieTitle = e.target.closest(".movie").querySelector(".movie-title").textContent;
        const index = watchlist.findIndex(movie => movie.Title === movieTitle);

        console.log("Movie Title:", movieTitle);
        console.log("Index in watchlist:", index);

        watchlist.splice(index,1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        movieListHTML.innerHTML = "";
        displayMovies(watchlist)
    }
})

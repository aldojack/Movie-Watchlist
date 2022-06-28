import {createElement} from './utillity.js';

const api = '1f5fb779';
const resultsContainer = document.getElementById('results');
const placeholder = document.getElementById('placeholder');
let localWatchlist = [];
const storedLocalStorage = JSON.parse(localStorage.getItem("watchlist"))

const getWatchlist = async (movie) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${api}&t=${movie}`);
    const data = await response.json();
    console.log(data);
    getMovie(data);
}

const getMovie = (movie) => {

        //Create the movie and add to the DOM
    //Create the container that will hold the film result
    const movieContainer = createElement('div', { class: ['movie-container', 'flex'] });
    resultsContainer.appendChild(movieContainer);

    //Create a div for the poster
    const posterDiv = createElement('div', { class: ['movie-poster'] });
    const image = createElement('img');
    //If movie has a poster then show the default if not then show placeholder image
    movie.Poster != 'N/A' ? image.src = movie.Poster : image.src = './images/no-poster.jpg';
    posterDiv.appendChild(image);

    const movieInfoDiv = createElement('div', { class: ['movie-information', 'flex', 'flex-col'] });

    const movieTitle = createElement('h3', { class: ['movie-title'], text: movie.Title });
    const rating = createElement('span', { class: ['rating'], text: `⭐ ${movie.imdbRating}` })
    movieTitle.appendChild(rating);
    const movieAddInfo = createElement('div', { class: ['movie-additional', 'flex'] });
    const runTime = createElement('p', { class: ['runtime'], text: movie.Runtime });
    const genre = createElement('p', { class: ['genre'], text: movie.Genre });
    const watchlist = createElement('div', { class: ['watchlist', 'flex'] });
    const icon = createElement('i', { class: ['fa-solid'], role: 'button', value: movie.Title });
    localWatchlist.includes(movie.Title) ? icon.classList.add('fa-heart') : icon.classList.add('fa-circle-plus')
    const span = createElement('p', { text: "Watchlist" });
    watchlist.append(icon, span);
    const moviePlot = createElement('p', { class: ['movie-desc'], text: movie.Plot})
    
    watchlist.addEventListener('click', () => {
        //If Title is in the local storage then remove
        if (localWatchlist.includes(movie.Title)) {
            localWatchlist.pop(movie.Title)
            localStorage.setItem("watchlist", JSON.stringify(localWatchlist))
            icon.classList.replace('fa-heart', 'fa-circle-plus');
        }
        else {
            localWatchlist.push(movie.Title);
            localStorage.setItem("watchlist", JSON.stringify(localWatchlist))
            icon.classList.replace('fa-circle-plus', 'fa-heart')
        }
    })
    movieAddInfo.append(runTime,genre, watchlist)
    movieInfoDiv.append(movieTitle,movieAddInfo, moviePlot);

    movieContainer.append(posterDiv,movieInfoDiv); 
}


if (storedLocalStorage) {
    localWatchlist = storedLocalStorage;
    placeholder.style.display = "none";
    localWatchlist.forEach(movie => getWatchlist(movie))
}
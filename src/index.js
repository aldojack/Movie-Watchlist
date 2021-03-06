
import {createElement} from './utillity.js';

const api = '1f5fb779';
let searchValue = '';
const searchField = document.getElementById('movieSearch');
const searchBtn = document.getElementById("SearchBtn");    
const resultsContainer = document.getElementById('results');
const placeholder = document.getElementById('placeholder');
let localWatchlist = [];
const storedLocalStorage = JSON.parse(localStorage.getItem("watchlist"))

    
if (storedLocalStorage) {
    localWatchlist = storedLocalStorage;
}

const setValue = (event) => {
    searchValue = event.target.value.toLowerCase();
    if(event.code === "Enter")
    {
        searchMovie();
    }
}

    const searchMovie = async () => {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${api}&s=${searchValue}`);
        const { Response, Search } = await res.json();
        console.log(Response)
        console.log(Search)
        //If results found then do this
        
        if (Response === 'True') {
            renderPage();
            for (let movie of Search) {
                getMovie(movie);
            }               
        }
        //Else print the results to screen
        else {
            const errorMessage = document.getElementById('placeholderText');
            errorMessage.textContent = `No results found for ${searchValue}`
            placeholder.appendChild(errorMessage);
            searchField.focus();
            searchField.value = '';
        }
    }
    
const getMovie = async ({imdbID}) => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${api}&i=${imdbID}`);

    const { Title, Runtime, Genre, imdbRating, Plot, Poster } = await res.json();

    //Create the movie and add to the DOM
    //Create the container that will hold the film result
    const movieContainer = createElement('div', { class: ['movie-container', 'flex'] });
    resultsContainer.appendChild(movieContainer);

    //Create a div for the poster
    const posterDiv = createElement('div', { class: ['movie-poster'] });
    const image = createElement('img');
    //If movie has a poster then show the default if not then show placeholder image
    Poster != 'N/A' ? image.src = Poster : image.src = './images/no-poster.jpg';
    posterDiv.appendChild(image);

    const movieInfoDiv = createElement('div', { class: ['movie-information', 'flex', 'flex-col'] });

    const movieTitle = createElement('h3', { class: ['movie-title'], text: Title });
    const rating = createElement('span', { class: ['rating'], text: `??? ${imdbRating}` })
    movieTitle.appendChild(rating);
    const movieAddInfo = createElement('div', { class: ['movie-additional', 'flex'] });
    const runTime = createElement('p', { class: ['runtime'], text: Runtime });
    const genre = createElement('p', { class: ['genre'], text: Genre });
    const watchlist = createElement('div', { class: ['watchlist', 'flex'] });
    const icon = createElement('i', { class: ['fa-solid'], role: 'button', value: Title });
    localWatchlist.includes(Title) ? icon.classList.add('fa-heart') : icon.classList.add('fa-circle-plus')
    const span = createElement('p', { text: "Watchlist" });
    watchlist.append(icon, span);
    const moviePlot = createElement('p', { class: ['movie-desc'], text: Plot})
    
    watchlist.addEventListener('click', () => {
        //If Title is in the local storage then remove
        if (localWatchlist.includes(imdbID)) {
            localWatchlist.pop(imdbID)
            localStorage.setItem("watchlist", JSON.stringify(localWatchlist))
            icon.classList.replace('fa-heart', 'fa-circle-plus');
        }
        else {
            localWatchlist.push(imdbID);
            localStorage.setItem("watchlist", JSON.stringify(localWatchlist))
            icon.classList.replace('fa-circle-plus', 'fa-heart')
        }
    })
    movieAddInfo.append(runTime,genre, watchlist)
    movieInfoDiv.append(movieTitle,movieAddInfo, moviePlot);

    movieContainer.append(posterDiv,movieInfoDiv); 

}

const renderPage = () => {
    resultsContainer.replaceChildren();
}


searchField.addEventListener('keyup', setValue);
searchBtn.addEventListener('click', searchMovie);

document.addEventListener('DOMContentLoaded', () => {

const api = '1f5fb779';
let searchValue = '';
const searchField = document.getElementById('movieSearch');
const searchBtn = document.getElementById("SearchBtn");    
const resultsContainer = document.getElementById('results');
const results = [];

const setValue = (event) => {
    searchValue = event.target.value.toLowerCase();
    if(event.code === "Enter")
    {
        searchMovie();
    }
    console.log(searchValue)
}

const searchMovie = async () => {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${api}&s=${searchValue}`);
    const {Response, Search} = await res.json();
    for(let movie of Search)
    {
        console.log(movie)
    }
    //If no search found then do this
    if(!Response)
    {
        console.log("No result found")
    }
    //Else print the results to screen
    else{
        console.log(Search);
    }
}    
searchField.addEventListener('keyup', setValue);
searchBtn.addEventListener('click', searchMovie);



})
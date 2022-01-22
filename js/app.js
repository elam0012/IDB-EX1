const APP = {
  init: (ev) => {
    //page has loaded
    APP.setUpDB();
    document
      .getElementById('movieForm')
      .addEventListener('submit', APP.saveMovie);
  },
  setUpDB: () => {
    //open the db
    //listen for onupgradeneeded
    //create store with keyPath title
    //add 4 movie objects
  },
  saveMovie: (ev) => {
    ev.preventDefault();
    let movie = {};
    let title = document.getElementById('title').value.trim();
    if (!title) return;
    movie.title = title;
    //check for the other two values too
    //add the other two values to the movie object
    APP.addMovie(movie);
  },
  addMovie: (movie) => {
    //insert the new movie to the indexedDB
  },
  getMovies: () => {
    //retrieve the list of movies from the database
    //call APP.displayMovies when transaction complete
  },
  displayMovies: () => {
    //called when DB is opened successfully
    //also called from APP.getMovies
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

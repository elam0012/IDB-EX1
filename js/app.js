const APP = {
  init: (ev) => {
    APP.setUpDB();
    document.getElementById('movieForm').addEventListener('submit', APP.saveMovie);
  },
  setUpDB: () => {
    //add 4 movie objects
    initDB();
    // APP.getMovies() // not ready to work yet
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

    let tx = DB.transaction("movieStore")

    tx.oncomplete =  (ev) => {
      // the transaction is complete... need to do something else
    }

    let movieStore = tx.objectStore('movieStore');
    let getRequest = movieStore.getAll(); // Request all teh movies
    // get() getAll() add() delete() set() count()
    getRequest.onsuccess = (ev) => {
      let movies = ev.target.result
      APP.displayMovies(movies)
    }

    getRequest.onerror = (err) = {
      //error reding the data
    }
  },
  displayMovies: (movies) => {
    //called when DB is opened successfully
    //also called from APP.getMovies

    movies.forEach( movie => {
      let li = document.createElement("li")
      li.textContent = movie.title
      let list = document.getElementById("datalist")
      list.append(li)
    });
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

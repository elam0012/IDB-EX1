const APP = {
  init: (ev) => {
    //page has loaded
    APP.setUpDB();
    document.getElementById('movieForm').addEventListener('submit', APP.saveMovie);
  },
  setUpDB: () => {
    //open the db
    //listen for onupgradeneeded
    //create store with keyPath title
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
      // the transaction is complete... need to do somthing else
    }

    let movieStore = tx.objectStore('movieStore');
    let getRequest = movieStore.getAll(); // Request all teh movies
    // get() getAll() add() delete() set() count()
    getRequest.onsuccess = (ev) => {
      // we now have all the movie data
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

    console.log(movies)
    // loop through movies
    // let list = document.querySelector("#datalist")
    // let html = movies.map(movie =>{
    //   return `<li></li>`
    // }).join('')
    // list.append(html)

    // 
    

    // let list = document.querySelector('#datalist');
    //     let html = movies.map((movie) => {
    //         let str = `<p>${movie.title}</p>`;
    //         return str;
    //       }).join('');
    //     list.setHTML(html);
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

const APP = {
  init: (ev) => {
    APP.setUpDB();
    document.getElementById('movieForm').addEventListener('submit', APP.saveMovie);
  },
  setUpDB: () => {
    initDB();
    // APP.getMovies() // not ready to work yet
  },
  saveMovie: (ev) => {
    ev.preventDefault();
    let movie = {};
    let title = document.getElementById('title').value.trim();
    if (!title) return;
    movie.title = title;
    let year = document.getElementById('year').value.trim();
    if (!year) return;
    movie.year = year;
    let rate = document.getElementById('rate').value.trim();
    if (!rate) return;
    movie.rate = rate;
    document.getElementById("movieForm").reset()
    APP.addMovie(movie);
  },
  addMovie: (movie) => {
    let tx = DB.transaction("movieStore", 'readwrite')
    tx.oncomplete =  (ev) => {
      // the transaction is complete... need to do something else
    }
    let movieStore = tx.objectStore('movieStore');
    let addRequest = movieStore.add(movie);
    addRequest.onsuccess = (ev) => {
      APP.getMovies()
    }
    addRequest.onerror = (err) = {
      //error adding the data
    }
  },
  getMovies: () => {
    let tx = DB.transaction("movieStore")
    tx.oncomplete =  (ev) => {
      // the transaction is complete... need to do something else
    }
    let movieStore = tx.objectStore('movieStore');
    let getRequest = movieStore.getAll(); 
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
    let list = document.getElementById("datalist")
    list.innerHTML = null // to prevent list to expand and repeat on html body
    movies.forEach( movie => {
      let li = document.createElement("li")
      li.textContent = movie.title
      list.append(li)
    });
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

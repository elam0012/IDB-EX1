import {DB, initDB} from "./idb.js"

const APP = {
  init: (ev) => {
    APP.setUpDB();
    document.getElementById('movieForm').addEventListener('submit', APP.saveMovie);
  },
  setUpDB: () => {
    initDB(APP.getMovies);
  },
  saveMovie: (ev) => {
    ev.preventDefault();
    let movie = {};
    let id = Math.random().toString(36).substring(2)
    movie.id = id;
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
    getRequest.onerror = (err) => {
      //error reding the data
    }
  },
  displayMovies: (movies) => {
    //called when DB is opened successfully
    //also called from APP.getMovies
    movies.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    let list = document.getElementById("datalist")
    list.innerHTML = "";
    movies.forEach( movie => {
      let li = document.createElement("li")
      li.textContent = movie.title
      list.append(li)
    });
  },
};

document.addEventListener('DOMContentLoaded', APP.init);

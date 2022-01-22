let DB = null;

function initDB() {

    let dbOpenRequest = indexedDB.open('movieDB', 1);

    dbOpenRequest.onupgradeneeded = function (ev) {
        DB = ev.target.result;
        //if you want to create collections/stores or modify them do it here
        //delete the old store
        try {
            DB.deleteObjectStore('movieStore');
        } catch (err) {
            console.log('error deleting old DB');
        }
        //You can write code to make specific DB changes depending on the old db version
        let options = {
            keyPath: 'id',
            //the required unique id property for each of the Store's documents
            autoIncrement: false,
        };
        //create a new store that will hold documents about movies.
        let movieStore = DB.createObjectStore('movieStore', options);
        //we can create indexes on the various properties expected in the documents.
        movieStore.createIndex('by_title', 'title', { unique: false });
        //we use indexes for sorting and searching our results.
    };

    dbOpenRequest.onerror = function (err) {
    //an error has happened during opening
        console.log(err.message);
    };

    dbOpenRequest.onsuccess = function (ev) {
        DB = dbOpenRequest.result;
        //or ev.target.result
        //result will be the reference to the database that you will use
        console.log(DB.name, `ready to be used.`);
        // console.log(DB.version);
        // console.log(DB.objectStoreNames); //list of all the store names.
        // DB is now usable

        // add some sample data
        //check for something in localStorage about sample movies already created.
        let isDataAdded = localStorage.getItem('movieStoreSampleDataAdded');
        if (!isDataAdded) {
            let tx = DB.transaction('movieStore', 'readwrite');
            console.log({ tx });
            addMovies(tx, MOVIES, 0);
            tx.oncomplete = function (ev) {
                //the transaction has run and given us the result, if any
                console.log('All movies added');
                localStorage.setItem('movieStoreSampleDataAdded', true);
                APP.getMovies();
                // we will read the movies immediately if they are in the DB
            };
        } else {
            APP.getMovies();
            // we will read the movies immediately if they are in the DB
        }
    };

    function addMovies(tx, movies, index = 0) {
    // console.log({ tx });
    // console.log(movies);
    // console.log(index);
        let movieStore = tx.objectStore('movieStore');
        let addRequest = movieStore.add(movies[index]);

        //handle the successful completion of the add
        addRequest.onsuccess = (ev) => {
            index++;
            if (index < movies.length) {
            console.log('about to add movie', index);
            addMovies(tx, movies, index);
            //recursively call the addMovies method
            //inside the same transaction
            } else {
            //done adding all the MOVIES
            }
        };

        addRequest.onerror = (err) => {
            console.warn('Failed to add', err.message);
        };
    }
}
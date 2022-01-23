let DB = null;

function initDB() {

    let dbOpenRequest = indexedDB.open('movieDB', 1); // open DB Request

    dbOpenRequest.onupgradeneeded = function (ev) {
        DB = ev.target.result

        try { // this will delete the old DB
            DB.deleteObjectStore('movieStore');
        } catch (err) {
            console.log('error deleting old DB');
        }

        let options = {
            keyPath: 'title',
            autoIncrement: false, 
        };
        
        let movieStore = DB.createObjectStore('movieStore', options); // to create the new store
        
        // movieStore.createIndex('by_title', 'title', { unique: false }); //we can create indexes on the various properties expected in the documents.
    };

    dbOpenRequest.onerror = function (err) {
    //an error has happened during opening
        console.log(err.message);
    };

    dbOpenRequest.onsuccess = function (ev) {
        DB = dbOpenRequest.result;
        console.log(DB.name, `ready to be used.`);
        // add some sample data
        
        let isDataAdded = localStorage.getItem('movieStoreSampleDataAdded'); //check for something in localStorage about sample movies already created.
        if (!isDataAdded) {
            let tx = DB.transaction('movieStore', 'readwrite');
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
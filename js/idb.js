let DB = null;
let dbOpenRequest = indexedDB.open('bookDB', 2);

dbOpenRequest.onupgradeneeded = function (ev) {
    DB = ev.target.result;
    //if you want to create collections/stores or modify them do it here
    //delete the old store
    try {
        DB.deleteObjectStore('bookStore');
    } catch (err) {
        console.log('error deleting old DB');
    }
    //You can write code to make specific DB changes depending on the old db version
    let options = {
        keyPath: 'id',
        //the required unique id property for each of the Store's documents
        autoIncrement: false,
    };
    //create a new store that will hold documents about books.
    let bookStore = DB.createObjectStore('bookStore', options);
    //we can create indexes on the various properties expected in the documents.
    bookStore.createIndex('by_title', 'title', { unique: false });
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
    //check for something in localStorage about sample books already created.
    let isDataAdded = localStorage.getItem('bookStoreSampleDataAdded');
    if (!isDataAdded) {
        let tx = DB.transaction('bookStore', 'readwrite');
        console.log({ tx });
        addBooks(tx, BOOKS, 0);
        tx.oncomplete = function (ev) {
        //the transaction has run and given us the result, if any
        console.log('All books added');
        localStorage.setItem('bookStoreSampleDataAdded', true);
        };
    }
};

function addBooks(tx, books, index = 0) {
  // console.log({ tx });
  // console.log(books);
  // console.log(index);
    let bookStore = tx.objectStore('bookStore');
    let addRequest = bookStore.add(books[index]);

    //handle the successful completion of the add
    addRequest.onsuccess = (ev) => {
        index++;
        if (index < books.length) {
        console.log('about to add book', index);
        addBooks(tx, books, index);
        //recursively call the addBooks method
        //inside the same transaction
        } else {
        //done adding all the BOOKS
        }
    };

    addRequest.onerror = (err) => {
        console.warn('Failed to add', err.message);
    };
}

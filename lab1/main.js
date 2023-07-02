"use strict";

const Film = require("./film.js");
const FilmLibrary = require("./film_library.js");


/**************
* Exercises 0 *
***************/

function f(strings) {
    return strings.map(s =>
        s.length < 2 ? "" : s[0] + s[1] + s[s.length - 2] + s[s.length - 1]
    );
}
console.log(f(["it", "cat", "c"]));


/****************
* Exercises 1+2 *
*****************/

let films = [
    new Film("1", "Pulp Fiction", true, "2022-03-10", 5),
    new Film("2", "21 Grams", true, "2022-03-17", 4),
    new Film("3", "Star Wars", false),
    new Film("4", "Matrix", false),
    new Film("5", "Shrek", false, "2022-03-21", 3),

];
let filmLibrary;

// Sort (without modifying the original!)
filmLibrary = new FilmLibrary(films);
console.log("Sorted:");
console.log(filmLibrary.sortByDate().toString());
console.log("Original:");
console.log(filmLibrary.toString());

// Delete film
filmLibrary = new FilmLibrary(films);
let film = films[0];
filmLibrary.deleteFilm(film.id);
console.log(`Delete ID=${film.id}:`);

// Reset watched dates
filmLibrary = new FilmLibrary(films);
filmLibrary.resetWatchedFilms();
console.log("Reset watched films:");
console.log(filmLibrary.toString());

// Get rate (without modifying the original!)
filmLibrary = new FilmLibrary(films);
console.log("Rated:");
console.log(filmLibrary.getRated().toString());
console.log("Original:");
console.log(filmLibrary.toString());
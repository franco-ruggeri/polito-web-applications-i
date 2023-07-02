"use strict";

const dayjs = require("dayjs");


class Film {
    constructor(id, title, favorite = false, watchDate = null, score = null) {
        this.id = id;
        this.title = title;
        this.favorite = favorite;
        this.watchDate = watchDate !== null ? dayjs(watchDate) : null;
        this.score = score;
    }

    toString = () => {
        let watchDate = this.watchDate !== null
            ? this.watchDate.format("YYYY-MM-DD")
            : "<not defined>";
        let score = this.score !== null ? this.score : "<not defined>";

        return `Id: ${this.id}`
            + `, Title: ${this.title}`
            + `, Favorite: ${this.favorite}`
            + `, Watch date: ${watchDate}`
            + `, Score: ${score}`;
    };
}

class FilmLibrary {
    constructor(films = []) {
        this.films = [];
        films.forEach(film => this.addNewFilm(film));
        this.a = "ciao";
    }

    toString = () => {
        let s = "";
        this.films.forEach(film => { s += film.toString() + "\n"; });
        return s;
    };

    addNewFilm = (film) => {
        this.films.push(film);
    };

    sortByDate = () => {
        let films = [...this.films];    // copy

        films.sort((film1, film2) => {
            if (film1.watchDate === null && film2.watchDate === null)
                return 0;
            else if (film1.watchDate === null)
                return 1;
            else if (film2.watchDate === null)
                return -1;
            else
                return film1.watchDate.diff(film2.watchDate);
        });

        return new FilmLibrary(films);
    };

    deleteFilm = (id) => {
        this.films = this.films.filter(f => f.id !== id);
    };

    resetWatchedFilms = () => {
        this.films.forEach(film => { film.watchDate = null; });
    };

    getRated = () => {
        let films = this.films
            .filter(film => film.score !== null)    // new array
            .sort((film1, film2) => film2.score - film1.score);
        return new FilmLibrary(films);
    };
}


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
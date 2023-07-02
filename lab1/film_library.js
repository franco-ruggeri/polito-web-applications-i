"use strict";

class FilmLibrary {
    constructor(films = []) {
        this.films = [];
        films.forEach(film => this.addNewFilm(film));
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
        const films = [...this.films];    // copy

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
        const films = this.films
            .filter(film => film.score !== null)    // new array
            .sort((film1, film2) => film2.score - film1.score);
        return new FilmLibrary(films);
    };
}

module.exports = FilmLibrary;
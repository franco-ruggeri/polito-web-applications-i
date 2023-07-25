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
            .filter(film => film.score !== null)
            .sort((film1, film2) => film2.score - film1.score);
        return new FilmLibrary(films);
    };

    getBestRated = () => {
        const films = this.films.filter(film => film.score === 5);
        return new FilmLibrary(films);
    };

    getFavorite = () => {
        const films = this.films.filter(film => film.favorite);
        return new FilmLibrary(films);
    };

    getSeenLastMonth = () => {
        const now = dayjs();
        const films = this.films.filter(
            film => now.diff(film.watchDate, "month") < 1
        );
        return new FilmLibrary(films);
    };

    getUnseen = () => {
        const films = this.films.filter(film => film.watchDate === null);
        return new FilmLibrary(films);
    };

    toHtml = () => {
        const films = this.films
            .map(film => film.toHtml())
            .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                ""
            );

        return `
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Favorite</th>
                        <th scope="col">Watch date</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>${films}</tbody>
            </table>
        `;
    };
}

export default FilmLibrary;
"use strict";

const dayjs = require("dayjs");
const Film = require("./film.js");


class FilmLibrary {
    constructor(database) {
        this.database = database;
    }

    _get = async (sql, params) => {
        return new Promise((resolve, reject) => {
            this.database.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const films = rows.map(
                        row => new Film(
                            row.id,
                            row.title,
                            row.favorite,
                            row.watchdate,
                            row.rating
                        )
                    );
                    resolve(films);
                }
            });
        });
    };

    _run = async (sql, params) => {
        return new Promise((resolve, reject) => {
            this.database.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    getAll = async () => {
        const sql = "SELECT * FROM films";
        const params = [];
        return this._get(sql, params);
    };

    getFavorite = async () => {
        const sql = "SELECT * FROM films WHERE Favorite=?";
        const params = [1];
        return this._get(sql, params);
    };

    getWatchedToday = async () => {
        const sql = "SELECT * FROM films WHERE watchdate=?";
        const params = [dayjs().format("YYYY-MM-DD")];
        return this._get(sql, params);
    };

    getWatchedBefore = async (date) => {
        const sql = "SELECT * FROM films WHERE watchdate<?";
        const params = [dayjs(date).format("YYYY-MM-DD")];
        return this._get(sql, params);
    };

    getRatedAtLeast = async (score) => {
        const sql = "SELECT * FROM films WHERE rating>=?";
        const params = [score];
        return this._get(sql, params);
    };

    search = async (pattern) => {
        pattern = `%${pattern}%`;
        const sql = "SELECT * FROM films WHERE title LIKE ?";
        const params = [pattern];
        return this._get(sql, params);
    };

    add = async (film) => {
        const sql =
            "INSERT INTO films(id, title, favorite, watchdate, rating)"
            + "VALUES (?, ?, ?, ?, ?)";
        const params = [
            film.id,
            film.title,
            film.favorite,
            film.watchDate,
            film.rating
        ];
        return this._run(sql, params);
    };

    delete = async (id) => {
        const sql = "DELETE FROM films WHERE id=?";
        const params = [id];
        return this._run(sql, params);
    };

    resetWatchDates = async () => {
        const sql = "UPDATE films SET watchdate=NULL";
        const params = [];
        return this._run(sql, params);
    };
}

module.exports = FilmLibrary;
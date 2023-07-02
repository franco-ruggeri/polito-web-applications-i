"use strict";

const fs = require("fs");
const sqlite = require("sqlite3");
const FilmLibrary = require("./film_library.js");
const Film = require("./film.js");

function print(title, array) {
    console.log(title);
    array.forEach(element => { console.log(element.toString()); });
    console.log("\n");
}

function copyDatabase(filepath_in, filepath_out) {
    return new Promise((resolve, reject) => {
        fs.copyFile(filepath_in, filepath_out, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

async function main() {
    const database_path = "./lab2/data/films_copy.db";

    await copyDatabase(
        "./lab2/data/films.db",
        database_path
    );

    const database = new sqlite.Database(
        database_path,
        err => { if (err) throw err; }
    );

    const filmLibrary = new FilmLibrary(database);
    let films;

    films = await filmLibrary.getAll();
    print("All films:", films);

    films = await filmLibrary.getFavorite();
    print("Favorite films:", films);

    films = await filmLibrary.getWatchedToday();
    print("Films watched today:", films);

    const date = "2022-03-15";
    films = await filmLibrary.getWatchedBefore(date);
    print(`Films watched before ${date}:`, films);

    const score = 3;
    films = await filmLibrary.getRatedAtLeast(score);
    print(`Films rated at least ${score}:`, films);

    const pattern = "F";
    films = await filmLibrary.search(pattern);
    print(`Films matching '${pattern}':`, films);

    const film = new Film(7, "Pippo & Pluto", true, "2023-07-02", 5);

    await filmLibrary.add(film);
    films = await filmLibrary.getAll();
    print(`Add film: ${film.toString()}`, films);

    await filmLibrary.delete(film.id);
    films = await filmLibrary.getAll();
    print(`Delete ID=${film.id}:`, films);

    await filmLibrary.resetWatchDates();
    films = await filmLibrary.getAll();
    print("Reset watch dates:", films);

    database.close();
}

main();
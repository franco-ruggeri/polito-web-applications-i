"use strict";

import Film from "./film.js";
import FilmLibrary from "./film_library.js";

async function updateFilter(event, filmLibrary) {
    // Update active filter
    const filters = Array.from(document.getElementById("filters").children);
    filters.forEach(
        element => element.classList.remove("active")
    );
    event.target.classList.add("active");

    // Update heading
    const heading = document.getElementById("filter-heading");
    heading.innerText = event.target.innerText;
    
    // Update shown films
    updateFilms(filmLibrary);
}

async function updateFilms(filmLibrary) {
    // Filter films
    const filter = document.querySelector("#filters .active");
    let filteredFilmLibrary;
    switch (filter.id) {
    case "filter-all":
        filteredFilmLibrary = filmLibrary;
        break;
    case "filter-favorite":
        filteredFilmLibrary = filmLibrary.getFavorite();
        break;
    case "filter-best-rated":
        filteredFilmLibrary = filmLibrary.getBestRated();
        break;
    case "filter-seen-last-month":
        filteredFilmLibrary = filmLibrary.getSeenLastMonth();
        break;
    case "filter-unseen":
        filteredFilmLibrary = filmLibrary.getUnseen();
        break;
    default:
        console.log("Unknown filter!");
        filteredFilmLibrary = new FilmLibrary([]);
        break;
    }

    // Display films
    const films = document.getElementById("films");
    films.innerHTML = filteredFilmLibrary.toHtml();

    // Register event listeners
    const filmRows = Array.from(films.querySelector("tbody").children);
    filmRows.forEach(filmRow => {
        const deleteButton = filmRow.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            filmLibrary.deleteFilm(filmRow.id);
            updateFilms(filmLibrary);
        });
    });
}

async function main() {
    const films = [
        new Film("1", "Pulp Fiction", true, "2022-03-10", 5),
        new Film("2", "21 Grams", true, "2023-06-26", 4),
        new Film("3", "Star Wars", false),
        new Film("4", "Matrix", false),
        new Film("5", "Shrek", false, "2023-06-24", 3),
    ];
    const filmLibrary = new FilmLibrary(films);
    
    const filters = Array.from(document.getElementById("filters").children);
    filters.forEach(
        element => element.addEventListener(
            "click", 
            event => updateFilter(event, filmLibrary)
        )
    );

    updateFilms(filmLibrary);
}

main();
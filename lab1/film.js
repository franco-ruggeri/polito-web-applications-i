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
        const watchDate = this.watchDate !== null
            ? this.watchDate.format("YYYY-MM-DD")
            : "<not defined>";
        const score = this.score !== null ? this.score : "<not defined>";

        return `Id: ${this.id}`
            + `, Title: ${this.title}`
            + `, Favorite: ${this.favorite}`
            + `, Watch date: ${watchDate}`
            + `, Score: ${score}`;
    };
}

module.exports = Film;
"use strict";

class Film {
    #maxScore = 5;

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

    toHtml = () => {
        const starFill = "<i class='bi bi-star-fill'></i>";
        const starEmpty = "<i class='bi bi-star'></i>";
        const trash = "<i class='bi bi-trash'></i>";

        const favorite = this.favorite ? "checked" : "";
        const watchDate = this.watchDate !== null
            ? this.watchDate.format("MMMM D, YYYY") 
            : "";
        const rating = starFill.repeat(this.score) 
            + starEmpty.repeat(this.#maxScore - this.score);

        return `
            <tr id=${this.id}>
                <td>${this.title}</td>
                <td>
                    <input class="form-check-input" type="checkbox" 
                    ${favorite}>
                </td>
                <td>${watchDate}</td>
                <td>${rating}</td>
                <td>
                    <button class="btn delete p-0" type="button">
                        ${trash}
                    </button>
                </td>
            </tr>
        `;
    };
}

export default Film;
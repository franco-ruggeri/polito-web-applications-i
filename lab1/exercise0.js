"use strict";

function f(strings) {
    return strings.map(s =>
        s.length < 2 ? "" : s[0] + s[1] + s[s.length - 2] + s[s.length - 1]
    );
}

console.log(f(["it", "cat", "c"]));

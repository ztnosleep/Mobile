"use strict";
function rejectAfterOneSecond() {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Something went wrong"));
        }, 1000);
    });
}
rejectAfterOneSecond()
    .then((value) => {
    console.log("Resolved with:", value);
})
    .catch((error) => {
    console.error("Rejected with:", error.message);
});

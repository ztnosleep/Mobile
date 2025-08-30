"use strict";
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}
simulateTask(2000)
    .then((message) => {
    console.log(message);
});

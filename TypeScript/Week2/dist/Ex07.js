"use strict";
function simulatedTaskRace(time) {
    return new Promise((resolve) => setTimeout(() => {
        resolve('Task completed' + time + 'ms');
    }));
}
const task3 = simulatedTaskRace(3000);
const task1 = simulatedTaskRace(1000);
const task2 = simulatedTaskRace(500);
Promise.race([task1, task2, task3]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});

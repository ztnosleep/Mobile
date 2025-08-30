function getRandomNumber(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            resolve(randomNum);
        }, 1000);
    });
}

getRandomNumber().then((num) => {
    console.log("Random number:", num);
});
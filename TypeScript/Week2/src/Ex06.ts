function simulatedTask(time: number){
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve('Task completed' + time + 'ms')
        }))
}
Promise.all([simulatedTask(1000), simulatedTask(2000), simulatedTask(3000)]).then((results) => {
    console.log(results)
}).catch((error) => {
    console.error(error)
})
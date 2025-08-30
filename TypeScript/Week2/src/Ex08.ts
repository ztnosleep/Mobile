Promise.resolve(2)
  .then((num) => {
    console.log(`Starting with: ${num}`);
    return num * num; 
  })
  .then((squared) => {
    console.log(`Squared: ${squared}`);
    return squared * 2; 
  })
  .then((doubled) => {
    console.log(`Doubled: ${doubled}`);
    return doubled + 5; 
  })
  .then((finalResult) => {
    console.log(`Final result: ${finalResult}`);
  })
  .catch((err) => {
    console.error("Something went wrong:", err);
  });
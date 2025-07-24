const a = 10;
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Enter a number: ", (b) => {
    console.log("You entered:", b);
    console.log("a is:", a);
    readline.close();
});

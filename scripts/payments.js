const yargs = require("yargs");
const { generatePayments } = require("./generator");
const argv = yargs
    .command("amount", "Decides the number of payments to generate", {
        amount: {
            description: "The amount to generate",
            alias: "a",
            type: "number",
        },
    })
    .help()
    .alias("help", "h").argv;
if (argv.hasOwnProperty("amount")) {
    const amount = argv.amount;
    generatePayments(amount);
}

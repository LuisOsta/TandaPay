const yargs = require("yargs");
const { generateTransfers } = require("./generator");
const argv = yargs
    .command("amount", "Decides the number of wallet transfers to generate", {
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
    generateTransfers(amount);
}

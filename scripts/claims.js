const yargs = require("yargs");
const { generateClaims } = require("./generator");
const argv = yargs
	.command("amount", "Decides the number of claims to generate", {
		amount: {
			description: "The amount to generate",
			alias: "a",
			type: "number"
		}
	})
	.help()
	.alias("help", "h").argv;
if (argv.hasOwnProperty("amount")) {
	const amount = argv.amount;
	generateClaims(amount);
}

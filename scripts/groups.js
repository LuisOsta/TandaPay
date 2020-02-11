let yargs = require("yargs");
let fs = require("fs");
let faker = require("faker");

let argv = yargs
    .command("members", "The number of memebers to put in the group", {
        description: "The number of members",
        alias: "m",
        type: "number",
    })
    .help()
    .alias("help", "h").argv;

let group = {
    secretary: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
    },
    members: enumerate(argv.members).map(() => ({
        name: faker.name.findName(),
        id: faker.random.uuid(),
        profile: "???",
        standing: faker.helpers.randomize(["good", "okay", "bad"]),
    })),
    groupName: faker.address.country(),
    premium: faker.finance.amount(),
    groupDocs: [],
    groupStanding: "good",
    subgroups: [],
};

fs.writeFileSync("client/src/data/group.json", JSON.stringify(group));

function enumerate(num) {
    let arr = [];
    for (let i = 1; i <= num; i++) arr.push(i);
    return arr;
}

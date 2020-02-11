const faker = require("faker");
const fs = require("fs");

const generateClaims = amount => {
    const groupID = faker.random.uuid();
    const groupName = faker.address.country();
    const claims = [];
    for (var x = 0; x < amount; x++) {
        claims.push(createClaim(groupID, groupName));
    }
    const object = {
        claims: claims,
    };
    const jsonObj = JSON.stringify(object);
    fs.writeFileSync("client/src/data/claims.json", jsonObj);
};

const generateTransfers = amount => {
    const transfers = [];
    for (var x = 0; x < amount; x++) {
        transfers.push(createTransfer());
    }
    const object = {
        transfers: transfers,
    };
    const jsonObj = JSON.stringify(object);
    fs.writeFileSync("client/src/data/transfers.json", jsonObj);
};

const generatePayments = amount => {
    const payments = [];
    const name = faker.name.findName();
    const groupName = faker.address.country();
    const subgroupName = faker.name.title();
    for (var x = 0; x < amount; x++) {
        payments.push(createPayment(name, groupName, subgroupName));
    }
    const object = {
        payments: payments,
    };
    const jsonObj = JSON.stringify(object);
    fs.writeFileSync("client/src/data/payments.json", jsonObj);
};

const createPayment = (name, group, subgroup) => {
    let payment = {
        objectID: faker.random.uuid(),
        name,
        group,
        subgroup: subgroup,
        amount: faker.finance.amount(),
        createdAt: faker.date.past(),
    };
    return payment;
};
const createTransfer = () => {
    const type = Math.floor(Math.random() * Math.floor(3));
    const transferType = type === 0 ? "sell" : type === 1 ? "send" : "buy";
    const status = type === 0 ? "pending" : type === 1 ? "approved" : "denied";

    let transfer = {
        objectID: faker.random.uuid(),
        type: transferType,
        recipient: faker.name.findName(),
        status: status,
        createdAt: faker.date.past(),
        amount: faker.finance.amount(),
    };
    return transfer;
};
const createClaim = (groupID, groupName) => {
    const type = Math.floor(Math.random() * Math.floor(3));
    const status = type === 0 ? "pending" : type === 1 ? "approved" : "denied";
    let claim = {
        objectID: faker.random.uuid(),
        groupID: groupID,
        groupName: groupName,
        subgroup: faker.name.title(),
        name: faker.name.findName(),
        amount: faker.finance.amount(),
        creatorID: faker.random.uuid(),
        summary: faker.lorem.paragraphs(3),
        documents: faker.lorem.paragraph(),
        status: status,
        imageURL: faker.image.imageUrl(),
        createdAt: faker.date.past(),
    };
    return claim;
};

module.exports = {
    generateClaims,
    generateTransfers,
    generatePayments,
};

const mongoose = require("mongoose");
const Claim = mongoose.model("claims");

/**
 * @summary: Gets all claims associated with a user's group
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function getAllClaims(req, res, next) {
    const { _id, name } = req.user;
    const claimsByGroup = await Claim.find({ groupID: testGroupID });
    console.log(claimsByGroup);
    res.send(claimsByGroup);
}

/**
 * @summary: Creates a new claim
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function createNewClaim(req, res, next) {
    const { _id, name } = req.user;
    const { summary, documents, amount } = req.body;
    const claim = new Claim({
        groupID: testGroupID,
        creatorID: _id,
        creatorName: name,
        summary,
        documents,
        status: "pending",
        claimAmount: amount,
    });
    await claim.save();
    res.status(200).send(claim);
}

/**
 * @summary: Retrieves the claim doc via the request's params
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function getClaimByID(req, res, next) {
    let { claimID } = req.params;

    if (!claimID) {
        return res.status(400).send({ error: "no :id" });
    }

    let claim = await Claim.findById(id);
    if (!claim) {
        return res.status(404).send({ error: "no such claim" });
    }

    res.status(200).send(claim);
    next();
}

/**
 * @summary: Updates a claim
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function updateClaimByID(req, res, next) {
    let { claimID } = req.params;

    if (!claimID) {
        return res.status(400).send({ error: "no :id" });
    }

    let claim = await Claim.findById(id);
    if (!claim) {
        return res.status(404).send({ error: "no such claim" });
    }

    res.status(500).send({ error: "unimplemented" });
}

/**
 * @summary: Approves a claim
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
*/
async function approveClaimByID(req, res, next) {
    let { claimID } = req.params;

    if (!claimID) {
        return res.status(400).send({ error: "no :id" });
    }

    let claim = await Claim.findById(id);
    if (!claim) {
        return res.status(404).send({ error: "no such claim" });
    }

}

module.exports = {
    getAllClaims,
    createNewClaim,
    getClaimByID,
    updateClaimByID,
    approveClaimByID,
};

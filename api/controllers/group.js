let mongoose = require("mongoose");
let crypto = require("crypto");
let Group = mongoose.model("groups");
let { sendEmail } = require("../lib/twilio");
let invitationTemplate = require("../templates/invite.html.js");

/**
 * @summary: Retrieves the group doc via the request's params
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function getGroupByIDController(req, res, next) {
    let id = req.params.groupID;
    if (!id) {
        return res.status(400).send({ error: "no :id" });
    }

    let group = await Group.findById(id);
    if (!group) {
        return res.status(404).send({ error: "no such group" });
    }

    res.status(200).send(group);
    next();
}

/**
 * @summary: Creates a new group
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function newGroupController(req, res, next) {
    let secretary = req.user;
    let { groupName, premium } = req.body;

    if (!groupName) {
        return res.status(400).send({ error: "groupName required" });
    }

    if (!premium) {
        return res.status(400).send({ error: "premium required" });
    }

    if (isNaN(premium) || premium < 0) {
        return res.status(400).send({ error: "invalid premium" });
    }

    try {
        let group = new Group({
            secretary: {
                name: secretary.name,
                email: secretary.email,
                phone: secretary.phone,
            },
            members: [
                {
                    id: secretary._id,
                    name: secretary.name,
                    standing: "good",
                },
            ],
            groupName,
            premium,
            groupStanding: "okay",
            subgroups: [],
            accessCode: generateAccessCode()
        });
        await group.save();

        secretary.groupID = group._id;
        await secretary.save();

        res.status(200).send(group);
    } catch (e) {
        res.status(500).send({ error: "internal server error" });
    }

    next();
}

/**
 * @summary: Creates an invitation to a group
 * @param req: The Express request object
 * @param res: The Express response object
 * @param next: The Express next function
 * @returns: void
 */
async function inviteToGroupController(req, res, next) {
    let secretary = req.user;

    let { groupID } = req.params;
    if (!groupID) {
        return res.status(400).send({ error: "no :id" });
    }

    let userEmail = req.body.email;
    if (!userEmail) {
        return res.status(400).send({ error: "missing email" });
    }

    if (!/\S+@\S+\.\S+/.test(userEmail)) {
        return res.status(400).send({ error: "invalid email" });
    }

    let group = await Group.findById(groupID);
    if (!group) {
        return res.status(404).send({ error: "no such group" });
    }

    if (group.secretary.email != secretary.email) {
        return res
            .status(403)
            .send({ error: "you don't have access to this group" });
    }

    let html = invitationTemplate({
        group: group.groupName,
        secretary: secretary.name,
        url: "http://backend-app-dot-peerless-dahlia-229121.appspot.com/",
        code: group.accessCode,
    });

    await sendEmail(
        userEmail,
        "You've been invited to a group on TandaPay",
        html
    );

    res.status(200).send({ success: true });
}

/**
 * @summary generates an access code
 * this can generate 4,294,967,296 unique access codes
 */
function generateAccessCode() {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = {
    getGroupByIDController,
    newGroupController,
    inviteToGroupController,
};
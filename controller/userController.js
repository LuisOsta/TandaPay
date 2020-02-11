const mongoose = require("mongoose");
const User = mongoose.model("users");
const Group = require("../models/Group");
const { isMobilePhone, isEmail } = require("validator");
const bcrypt = require("bcryptjs");

let checkSetupSettings = async (req, res, next) => {
  const { role, accessCode, walletProvider, ethAddress } = req.body;

  if (role === "policyholder" && accessCode === "") {
    return res.status(400).send("Policyholder must provide access code");
  }

  if (role !== "policyholder" && role !== "secretary") {
    return res.status(400).send("Invalid role for user");
  }

  if (walletProvider !== "metamask" && walletProvider !== "fortmatic") {
    return res.status(400).send("Invalid Wallet Provider");
  }
  //check if the eth address is a valid address
  if (!ethAddress) {
    return res.status(400).send("Invalid Ethereum account");
  }

  next();
};

/**
 * @summary
 * @param {Express.Request} req
 * @param {Express.Request} res
 * @param {Function} next
 */
let saveUpdates = async (req, res, next) => {
  const { role, accessCode, walletProvider, ethAddress } = req.body;
  const user = req.user;

  if (user.accountCompleted) {
    return res.status(400).send("User already completed");
  }

  if (accessCode == "__admin__") {
    role = "admin";
  } else if (role === "policyholder") {
    let group = await Group.findByAccessCode(accessCode);

    if (!group) {
      return res.status(400).send("Invalid access code");
    }

    group.members.push({
        id: user._id,
        name: user.name,
        profile: '',
        standing: user.standing
    });
    await group.save();

    user.groupID = group._id;
  }

  user.role = role;
  user.walletProvider = walletProvider;
  user.ethereumAddress = ethAddress;
  user.accountCompleted = true;
  user.settings = [
    { code: "premium_paid", domain: "email", value: false },
    { code: "premium_paid", domain: "sms", value: false },
    { code: "claim_created", domain: "email", value: true },
    { code: "claim_created", domain: "sms", value: false },
    { code: "claim_updated", domain: "email", value: true },
    { code: "claim_updated", domain: "sms", value: false },
    { code: "claim_approved", domain: "email", value: true },
    { code: "claim_approved", domain: "sms", value: true }
  ];
  await user.save();
  req.user = user;
  next();
};

let generateUpdatedToken = async (req, res, next) => {
  const user = req.user;
  try {
    const token = await user.generateAuthToken();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateWallet = async (req, res, next) => {
  try {
    const user = req.user;
    const { provider, ethAddress } = req.body;
    user.walletProvider = provider;
    user.ethereumAddress = ethAddress;
    const newUser = await user.save();
    req.user = newUser;
    next();
  } catch (e) {
    res.status(500).send(e);
  }
};

/**
 * @summary
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const updateProfile = async (req, res, next) => {
  const user = req.user;
  const { name, email, phone, newPassword } = req.body;

  //if the profile info was provided and its different than the current definition, then update the user profile
  try {
    user.email = email && user.email !== email ? email : user.email;
    user.name = name && user.name !== name ? name : user.name;
    user.phone = phone && user.phone !== phone ? phone : user.phone;
    user.password = newPassword ? newPassword : user.password;
    const newUser = await user.save();
    req.user = newUser;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * @summary
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 */
const checkUpdateSettings = async (req, res, next) => {
  const user = req.user;
  const { name, email, phone, oldPassword, newPassword } = req.body;

  //if the email has been provided, check that it is valid
  if ((email && !isEmail(email)) || (phone && !isMobilePhone(phone))) {
    return res.status(400).send({
      error: "Invalid update values"
    });
  }

  //if the new email the user is providing is already taken by someone else
  if (email !== user.email) {
    const existingUser = await User.findOne({
      email: email
    });
    if (existingUser) {
      return res.status(400).send({
        error: "That email is already taken"
      });
    }
  }

  if (oldPassword && !newPassword) {
    return res.status(400).send({
      error: "To update password, a new one must be provided"
    });
  }

  if (oldPassword && newPassword) {
    const result = await bcrypt.compare(oldPassword, user.password);
    if (result) {
      next();
    } else {
      return res.status(400).send({
        error: "Old password is incorrect"
      });
    }
  }

  next();
};

/**
 * @summary
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const completeProfile = (req, res) => {
  const token = req.token;
  res.cookie("x-auth", token, {
    maxAge: 9000000000,
    httpOnly: false,
    secure: false
  });

  if (req.user) {
    const { email, name, status, accountCompleted } = req.user;
    return res.send({ token, email, name, status, accountCompleted });
  } else {
    return res.send();
  }
};

/**
 * @summary
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
const deleteProfile = async (req, res) => {
  const user = req.user;
  try {
    await User.findByIdAndDelete(user._id);
    res.cookie("x-auth", "", { maxAge: Date.now() });
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
};

/**
 * @summary
 * @param {Express.Request}
 * @param {Express.Response}
 * @returns
 */
const sendProfile = (req, res) => {
  const token = req.token;
  const user = req.user;
  const {
    email,
    name,
    status,
    accountCompleted,
    role,
    walletProvider,
    picture,
    phone,
    ethereumAddress,
    settings
  } = user;
  res.cookie("x-auth", token, {
    maxAge: 9000000000,
    secure: false,
    httpOnly: false
  });
  return res.status(200).send({
    email,
    name,
    status,
    accountCompleted,
    role,
    walletProvider,
    picture,
    phone,
    ethereumAddress,
    settings
  });
};
module.exports = {
  checkSetupSettings,
  saveUpdates,
  generateUpdatedToken,
  updateWallet,
  sendProfile,
  completeProfile,
  deleteProfile,
  updateProfile,
  checkUpdateSettings
};

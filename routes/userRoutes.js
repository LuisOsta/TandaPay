const express = require("express");
const User = require("../models/User");
const {
  checkSetupSettings,
  saveUpdates,
  generateUpdatedToken,
  sendProfile,
  updateWallet,
  completeProfile,
  deleteProfile,
  updateProfile,
  checkUpdateSettings
} = require("../controller/userController");
const {
  authenticated,
  checkSignature
} = require("../middleware/authenticated");
let router = express.Router();

/**
 * @summary retrieves the full information about the user and sends it back as a response
 * @param token identifier to determine which user to retrieve
 * @todo move to the API folder when appropriate
 */
router.get("/profile", checkSignature, authenticated, sendProfile);

/**
 * @summary Adds the role, groupID/accessCode, walletProvider and ethAddress to the user
 * and sends back a new auth token that says their account is complete.
 */
router.patch(
  "/complete",
  checkSetupSettings,
  authenticated,
  saveUpdates,
  generateUpdatedToken,
  completeProfile
);

router.delete("/delete", authenticated, deleteProfile);

/**
 * @summary
 */
router.patch(
  "/wallet",
  authenticated,
  updateWallet,
  generateUpdatedToken,
  sendProfile
);

router.patch(
  "/profile",
  authenticated,
  checkUpdateSettings,
  updateProfile,
  sendProfile
);
module.exports = router;

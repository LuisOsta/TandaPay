/**
 * @summary It will receive the possibly updated values, and the authenticated user object.
 * Then it will compare the two to determine whether the user object has beenc hanged.
 * @param {Object} body - the values passed to the onSubmit function called by React Final Form. It will have the information that could be changed
 * @param {Object} user - the information associated with the currently authenticated user
 * @returns {Boolean} whether the user profile setttings have been changed from the current user
 */
function haveSettingsChanged(body, user) {
  const {
    name,
    email,
    phone,
    oldPassword,
    newPassword,
    confirmPassword
  } = body;
  return (
    name !== user.name ||
    email !== user.email ||
    phone !== user.phone ||
    oldPassword ||
    newPassword ||
    confirmPassword
  );
}

export { haveSettingsChanged };

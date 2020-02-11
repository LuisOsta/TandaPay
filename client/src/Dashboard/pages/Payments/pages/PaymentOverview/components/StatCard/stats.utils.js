import { getDAIBalance } from "../../../../../../../web3";

/**
 * @summary It will switch through each type, and then retrieve the stats associated
 * with the type value based on the given data source.
 * It will return it in the array format used in the subfunctions
 * @param {String} type
 * @param {*} data the data parameter is either the group object (if the type is payment) or an array if the type is claims. If the type is 'wallet' it will be undefined
 */
const getStats = async (type, data) => {
  //if the data object is either null or undefined
  //unless the type of data you're querying is for the wallet card
  if (!data && type !== "wallet") {
    const val = 0;
    return [val.toFixed(2), "LOADING INFO"];
  }
  switch (type) {
    case "claims": {
      const [amount, extra] = getClaimStat(data);
      return [amount.toFixed(2), extra];
    }
    case "payment": {
      const [amount, extra] = getGroupStat(data);
      return [amount, extra];
    }
    case "wallet": {
      const [amount, extra] = await getWalletStat(data);
      return [`~ ${amount}`, extra];
    }
    default: {
      const val = 0;
      return [val.toFixed(2), "INVALID TYPE PROVIDED"];
    }
  }
};

/**
 * @summary It will use the web3 function getDAIBalance which will return a null object
 * for amount and the error message if something goes wrong and vice versa in the case of a success
 * @param {Object} ethereum
 * @returns {Array}
 */
const getWalletStat = async ethereum => {
  if (ethereum == null) {
    return ["0", "LOADING BALANCE"];
  }
  const { web3, DAI } = ethereum;
  const [amount, error] = await getDAIBalance(web3, DAI);
  if (error) {
    return ["N/A", "ERROR GETTING BALANCE"];
  } else {
    return [amount, "ESTIMATED FROM EXCHANGE RATE"];
  }
};

/**
 * @summary It will check for the validity of the group and then return the premium amount and the next payment date for the aforementioned premium.
 * This function will pull the premium amount and the payment date, and return them. If the group hasn't been created (_id is not defined) it will return 'N/A'
 * for the amount and it will return 'PERIOD NOT STARTED' for extra if the payment date is not defined
 * @param {Object} group the group object as it's represented in the redux store.
 * It holds the information regarding premium payments, payment dates, who the secretary is, etc.
 * @returns {Array}
 */
const getGroupStat = group => {
  const amount = group._id === null ? "N/A" : group.premium;
  const extra =
    group._id === null ? "GROUP MUST BE CREATED" : group.paymentDate;

  if (extra === undefined) {
    return [amount, "PERIOD NOT STARTED"];
  } else {
    return [amount, `DUE ${extra}`];
  }
};

/**
 * @summary The claims function will filter through all of the claims, to allow only the approved claims.
 * And then it will return the number of total claims created and the number of approved claims
 * @param {Array} claims the claims object as it's represented in the redux store. It holds an array with all of the claims created by the group members
 * @returns {Array}
 */
const getClaimStat = claims => {
  const numOfClaimsApproved = claims.filter(
    claim => claim.status === "approved"
  ).length;

  return [claims.length, `${numOfClaimsApproved} APPROVED`];
};
export { getStats };

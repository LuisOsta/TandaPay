if (process.env.NODE_ENV === "production") {
    // we are in production
    module.exports = require("./env");
} else if (process.env.NODE_ENV === "ci") {
    module.exports = require("./ci");
} else {
    // We are in development or test environment
    module.exports = require("./dev");
}

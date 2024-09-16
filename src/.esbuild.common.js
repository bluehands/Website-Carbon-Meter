const CARBON_METER_VERSION = require("./package.json").version;

module.exports = {
  define: {
    "process.env.CARBON_METER_VERSION": JSON.stringify(CARBON_METER_VERSION),
  },
};

const config = require('./v_config');
const runMode = require('./get__run-mode');

setEnvConfig = () => {
  try {
    if (runMode === "node") {
      process = config;
    } else {
      window = config;
    }
    return dbMode;
  } catch (error) {
    //console.error(error);
    return false;
  }
};

module.exports = setEnvConfig();
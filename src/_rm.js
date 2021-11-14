const v_fs = require('v_file_system');
const path = require('path');
const config = require('../v_config');


rm = async (dbName) => {
  try {
    const rmDbRes = await v_fs.promise.removeDir(path.join(__dirname, `../${config.dataLocation}/${dbName}`));
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = rm;
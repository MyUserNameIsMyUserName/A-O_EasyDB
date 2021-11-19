//const runMode = require("./..get__run-mode");
//const appTitle = require("./..set__app-title");
//const consoleOutput = require("./..set__console-output");
//const dataDir = require("./..set__data-dir");
const dbMode = require("./set__env-config");

const config = {
  dbMode
};

if (process.consoleOutput === true) {
  console.log(JSON.stringify(config, true, 4));
  console.log(`\n📑 Title : ${appTitle}`);
  console.log(`\n📡 Console Output : ${consoleOutput}`);
  console.log(`\n🚀 Application is running in [ ${runMode} ] mode.`);
  console.log(`\n🚩 Data Directory : ${dataDir}`);
  console.log(`\n📁 Database Mode : ${dbMode}`);
}

module.exports = config;

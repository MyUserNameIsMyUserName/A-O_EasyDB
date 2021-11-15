const v_db = require("../index");

const testData = {
  db: {
    name: "wee_db_11",
    pass: "123456789_V-core9"
  },
  db2: {
    name: "wee_db_112",
    pass: "123456789_V-core92"
  },
  dbTestCount: 50,
};


mkTestBases = async () => {
  try {
    const res = [ v_db.newDB(testData.db.name, testData.db.pass) ];

    for (let i = 1; i <= testData.dbTestCount; i++) {
      res.push(await v_db.newDB( testData.db.name + "__" + i, testData.db.pass));
    }
    return true;
  } catch (error) {
    return false;
  }
};

rmTestBases = async () => {
  try {
    const res = [ await v_db.delDB(testData.db.name)];

    for (let i = 1; i <= testData.dbTestCount; i++) {
      res.push( await v_db.delDB(testData.db.name + "__" + i));
    }
    return true;
  } catch (error) {
    return false;
  }
};

testIt = async () => {

  console.log(`DB TEST COUNT : ${testData.dbTestCount}`);

  console.time('GENERATE');
  await mkTestBases();
  console.timeEnd('GENERATE');

  console.time('REMOVE');
  await rmTestBases();
  console.timeEnd('REMOVE');

};

testIt();

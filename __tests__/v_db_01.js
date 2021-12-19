const v_database = require("../index");

const {config} = require("../src/config");


const v_fs = require("v_file_system");
const testData = require("../_tData_");



test("🔘 Check config dir", async () => {
  expect(await v_database.check_config_dir()).toEqual(true);
});

test("🔘 Check config file", async () => {
  expect(await v_database.check_config_file()).toEqual(true);
});





preTest = async () => {
  var checkRes = await v_fs.isDir(config.data_dir);
  //console.log(`Test Dir Status : ${checkRes}`);
  if (!checkRes) checkRes = await v_fs.mkdir(config.data_dir);
  const res = [];

  const typesCount = testData._types.length;

  for (let i = 0; i <= typesCount; i++) {
    res.push(await v_database.type.new(testData._types[i]));
  }
  return checkRes;
};


if (!v_fs.isDirSy(config.data_dir)) v_fs.mkdirSy(config.data_dir);


testData._types.forEach((type) => {
  test(`⚡ Adding Types :`, async () => {
    expect(await v_database.type.new(type)).toBe(true);
  });
});

test("🚩 ERROR Handle for Empty Value Creation as new type.", async () => {
  expect(await v_database.type.new()).toEqual(false);
});


testData._types.forEach((type) => {
  test(`🔄 Type Exists : [ ${type} ]`, async () => {
    expect((await v_database.type.view(type)).length).toBe(0);
  });
});

test("🧱 VALIDATE TYPES : [ Comparing Types found with types from testData._types ]", async () => {
  expect(await v_database.type.view()).toEqual(expect.arrayContaining(testData._types));
});


testData._types.forEach(async (type) => {
  test(`📍 [OK]: Delete Type by Name : <[ ${type} ]>`, async () => {
    expect(await v_database.type.del(type)).toBe(true);
  });
});

test("💥 [ERROR]: Remove Type [empty_value].", async () => {
  expect(await v_database.type.del()).toEqual(false);
});

test("🔥 [0]: After Removing Types.", async () => {
  expect((await v_database.type.view()).length).toEqual(0);
});

test("📂 Creating Tables", async () => {
  expect(await preTest()).toEqual(true);
});

test("🩺 After Created Tables", async () => {
  const resTest = await v_database.type.view();
  expect(testData._types).toEqual(expect.arrayContaining(resTest));
});

for (let i = 0; i < testData.items_count; i++) {
  const itemNumber = i % testData._types.length;
  const typeNum = Math.trunc(itemNumber);
  const helpType = testData._types[typeNum];

  test(`📑 Creating ITEMS [ ${helpType} , ${testData}} ]`, async () => {
      const res = await v_database.item.new(helpType, testData);
      expect(res).toEqual(true);
  });
}

test("🙋‍♂️ CHECKING UP THOSE ITEMS", async () => {
  const resTest = await v_database.item.view("users");
  const usersList = await v_fs.listDir(
    config.data_dir + "/" + "users"
  );
  expect(resTest.length).toEqual(usersList.length);
});

test("🔂 Data size", async () => {
  expect(await v_database.data_size()).toEqual(testData.items_count);
});


var demo_user_return_value = {"_content": {"testData": {"calls_made": 0, "cts": 0, "key": 1234567890, "origin": "www.google.com", "owner_id": 1234567890}}, "_types": ["encryption_keys", "system_api_keys", "system_log", "system_settings", "authors", "users", "user_api_keys", "devices", "user_devices", "pages", "posts", "posts_categories", "forum_threads", "forum_tags", "forum_categories", "forum_posts", "links", "images", "tasks", "workplaces", "notes", "snippets", "categories", "tags", "chat_groups", "chat_messages", "chat_assets", "companies", "support_questions", "support_categories", "ip_blacklist", "ip_whitelist", "reserved_words", "aes_keys"], "items_count": 5000};
test("📡 Viewing every 10th user", async () => {
  const users = await v_database.item.view("users");
  for (let i = 0; i < users.length; i++) {
    if (i % 10 === 0) {
      //console.log(users[i]);
      var res = await v_database.item.view('users', users[i]);
      demo_user_return_value._content.testData.cts = res._content.testData.cts;
      expect(res).toEqual(demo_user_return_value);
    }
  }
});

test("📃 Viewing every 10th user [object filter]", async () => {
  const users = await v_database.item.view("users");
  for (let i = 0; i < users.length; i++) {
    if (i % 10 === 0) {
      var res = await v_database.item.view('users', {id : users[i]});
      demo_user_return_value._content.testData.cts = res._content.testData.cts;
      expect(res).toEqual(demo_user_return_value);
    }
  }
});



test("💥 Deleting every 3rd user", async () => {
  const users = await v_database.item.view("users");
  for (let i = 0; i < users.length; i++) {
    if (i % 3 === 0) {
      //console.log(users[i]);
      expect(await v_database.item.del('users', users[i])).toEqual(true);
    }
  }
});



test("🔥 Del [empty]", async () => {
  expect(await v_database.item.del()).toEqual(false);
});

test("💥 Deleting every 3rd user [repeat for filtering] ", async () => {
  const users = await v_database.item.view("users");
  for (let i = 0; i < users.length; i++) {
    if (i % 3 === 0) {
      //console.log(users[i]);
      expect(await v_database.item.del('users', {id : users[i]})).toEqual(true);
    }
  }
});

test("🔥 System Data Purge", async () => {
  expect(await v_database.purge_database()).toEqual(true);
});

test("🔘 Data size After Format", async () => {
  expect(await v_database.data_size()).toEqual(0);
  v_fs.removeDirSy(config.data_dir, { recursive: true });
});

test("🔘 Check config dir", async () => {
  expect(await v_database.check_config_dir()).toEqual(true);
});

test("🔘 Check config file", async () => {
  expect(await v_database.check_config_file()).toEqual(true);
});

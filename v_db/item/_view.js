const v_fs = require('v_file_system');
const path = require('path');

const read = {
  list: async (typePath) => {
    return await v_fs.listDir(typePath);
  },
  byId: async (typePath, id) => {
    return JSON.parse(await v_fs.read(typePath + '/' + id + ".json"));
  }
};

module.exports = async (type, filter = undefined) => {
  const typePath = path.join(process.v.data_dir, type);

  //? List type dir if no filter provided
  if (filter === undefined) {
    var res = await read.list(typePath);
    var res_list = [];
    res.forEach(item => {
      res_list.push(item.replace(".json", ""));
    });
    return res_list;
  }
  //!- - - - - 

  //? Find by ID if filter is string
  if (typeof filter === 'string') {
    return await read.byId(typePath, filter);
  }
  //!- - - - - 

  //? Filter by id if id is defined in an object
  if (filter.id !== undefined) {
    return await read.byId(typePath, filter.id);
  }
  //!- - - - - 
};
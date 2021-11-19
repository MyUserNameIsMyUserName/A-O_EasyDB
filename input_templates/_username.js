const _config = {
  min: 6,
  max: 32,
  format: /^[A-Za-z][A-Za-z0-9_.]{(min-1),(max-1)}$/
};

const errorMsg = {
  chars: { type: "ERROR", message: "🙋‍♂️ Username can only have letters, numbers, underscore and dot." },
  min: { type: "ERROR", message: "🤯 Username minimum length is [ " + _config.min + " ]" },
  max: { type: "ERROR", message: "💥 Username maximum length is [ " + _config.max + " ]" },
};

module.exports = (username) => {
  var errorList = [];
  if (username.length < _config.min) errorList.push( errorMsg.min );
  if (username.length > _config.max)  errorList.push( errorMsg.max );
  if (_config.format.test(username) === true) errorList.push( errorMsg.chars );

  if (errorList.length === 0) return true;
  return errorList;
};

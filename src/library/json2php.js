const json2php = function(item, compact = false, nestingLevel = 0) {
  const comma = function() {
    return compact ? "," : ", ";
  };
  const whitespace = function(level) {
    return compact ? "" : "\t".repeat(level);
  };
  const newLine = function() {
    return compact ? "" : "\n";
  };
  let result;
  switch (Object.prototype.toString.call(item)) {
    case "[object Null]":
      result = "null";
      break;
    case "[object String]":
      result = '"' + item + '"';
      break;
    case "[object Number]":
      result = item.toString();
      break;
    case "[object Array]":
    case "[object Object]":
      result = [];
      for (let i in item) {
        // add the key if we're iterating over an object
        if (item.hasOwnProperty(i)) {
          result.push(
            whitespace(nestingLevel + 1) +
              '"' +
              i +
              '" => ' +
              json2php(item[i], compact, nestingLevel + 1)
          );
        } else {
          result.push(
            whitespace(nestingLevel + 1) +
              json2php(item[i], compact, nestingLevel + 1)
          );
        }
      }
      result =
        "[" +
        newLine() +
        result.join(comma() + newLine()) +
        newLine() +
        whitespace(nestingLevel) +
        "]";
      break;
  }
  return result;
};

export default json2php;

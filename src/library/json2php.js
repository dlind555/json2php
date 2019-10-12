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
  const wrapObjectOrArray = function(items) {
    return (
      "[" +
      newLine() +
      items.join(comma() + newLine()) +
      newLine() +
      whitespace(nestingLevel) +
      "]"
    );
  };
  let result;
  switch (Object.prototype.toString.call(item)) {
    case "[object Null]":
      result = "null";
      break;
    case "[object Boolean]":
      result = item.toString();
      break;
    case "[object String]":
      result = '"' + item + '"';
      break;
    case "[object Number]":
      result = item.toString();
      break;
    case "[object Array]":
      result = [];
      for (let i in item) {
        result.push(
          whitespace(nestingLevel + 1) +
            json2php(item[i], compact, nestingLevel + 1)
        );
      }
      result = wrapObjectOrArray(result);
      break;
    case "[object Object]":
      result = [];
      for (let i in item) {
        if (item.hasOwnProperty(i)) {
          result.push(
            whitespace(nestingLevel + 1) +
              '"' +
              i +
              '" => ' +
              json2php(item[i], compact, nestingLevel + 1)
          );
        }
      }
      result = wrapObjectOrArray(result);
      break;
  }
  return result;
};

export default json2php;

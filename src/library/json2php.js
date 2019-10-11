const json2php = function(item) {
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
      result = "[" + item.map(json2php).join(",") + "]";
      break;
    case "[object Object]":
      result = [];
      for (let i in item) {
        if (item.hasOwnProperty(i)) {
          result.push(json2php(i) + " => " + json2php(item[i]));
        }
      }
      result = "[" + result.join(",") + "]";
      break;
  }
  return result;
};

export default json2php;

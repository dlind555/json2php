import phpParser from "php-parser";

const php2json = function(content, compact = false, alignValues = false) {
  const comma = function() {
    return compact ? ", " : ",";
  };
  const whitespace = function(level) {
    return compact ? "" : "\t".repeat(level);
  };
  const newLine = function() {
    return compact ? "" : "\n";
  };
  const wrapObjectOrArray = function(items, isObject, nestingLevel) {
    let left = isObject ? "{" : "[";
    let right = isObject ? "}" : "]";
    return items.length > 0
      ? left +
          newLine() +
          items.join(comma() + newLine()) +
          newLine() +
          whitespace(nestingLevel) +
          right
      : left + right;
  };
  const escapeString = function(string) {
    /*eslint-disable no-control-regex*/
    return string
      .replace(/"/g, '\\"')
      .replace(/\f/g, "\\f")
      .replace(/\r/g, "\\r")
      .replace(/\n/g, "\\n")
      .replace(/\t/g, "\\t");
  };
  const getItemType = function(item) {
    if (item.kind === "array") {
      for (let i in item.items) {
        if (item.items[i].kind === "entry") {
          return "associative_array";
        }
      }
      return "indexed_array";
    }
    return item.kind;
  };
  const calculateArrayPadding = function(items) {
    if (compact || !alignValues) {
      return 0;
    }
    let maxLength = 0;
    for (let i in items) {
      maxLength = Math.max(maxLength, items[i][0].length);
    }
    return maxLength;
  };
  const convertExpression = function(item, compact, nestingLevel = 0) {
    let result;
    let numericKey = 0;
    let key = "";
    let value = null;
    let arrayPadding = 0;
    switch (getItemType(item)) {
      case "identifier":
        if (item.name.name === "null") {
          result = "null";
        } else {
          throw new TypeError(
            "Invalid PHP Array identifier value: " + item.name.name
          );
        }
        break;
      case "boolean":
        result = item.value.toString();
        break;
      case "string":
        result = '"' + escapeString(item.value) + '"';
        break;
      // handle the numbers which start with a plus/minus sign
      case "unary":
        result =
          (item.type === "-" ? "-" : "") + convertExpression(item.what, true);
        break;
      case "number":
        if (!/^-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?$/.test(item.value)) {
          throw new TypeError("Invalid number: " + item.value);
        }
        result = parseFloat(item.value).toString();
        break;
      case "indexed_array":
        result = [];
        for (let i in item.items) {
          result.push(
            whitespace(nestingLevel + 1) +
              convertExpression(item.items[i], compact, nestingLevel + 1)
          );
        }
        result = wrapObjectOrArray(result, false, nestingLevel);
        break;
      case "associative_array":
        result = [];
        for (let i in item.items) {
          if (item.items[i].kind === "entry") {
            key = item.items[i].key.value;
            // don't cast keys to strings/numbers and simply throw an error for unsupported key types
            if (!["string", "number"].includes(item.items[i].key.kind)) {
              throw new TypeError(
                "Invalid PHP Array key type: " + item.items[i].key.kind
              );
            }
            value = item.items[i].value;
          } else {
            key = numericKey.toString();
            numericKey++;
            value = item.items[i];
          }
          result.push([key, value]);
        }
        arrayPadding = calculateArrayPadding(result);
        for (let i in result) {
          result[i] =
            whitespace(nestingLevel + 1) +
            '"' +
            (escapeString(result[i][0]) + '"').padEnd(arrayPadding + 2) +
            ": " +
            convertExpression(result[i][1], compact, nestingLevel + 1);
        }
        result = wrapObjectOrArray(result, true, nestingLevel);
        break;
      default:
        throw new TypeError("Unsupported PHP Array value type: " + item.kind);
    }
    return result;
  };

  let ast = phpParser.parseEval(content);
  if (
    !(
      ast.children &&
      ast.children.length == 1 &&
      ast.children[0].kind == "expressionstatement" &&
      ast.children[0].expression.kind == "array"
    )
  ) {
    throw new TypeError("Not a valid PHP Array");
  }
  return convertExpression(ast.children[0].expression, compact, 0);
};

export default php2json;

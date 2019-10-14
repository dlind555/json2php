import json2php from "@/library/json2php";
import jsonParseOrdered from "@/library/jsonParseOrdered";

describe("JsonToPhp", () => {
  it("Converts simple values", () => {
    let input = "true";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "false";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "null";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);
  });

  it("Converts numbers", () => {
    let input = "-5";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "1000";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "3.1415926";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "123456789e+20";
    expect(json2php(jsonParseOrdered(input), true)).toBe("1.23456789e+28");

    input = "0.000000005E-20";
    expect(json2php(jsonParseOrdered(input), true)).toBe("5e-29");

    input = "1.7976931348623157e+308";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "5e-324";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "9007199254740991";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = "-9007199254740991";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);
  });

  it("Converts strings", () => {
    let input = '"Hello"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"Glückwunsch"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"-9223372036854775808/-1"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"123456789012345678901234567890123456789"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '",./;\'[]-="';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"\\"\\b\\f\\r\\n\\t\\\\"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"!@#$%^&*()`~"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"Ω≈ç√∫˜µ≤≥÷"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"田中さんにあげて下さい"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"😍"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);

    input = '"הָיְתָהtestالصفحات التّحول"';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);
  });

  it("Converts empty array in compact mode", () => {
    let input = "[]";
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);
  });

  it("Converts empty object in compact mode", () => {
    let input = "{}";
    expect(json2php(jsonParseOrdered(input), true)).toBe("[]");
  });

  it("Converts simple array in compact mode", () => {
    let input = '[1,"test",false,true,null]';
    expect(json2php(jsonParseOrdered(input), true)).toBe(input);
  });

  it("Converts an array with nested object in compact mode", () => {
    let input = '[1,null,{"nested":"value"}]';
    expect(json2php(jsonParseOrdered(input), true)).toBe(
      '[1,null,["nested" => "value"]]'
    );
  });

  it("Converts simple object in compact mode", () => {
    let input = '{"a":1,"b":"test","c":false,"d":true,"e":null}';
    expect(json2php(jsonParseOrdered(input), true)).toBe(
      '["a" => 1,"b" => "test","c" => false,"d" => true,"e" => null]'
    );
  });

  it("Converts an object with nested array in compact mode", () => {
    let input = '{"a":1,"b":[1,2]}';
    expect(json2php(jsonParseOrdered(input), true)).toBe(
      '["a" => 1,"b" => [1,2]]'
    );
  });

  it("Converts an array with multiple nesting levels in compact mode", () => {
    let input = '[{"one":{"two":{"three":{"four":"five"}}}}]';
    expect(json2php(jsonParseOrdered(input), true)).toBe(
      '[["one" => ["two" => ["three" => ["four" => "five"]]]]]'
    );
  });

  it("Converts empty array", () => {
    let input = "[]";
    expect(json2php(jsonParseOrdered(input))).toBe("[]");
  });

  it("Converts empty object", () => {
    let input = "{}";
    expect(json2php(jsonParseOrdered(input))).toBe("[]");
  });

  it("Converts simple array", () => {
    let input = '[1,"test",false,true,null]';
    expect(json2php(jsonParseOrdered(input))).toBe(
      '[\n\t1, \n\t"test", \n\tfalse, \n\ttrue, \n\tnull\n]'
    );
  });

  it("Converts simple object", () => {
    let input = '{"a":1,"b":"test","c":false,"d":true,"e":null}';
    expect(json2php(jsonParseOrdered(input))).toBe(
      '[\n\t"a" => 1, \n\t"b" => "test", \n\t"c" => false, \n\t"d" => true, \n\t"e" => null\n]'
    );
  });

  it("Converts an array with multiple nesting levels", () => {
    let input = '[{"one":{"two":{"three":{"four":"five"}}}}]';
    expect(json2php(jsonParseOrdered(input))).toBe(
      '[\n\t[\n\t\t"one" => [\n\t\t\t"two" => [\n\t\t\t\t"three" => ' +
        '[\n\t\t\t\t\t"four" => "five"\n\t\t\t\t]\n\t\t\t]\n\t\t]\n\t]\n]'
    );
  });

  it("Doesn't preserve the object elements order when using the standard JSON.parse function", () => {
    let input = '{"5":"1", "4":"2", "2":"3", "1":"4", "3":"5"}';
    expect(json2php(JSON.parse(input), true)).toBe(
      '["1" => "4","2" => "3","3" => "5","4" => "2","5" => "1"]'
    );
  });

  it("Preserves the object elements order when using jsonParseOrdered function", () => {
    let input = '{"5":"1", "4":"2", "2":"3", "1":"4", "3":"5"}';
    expect(json2php(jsonParseOrdered(input), true)).toBe(
      '["5" => "1","4" => "2","2" => "3","1" => "4","3" => "5"]'
    );
  });
});

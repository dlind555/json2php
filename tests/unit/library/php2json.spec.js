import php2json from "@/library/php2json";

describe("PhpToJson", () => {
  it("Converts arrays with simple values", () => {
    let input = "[true,false,null]";
    expect(php2json(input, true)).toBe(input);
  });

  it("Converts arrays with numbers", () => {
    let input = "[-5,1000,3.1415926,123456789e+20,0.000000005E-20,+6]";
    let expected = "[-5,1000,3.1415926,1.23456789e+28,5e-29,6]";
    expect(php2json(input, true)).toBe(expected);
    input =
      "[1.7976931348623157e+308,5e-324,9007199254740991,-9007199254740991]";
    expect(php2json(input, true)).toBe(input);
  });

  it("Converts arrays with strings", () => {
    let input =
      '["Hello","Glückwunsch","-9223372036854775808/-1","123456789012345678901234567890123456789"]';
    expect(php2json(input, true)).toBe(input);
    input = '[",./;\'[]-=","!@#$%^&*()`~","\\"\\b\\f\\r\\n\\t"]';
    expect(php2json(input, true)).toBe(input);
    input =
      '["Ω≈ç√∫˜µ≤≥÷","田中さんにあげて下さい","😍","הָיְתָהtestالصفحات التّحول"]';
    expect(php2json(input, true)).toBe(input);
  });

  it("Converts empty array in compact mode", () => {
    let input = "[]";
    expect(php2json(input, true)).toBe(input);
  });

  it("Converts simple array in compact mode", () => {
    let input = '[1,"test",false,true,null]';
    expect(php2json(input, true)).toBe(input);
  });

  it("Converts an array with nested array in compact mode", () => {
    let input = '[1, null, [ "nested" => "value" ] ]';
    expect(php2json(input, true)).toBe('[1,null,{"nested": "value"}]');
  });

  it("Converts an associative array in compact mode", () => {
    let input = '["a"=>1,"test","c"=>false,true,"e"=>null]';
    expect(php2json(input, true)).toBe(
      '{"a": 1,"0": "test","c": false,"1": true,"e": null}'
    );
  });

  it("Converts an associative array with nested array in compact mode", () => {
    let input = '["a"=>1,"b"=>[1,2]]';
    expect(php2json(input, true)).toBe('{"a": 1,"b": [1,2]}');
  });

  it("Converts an array with multiple nesting levels in compact mode", () => {
    let input = '[["one"=>["two"=>["three"=>["four"=>"five"]]]]]';
    expect(php2json(input, true)).toBe(
      '[{"one": {"two": {"three": {"four": "five"}}}}]'
    );
  });

  it("Converts empty array", () => {
    let input = "[]";
    expect(php2json(input)).toBe("[]");
  });

  it("Converts simple array", () => {
    let input = '[1,"test",false,true,null]';
    expect(php2json(input)).toBe(
      '[\n\t1, \n\t"test", \n\tfalse, \n\ttrue, \n\tnull\n]'
    );
  });

  it("Converts an associative array", () => {
    let input = '["a"=>1,"test","c"=>false,true,"e"=>null]';
    expect(php2json(input)).toBe(
      '{\n\t"a": 1, \n\t"0": "test", \n\t"c": false, \n\t"1": true, \n\t"e": null\n}'
    );
  });

  it("Converts an array with multiple nesting levels", () => {
    let input = '[["one"=>["two"=>["three"=>["four"=>"five"]]]]]';
    expect(php2json(input)).toBe(
      '[\n\t{\n\t\t"one": {\n\t\t\t"two": {\n\t\t\t\t"three": ' +
        '{\n\t\t\t\t\t"four": "five"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n]'
    );
  });

  it("Preserves the associative array elements order", () => {
    let input = '["5"=>"1", "4"=>"2", "2"=>"3", "1"=>"4", "3"=>"5"]';
    expect(php2json(input, true)).toBe(
      '{"5": "1","4": "2","2": "3","1": "4","3": "5"}'
    );
  });

  it("Throws an error on unsupported keys/values", () => {
    expect(() => {
      php2json("[aClass]");
    }).toThrow(TypeError);

    expect(() => {
      php2json("[0123]");
    }).toThrow(TypeError);

    expect(() => {
      php2json("[0x15]");
    }).toThrow(TypeError);

    expect(() => {
      php2json("[0b100]");
    }).toThrow(TypeError);

    expect(() => {
      php2json('[null=>"test"]');
    }).toThrow(TypeError);

    expect(() => {
      php2json("[function() {}]");
    }).toThrow(TypeError);
  });
});

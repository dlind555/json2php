import jsonParseOrdered from "@/library/jsonParseOrdered";

describe("jsonParseOrdered", () => {
  it("Skips whitespace tokens", () => {
    expect(jsonParseOrdered("\t\r\n 1")).toBe(1);
  });

  it("Decodes unicode characters", () => {
    expect(jsonParseOrdered('"\\u2188"')).toBe("ↈ");
    expect(() => {
      jsonParseOrdered('"\\u2X88"');
    }).toThrow(SyntaxError);
  });

  it("Handles unterminated strings", () => {
    expect(() => {
      jsonParseOrdered('"""');
    }).toThrow(SyntaxError);
  });

  it("Handles invalid numbers", () => {
    expect(() => {
      jsonParseOrdered("0123");
    }).toThrow(SyntaxError);

    expect(() => {
      jsonParseOrdered("1234.");
    }).toThrow(SyntaxError);

    expect(() => {
      jsonParseOrdered("1eb");
    }).toThrow(SyntaxError);

    expect(() => {
      jsonParseOrdered("-m");
    }).toThrow(SyntaxError);
  });
});

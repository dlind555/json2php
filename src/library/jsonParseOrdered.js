/*

Copyright (c) 2012-2015 Kit Cambridge.
http://kitcambridge.be/

Copyright (c) 2013-2015 Benjamin Tan.
https://d10.github.io/

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const jsonParseOrdered = function(text) {
  /*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */

  // Public: Parses a JSON source string.
  var fromCharCode = String.fromCharCode;

  // Internal: A map of escaped control characters and their unescaped
  // equivalents.
  var Unescapes = {
    92: "\\",
    34: '"',
    47: "/",
    98: "\b",
    116: "\t",
    110: "\n",
    102: "\f",
    114: "\r"
  };

  // Internal: Stores the parser state.
  var Index, Source;

  // Internal: Resets the parser state and throws a `SyntaxError`.
  var abort = function() {
    Index = Source = null;
    throw SyntaxError();
  };

  // Internal: Returns the next token, or `"$"` if the parser has reached
  // the end of the source string. A token may be a string, number, `null`
  // literal, or Boolean literal.
  var lex = function() {
    var source = Source,
      length = source.length,
      value,
      begin,
      position,
      isSigned,
      charCode;
    while (Index < length) {
      charCode = source.charCodeAt(Index);
      switch (charCode) {
        case 9:
        case 10:
        case 13:
        case 32:
          // Skip whitespace tokens, including tabs, carriage returns, line
          // feeds, and space characters.
          Index++;
          break;
        case 123:
        case 125:
        case 91:
        case 93:
        case 58:
        case 44:
          // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
          // the current position.
          value = source[Index];
          Index++;
          return value;
        case 34:
          // `"` delimits a JSON string; advance to the next character and
          // begin parsing the string. String tokens are prefixed with the
          // sentinel `@` character to distinguish them from punctuators and
          // end-of-string tokens.
          for (value = "@", Index++; Index < length; ) {
            charCode = source.charCodeAt(Index);
            if (charCode < 32) {
              // Unescaped ASCII control characters (those with a code unit
              // less than the space character) are not permitted.
              abort();
            } else if (charCode == 92) {
              // A reverse solidus (`\`) marks the beginning of an escaped
              // control character (including `"`, `\`, and `/`) or Unicode
              // escape sequence.
              charCode = source.charCodeAt(++Index);
              switch (charCode) {
                case 92:
                case 34:
                case 47:
                case 98:
                case 116:
                case 110:
                case 102:
                case 114:
                  // Revive escaped control characters.
                  value += Unescapes[charCode];
                  Index++;
                  break;
                case 117:
                  // `\u` marks the beginning of a Unicode escape sequence.
                  // Advance to the first character and validate the
                  // four-digit code point.
                  begin = ++Index;
                  for (position = Index + 4; Index < position; Index++) {
                    charCode = source.charCodeAt(Index);
                    // A valid sequence comprises four hexdigits (case-
                    // insensitive) that form a single hexadecimal value.
                    if (
                      !(
                        (charCode >= 48 && charCode <= 57) ||
                        (charCode >= 97 && charCode <= 102) ||
                        (charCode >= 65 && charCode <= 70)
                      )
                    ) {
                      // Invalid Unicode escape sequence.
                      abort();
                    }
                  }
                  // Revive the escaped character.
                  value += fromCharCode("0x" + source.slice(begin, Index));
                  break;
                default:
                  // Invalid escape sequence.
                  abort();
              }
            } else {
              if (charCode == 34) {
                // An unescaped double-quote character marks the end of the
                // string.
                break;
              }
              charCode = source.charCodeAt(Index);
              begin = Index;
              // Optimize for the common case where a string is valid.
              while (charCode >= 32 && charCode != 92 && charCode != 34) {
                charCode = source.charCodeAt(++Index);
              }
              // Append the string as-is.
              value += source.slice(begin, Index);
            }
          }
          if (source.charCodeAt(Index) == 34) {
            // Advance to the next character and return the revived string.
            Index++;
            return value;
          }
          // Unterminated string.
          abort();
        // eslint-disable-next-line
        default:
          // Parse numbers and literals.
          begin = Index;
          // Advance past the negative sign, if one is specified.
          if (charCode == 45) {
            isSigned = true;
            charCode = source.charCodeAt(++Index);
          }
          // Parse an integer or floating-point value.
          if (charCode >= 48 && charCode <= 57) {
            // Leading zeroes are interpreted as octal literals.
            if (
              charCode == 48 &&
              ((charCode = source.charCodeAt(Index + 1)),
              charCode >= 48 && charCode <= 57)
            ) {
              // Illegal octal literal.
              abort();
            }
            isSigned = false;
            // Parse the integer component.
            for (
              ;
              Index < length &&
              ((charCode = source.charCodeAt(Index)),
              charCode >= 48 && charCode <= 57);
              Index++
            );
            // Floats cannot contain a leading decimal point; however, this
            // case is already accounted for by the parser.
            if (source.charCodeAt(Index) == 46) {
              position = ++Index;
              // Parse the decimal component.
              for (; position < length; position++) {
                charCode = source.charCodeAt(position);
                if (charCode < 48 || charCode > 57) {
                  break;
                }
              }
              if (position == Index) {
                // Illegal trailing decimal.
                abort();
              }
              Index = position;
            }
            // Parse exponents. The `e` denoting the exponent is
            // case-insensitive.
            charCode = source.charCodeAt(Index);
            if (charCode == 101 || charCode == 69) {
              charCode = source.charCodeAt(++Index);
              // Skip past the sign following the exponent, if one is
              // specified.
              if (charCode == 43 || charCode == 45) {
                Index++;
              }
              // Parse the exponential component.
              for (position = Index; position < length; position++) {
                charCode = source.charCodeAt(position);
                if (charCode < 48 || charCode > 57) {
                  break;
                }
              }
              if (position == Index) {
                // Illegal empty exponent.
                abort();
              }
              Index = position;
            }
            // Coerce the parsed value to a JavaScript number.
            return +source.slice(begin, Index);
          }
          // A negative sign may only precede numbers.
          if (isSigned) {
            abort();
          }
          // `true`, `false`, and `null` literals.
          var temp = source.slice(Index, Index + 4);
          if (temp == "true") {
            Index += 4;
            return true;
          } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
            Index += 5;
            return false;
          } else if (temp == "null") {
            Index += 4;
            return null;
          }
          // Unrecognized token.
          abort();
      }
    }
    // Return the sentinel `$` character if the parser has reached the end
    // of the source string.
    return "$";
  };

  // Internal: Parses a JSON `value` token.
  var get = function(value) {
    var results, hasMembers;
    if (value == "$") {
      // Unexpected end of input.
      abort();
    }
    if (typeof value == "string") {
      if (value[0] == "@") {
        // Remove the sentinel `@` character.
        return value.slice(1);
      }
      // Parse object and array literals.
      if (value == "[") {
        // Parses a JSON array, returning a new JavaScript array.
        results = [];
        for (;;) {
          value = lex();
          // A closing square bracket marks the end of the array literal.
          if (value == "]") {
            break;
          }
          // If the array literal contains elements, the current token
          // should be a comma separating the previous element from the
          // next.
          if (hasMembers) {
            if (value == ",") {
              value = lex();
              if (value == "]") {
                // Unexpected trailing `,` in array literal.
                abort();
              }
            } else {
              // A `,` must separate each array element.
              abort();
            }
          } else {
            hasMembers = true;
          }
          // Elisions and leading commas are not permitted.
          if (value == ",") {
            abort();
          }
          results.push(get(value));
        }
        return results;
      } else if (value == "{") {
        // Parses a JSON object, returning a new JavaScript object.
        results = new Map();
        for (;;) {
          value = lex();
          // A closing curly brace marks the end of the object literal.
          if (value == "}") {
            break;
          }
          // If the object literal contains members, the current token
          // should be a comma separator.
          if (hasMembers) {
            if (value == ",") {
              value = lex();
              if (value == "}") {
                // Unexpected trailing `,` in object literal.
                abort();
              }
            } else {
              // A `,` must separate each object member.
              abort();
            }
          } else {
            hasMembers = true;
          }
          // Leading commas are not permitted, object property names must be
          // double-quoted strings, and a `:` must separate each property
          // name and value.
          if (
            value == "," ||
            typeof value != "string" ||
            value[0] != "@" ||
            lex() != ":"
          ) {
            abort();
          }
          results.set(value.slice(1), get(lex()));
        }
        return results;
      }
      // Unexpected token encountered.
      abort();
    }
    return value;
  };

  var result;
  Index = 0;
  Source = "" + text;
  result = get(lex());
  // If a JSON string contains multiple tokens, it is invalid.
  if (lex() != "$") {
    abort();
  }
  // Reset the parser state.
  Index = Source = null;
  return result;
};

export default jsonParseOrdered;

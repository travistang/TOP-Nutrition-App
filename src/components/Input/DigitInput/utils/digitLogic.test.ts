import { InputMode, numberToString, stringToNumber } from "./digitLogic";

describe("useDigitLogic", () => {
  describe("numberToString", () => {
    it("should return 0 as string for 0", () => {
      expect(numberToString(0, InputMode.Decimal)).toEqual("0");
    });

    it("should remove decimal after 3 digits", () => {
      expect(numberToString(56.789, InputMode.Decimal)).toEqual("5678");
    });
  });

  describe("stringToNumber", () => {
    it("should parse empty string to 0", () => {
      expect(stringToNumber("", InputMode.Decimal)).toEqual(0);
    });
    it("should parse decimal string correctly", () => {
      expect(stringToNumber("6789", InputMode.Decimal)).toEqual(67.89);
    });

    it("should ignore trailing 0", () => {
      expect(stringToNumber("67890", InputMode.Decimal)).toEqual(678.9);
    });
    it("should parse integer string correctly", () => {
      expect(stringToNumber("6789", InputMode.Integer)).toEqual(6789);
    });
  });
});

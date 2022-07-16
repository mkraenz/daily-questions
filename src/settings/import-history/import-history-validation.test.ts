import { validateImportedHistoryString } from "./import-history-validation";

it("returns true for an empty array string", () => {
  const result = validateImportedHistoryString('{"history":[]}');
  expect(result).toBe(true);
});

it("returns true for a good history string", () => {
  const result = validateImportedHistoryString(
    '{"history":[{"date":"2022-07-06","qs":[{"id":"a5e36d31","a":9},{"id":"063c6ce1","a":3},{"id":"aa73eb84","a":1},{"id":"e881e50e","a":3},{"id":"ec57f75e","a":3},{"id":"b1667166","a":5},{"id":"c5c844e6","a":5},{"id":"b875a18e","a":"test1"},{"id":"c706f049","a":"test2"}]}]}'
  );
  expect(result).toBe(true);
});

it("returns false for a history string with invalid answer value type", () => {
  const result = validateImportedHistoryString(
    '{"history":[{"date":"2022-07-06","qs":[{"id":"a5e36d31","a":null}]}]}'
  );
  expect(result).toBe(false);
});

it("returns false for a history string with non-integer answer value", () => {
  const result = validateImportedHistoryString(
    '{"history":[{"date":"2022-07-06","qs":[{"id":"a5e36d31","a":5.5}]}]}'
  );
  expect(result).toBe(false);
});

it("returns false for a history string with integer answer value below 1", () => {
  const result = validateImportedHistoryString(
    '{"history":[{"date":"2022-07-06","qs":[{"id":"a5e36d31","a":0}]}]}'
  );
  expect(result).toBe(false);
});
7;

it("returns false for a history string with integer answer value above 10", () => {
  const result = validateImportedHistoryString(
    '{"history":[{"date":"2022-07-06","qs":[{"id":"a5e36d31","a":11}]}]}'
  );
  expect(result).toBe(false);
});

it("returns false for an empty string", () => {
  const result = validateImportedHistoryString("");
  expect(result).toBe(false);
});

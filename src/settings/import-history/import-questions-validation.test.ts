import { validateImportedQuestionsString } from "./import-questions-validation";

it("returns false for an empty array string", () => {
  const result = validateImportedQuestionsString('{"questions":[]}');
  expect(result).toBe(false);
});

it("returns true for a good questions string", () => {
  const result = validateImportedQuestionsString(
    '{"questions":[{"title":"Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"points","active":true},{"title":"Progress","questionLong":"Did I do my best to make progress towards my goals today?","type":"points","id":"063c6ce1","active":true},{"title":"Meaning","questionLong":"Did I do my best to find meaning in what I am doing today?","type":"points","id":"aa73eb84","active":true},{"title":"Highlight","id":"b875a18e","questionLong":"What was my personal highlight today and why?","type":"fulltext","active":true}]}'
  );
  expect(result).toBe(true);
});

it("returns true for a short questions string", () => {
  const result = validateImportedQuestionsString(
    '{"questions":[{"title":"Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"points","active":true}]}'
  );
  expect(result).toBe(true);
});

it("returns false for a questions string with invalid title type", () => {
  const invalid = 123;
  const result = validateImportedQuestionsString(
    `{"questions":[{"title":${invalid},"id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"points","active":true}]}`
  );
  expect(result).toBe(false);
});

it("returns false for a questions string with invalid id type", () => {
  const invalid = 123;
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":${invalid},"questionLong":"Did I do my best to set clear goals today?","type":"points","active":true}]}`
  );
  expect(result).toBe(false);
});

it("returns false for a questions string with invalid questionLong type", () => {
  const invalid = 123;
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":${invalid},"type":"points","active":true}]}`
  );
  expect(result).toBe(false);
});

it("returns true for an empty questionLong", () => {
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":"","type":"points","active":true}]}`
  );
  expect(result).toBe(true);
});

it("returns false for a questions string with invalid answer-type type", () => {
  const invalid = "not a type";
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"${invalid}","active":true}]}`
  );
  expect(result).toBe(false);
});

it("returns true for a questions string with 'points' answer-type type", () => {
  const type = "points";
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"${type}","active":true}]}`
  );
  expect(result).toBe(true);
});

it("returns true for a questions string with 'fulltext' answer-type type", () => {
  const type = "fulltext";
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"${type}","active":true}]}`
  );
  expect(result).toBe(true);
});

it("returns false for a questions string with invalid active type", () => {
  const invalid = 1;
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"a5e36d31","questionLong":"Did I do my best to set clear goals today?","type":"points","active":${invalid}}]}`
  );
  expect(result).toBe(false);
});

it("returns false for an empty string", () => {
  const result = validateImportedQuestionsString("");
  expect(result).toBe(false);
});

it("returns false for a questions string with non-unique ids", () => {
  const id = "nonunique";
  const result = validateImportedQuestionsString(
    `{"questions":[{"title": "Goals","id":"${id}","questionLong":"Did I do my best to set clear goals today?","type":"points","active":true},{"title":"Progress","questionLong":"Did I do my best to make progress towards my goals today?","type":"points","id":"${id}","active":true}]}`
  );
  expect(result).toBe(false);
});

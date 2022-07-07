import { inRange, isInteger, isNil, isPlainObject, negate } from "lodash";
import { HistoricEntry } from "../history/history.slice";

const isStringOrNumber = (x: unknown): x is string | number =>
  ["string", "number"].includes(typeof x);

const isAnsweredQuestion = (
  obj: unknown
): obj is HistoricEntry["qs"][number] => {
  if (isNil(obj)) return false;
  if (!isPlainObject(obj)) return false;
  const entry = obj as Partial<HistoricEntry["qs"][number]>;
  if (typeof entry.id !== "string") return false;
  // This must match the answer types we provide (currently, points or fulltext)
  if (!isStringOrNumber(entry.a)) return false;
  if (typeof entry.a === "number" && !inRange(entry.a, 1, 11)) return false;
  if (typeof entry.a === "number" && !isInteger(entry.a)) return false;
  return true;
};

const IsHistoricEntry = (obj: unknown): obj is HistoricEntry => {
  if (isNil(obj)) return false;
  if (!isPlainObject(obj)) return false;
  const entry = obj as Partial<HistoricEntry>;
  if (
    typeof entry.date !== "string" ||
    !entry.date.match(/^\d{4}-\d{2}-\d{2}$/)
  )
    return false;
  if (
    !entry.qs ||
    !Array.isArray(entry.qs) ||
    entry.qs.some(negate(isAnsweredQuestion))
  )
    return false;

  return true;
};

export const validateImportedHistoryString = (
  importedHistoryString: string
) => {
  try {
    const imported = JSON.parse(importedHistoryString);
    if (!Array.isArray(imported)) throw new Error("not an array");
    return imported.every((item) => IsHistoricEntry(item));
  } catch (error) {
    return false;
  }
};

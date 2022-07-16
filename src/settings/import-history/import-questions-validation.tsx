import { isEmpty, isPlainObject, uniqBy } from "lodash";
import { Question } from "../../questions/questions.slice";
import { ExportedHistoryAndQuestions } from "./ExportHistory";

const IsQuestion = (obj: unknown): obj is Question => {
  const validAnswerTypes: Question["type"][] = ["points", "fulltext"];

  if (!isPlainObject(obj) || isEmpty(obj)) return false;
  const o = obj as { [key in keyof Question]: unknown };
  if (typeof o.title !== "string" || o.title === "") return false;
  if (typeof o.id !== "string" || o.id === "") return false;
  if (typeof o.questionLong !== "string") return false;
  if (typeof o.type !== "string") return false;
  if (typeof o.active !== "boolean") return false;

  if (!(validAnswerTypes as string[]).includes(o.type)) return false;

  return true;
};

export const validateImportedQuestionsString = (importString: string) => {
  try {
    // desired type, but needs to be validated!
    const imported: Partial<ExportedHistoryAndQuestions> =
      JSON.parse(importString);
    if (!isPlainObject(imported)) throw new Error("Not a plain object");
    if (!imported.questions) throw new Error("No questions property found");
    if (!Array.isArray(imported.questions)) throw new Error("not an array");
    if (isEmpty(imported.questions)) throw new Error("empty array");
    if (!imported.questions.every(IsQuestion))
      throw new Error("not all questions are valid");
    const nonUniqueIdExists =
      uniqBy(imported.questions, "id").length !== imported.questions.length;
    if (nonUniqueIdExists) throw new Error("not all questions have unique ids");
    return true;
  } catch (error) {
    return false;
  }
};

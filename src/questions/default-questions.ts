export const defaultQuestions: {
  title:
    | "Goals"
    | "Progress"
    | "Meaning"
    | "Happiness"
    | "Social"
    | "Engagement"
    | "Highlight";
  id: string; // first 8 chars of a uuid v4
  questionLong: string;
  type: "points" | "fulltext";
  active: boolean;
}[] = [
  {
    title: "Goals",
    id: "a5e36d31",
    questionLong: "Did I do my best to set clear goals today?",
    type: "points",
    active: true,
  },
  {
    title: "Progress",
    id: "063c6ce1",
    questionLong: "Did I do my best to make progress towards my goals today?",
    type: "points",
    active: true,
  },
  {
    title: "Meaning",
    id: "aa73eb84",
    questionLong: "Did I do my best to find meaning in what I am doing today?",
    type: "points",
    active: true,
  },
  {
    title: "Happiness",
    id: "e881e50e",
    questionLong: "Did I do my best to be happy today?",
    type: "points",
    active: true,
  },
  {
    title: "Social",
    id: "ec57f75e",
    questionLong: "Did I do my best to build positive relationships today?",
    type: "points",
    active: true,
  },
  {
    title: "Engagement",
    id: "0f3223d5",
    questionLong: "Did I do my best to be fully engaged today?",
    type: "points",
    active: true,
  },
  {
    title: "Highlight",
    id: "b875a18e",
    questionLong: "What was my personal highlight today and why?",
    type: "fulltext",
    active: true,
  },
];

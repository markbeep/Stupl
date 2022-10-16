export type Category = {
  name: string;
  id: number;
};

/// UserSubjects in models.py
export type SubjectData = {
  id: number;
  name: string;
  credits: number;
  category: string;
  category_id: number;
  semester: number;
  year: number;
  grade: number;
  planned: boolean;
};

export type VVZSubject = {
  id: number;
  name: string;
  vvz_id: number;
  lesson_number: number;
  credits: number;
  category: string;
  category_id: number;
  semester: string;
  year: number;
};

export type SubjectDataGroupedByCategory = {
  category_id: number;
  subjects: SubjectData[];
};

export type SubjectDataGroupedBySemester = {
  semester: number;
  subjects: SubjectData[];
};

export type SubjectDataGroupedGeneric =
  | SubjectDataGroupedByCategory
  | SubjectDataGroupedBySemester;

export const categories = [
  {
    name: "Other",
    german_name: "Anderes",
    id: 0,
    information:
      "Courses usually done in first year They're split into two block exams. (All other courses have to be passed individually)",
    requirements: 2,
  },
  {
    name: "Basic Courses",
    german_name: "Grundlagenfächer",
    id: 1,
    information:
      "Courses usually done in second year. Requirements: All courses need to be taken, but only seven of eight have to be passed. If you don't pass all, you need to take an additional core subject instead.",
    requirements: 45,
  },
  {
    name: "Minor Courses",
    german_name: "Ergänzungsfächer",
    information:
      "In this category five credits can be done. Additional credits can count towards the Bacehlor.",
    id: 2,
    requirements: 5,
  },
  {
    name: "Core Courses",
    german_name: "Kernfächer",
    information:
      "Courses usually done in THIRD year. Requirements: At least four courses need to be taken. You can also take more.",
    id: 3,
    requirements: 32,
  },
  {
    name: "First Year Examinations",
    german_name: "Basisjahrfächer",
    information:
      "Courses usually done in first year They're split into two block exams. (All other courses have to be passed individually)",
    id: 4,
    requirements: 56,
  },
  {
    name: "Seminar",
    german_name: "Seminar",
    information:
      "In thsi course you will present a scientific paper for two credits.",
    id: 5,
    requirements: 2,
  },
  {
    name: "Electives",
    german_name: "Wahlfächer",
    information:
      "Computer Science courses which are not in any of the other categories. Requirements: None need to be taken, but you can take some of them instead of taking more Kernfächer or if you just see something interesting of course.",
    id: 6,
    requirements: 0,
  },
  {
    name: "Bachelor Thesis",
    german_name: "Bachelor Thesis",
    id: 7,
    information:
      "Thesis usually done at the end of your Bachelor studies. Requirements: At least five Grundlagenfächer need to be passed to start.",
    requirements: 10,
  },
  {
    name: "Science in Perspective",
    german_name: "GESS",
    id: 8,
    information:
      "These courses are often courses from other departments which can also be relevant for CS students. Some of them are bachelor's courses. Some of them are master's courses. You can also take other (master) courses that are not on the list but they need to be accepted by the study administration.",
    requirements: 6,
  },
];

export const getCategoryWithId = (id: number) =>
  categories.find((c) => c.id === id);

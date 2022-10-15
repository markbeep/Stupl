export type SubjectData = {
  name: string;
  ects: number;
  grade: number;
  semester: number;
  planned: boolean;
  id: number;
};

export type SubjectGroup = {
  name: string;
  data: SubjectData[];
  information: string;
};

export const subjectData: SubjectData[] = [
  {
    name: "Diskrete Mathematik",
    ects: 7,
    grade: 5.5,
    semester: 1,
    planned: true,
    id: 1,
  },
  {
    name: "Algorithmen und Datenstrukturen",
    ects: 7,
    grade: 5.25,
    semester: 2,
    planned: true,
    id: 1,
  },
  {
    name: "Algorithmen und Datenstrukturen",
    ects: 7,
    grade: 5.25,
    semester: 3,
    planned: true,
    id: 1,
  },
  {
    name: "Algorithmen und Datenstrukturen",
    ects: 7,
    grade: 5.25,
    semester: 1,
    planned: true,
    id: 1,
  },
];

export const subjectGroups: SubjectGroup[] = [
  {
    name: "Basisjahr",
    data: subjectData,
    information:
      "Courses usually done in first year They're split into two block exams. (All other courses have to be passed individually)",
  },
  {
    name: "Grundlagenfächer",
    data: subjectData,
    information:
      "Courses usually done in second year. Requirements: All courses need to be taken, but only seven of eight have to be passed. If you don't pass all, you need to take an additional core subject instead.",
  },
  {
    name: "Kernfächer",
    data: subjectData,
    information:
      "Courses usually done in second year. Requirements: At least four courses need to be taken. You can also take more.",
  },
  {
    name: "Gess",
    data: subjectData,
    information:
      "These courses are often courses from other departments which can also be relevant for CS students. Some of them are bachelor's courses. Some of them are master's courses. You can also take other (master) courses that are not on the list but they need to be accepted by the study administration.",
  },
  {
    name: "Wahlfächer",
    data: subjectData,
    information:
      "Computer Science courses which are not in any of the other categories. Requirements: None need to be taken, but you can take some of them instead of taking more Kernfächer or if you just see something interesting of course.",
  },
  {
    name: "Bachelor Thesis",
    data: subjectData,
    information:
      "Thesis usually done at the end of your Bachelor studies. Requirements: At least five Grundlagenfächer need to be passed to start.",
  },
];

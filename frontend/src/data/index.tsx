export type SubjectTableRowData = {
  name: string;
  ects: number;
  grade: number;
  semester: number;
  planned: boolean;
  id: number;
};

export type SubjectGroup = {
  name: string;
  data: SubjectTableRowData[];
  information: string;
};

export const subjectTableRowData: SubjectTableRowData[] = [
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
    data: subjectTableRowData,
    information:
      "Courses usually done in first year They're split into two block exams. (All other courses have to be passed individually)",
  },
  {
    name: "Grundlagenfächer",
    data: subjectTableRowData,
    information:
      "Courses usually done in second year. Requirements: All courses need to be taken, but only seven of eight have to be passed. If you don't pass all, you need to take an additional core subject instead.",
  },
  {
    name: "Kernfächer",
    data: subjectTableRowData,
    information:
      "Courses usually done in second year. Requirements: At least four courses need to be taken. You can also take more.",
  },
  {
    name: "Gess",
    data: subjectTableRowData,
    information:
      "Courses"
  },
];

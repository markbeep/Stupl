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
    semester: 1,
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
    information: "Kacke",
  },
  {
    name: "Grundlagenfächer",
    data: subjectTableRowData,
    information: "noch mehr kacke",
  },
];

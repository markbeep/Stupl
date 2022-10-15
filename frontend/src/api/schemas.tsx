export type Category = {
  name: string;
  id: number;
};

/// UserSubjects in models.py
export type SubjectData = {
  name: string;
  credits: number;
  category: string;
  category_id: number;
  semester: string;
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

export const categories = [
  { name: "Other", id: 0 },
  { name: "BasicCourse", id: 1 },
  { name: "MinorCourse", id: 2 },
  { name: "CoreCourse", id: 3 },
  { name: "FirstYearExaminations", id: 4 },
  { name: "Seminar", id: 5 },
  { name: "Electives", id: 6 },
  { name: "BachelorThesis", id: 7 },
  { name: "GESS", id: 8 },
];

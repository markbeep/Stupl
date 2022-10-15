export type Category = {
  name: string;
  id: number;
};

/// UserSubjects in models.py
export type SubjectData = {
  name: string;
  credits: number;
  category: Category;
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
  category: Category;
  semester: string;
  year: number;
};

import { FlashOnRounded } from "@mui/icons-material";

export type RequirementsData = {
  requirementsId: number;
  name: string;
  fullfilled: boolean;
};

export const requirementsData: RequirementsData[] = [
  {
    requirementsId: 1,
    name: "First Year Courses = 56 KP",
    fullfilled: true,
  },
  {
    requirementsId: 3,
    name: "Basic Courses >= 45 KP",
    fullfilled: false,
  },
  {
    requirementsId: 4,
    name: "Core Courses >= 32 KP",
    fullfilled: false,
  },

  {
    requirementsId: 2,
    name: "Basic Courses + Core Courses >= 84 KP",
    fullfilled: false,
  },
  {
    requirementsId: 6,
    name: "Basic Courses + Core Courses + Electives >= 96 KP",
    fullfilled: true,
  },
  {
    requirementsId: 7,
    name: "Seminar = 2KP",
    fullfilled: false,
  },
  {
    requirementsId: 8,
    name: "Minor Courses >= 5 KP",
    fullfilled: false,
  },
  {
    requirementsId: 9,
    name: "Science in Perspective >= 6 KP",
    fullfilled: false,
  },
  {
    requirementsId: 10,
    name: "Bachelor's Thesis = 10 KP",
    fullfilled: false,
  },
  {
    requirementsId: 11,
    name: "Total  >= 180 KP",
    fullfilled: false,
  },
];

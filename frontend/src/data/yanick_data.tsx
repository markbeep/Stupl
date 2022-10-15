import { FlashOnRounded } from "@mui/icons-material";

export type RequirementsData = {
  requirementsId: number;
  name: string;
  fullfilled: boolean;
};

export const requirementsData: RequirementsData[] = [
  {
    requirementsId: 1,
    name: "Fächer des Basisjahres = 56 KP",
    fullfilled: true,
  },
  {
    requirementsId: 2,
    name: "Grundlagenfächer und Kernfächer >= 84 KP",
    fullfilled: false,
  },
  {
    requirementsId: 3,
    name: "Grundlagenfächer >= 45 KP",
    fullfilled: false,
  },
  {
    requirementsId: 4,
    name: "Kernfächer >= 32 KP",
    fullfilled: false,
  },
  {
    requirementsId: 6,
    name: "Grundlagenfächer, Kernfächer und Wahlfächer >= 96 KP",
    fullfilled: true,
  },
  {
    requirementsId: 7,
    name: "Seminar = 2KP",
    fullfilled: false,
  },
  {
    requirementsId: 8,
    name: "Ergänzung >= 5 KP",
    fullfilled: false,
  },
  {
    requirementsId: 9,
    name: "Wissenschaft im Kontext >= 6 KP",
    fullfilled: false,
  },
  {
    requirementsId: 10,
    name: "Bachelorarbeit = 10 KP",
    fullfilled: false,
  },
  {
    requirementsId: 11,
    name: "Gesamt  >= 180 KP",
    fullfilled: false,
  },
];

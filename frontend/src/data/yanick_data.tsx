import { FlashOnRounded } from "@mui/icons-material";

export type RequirementsData = {
  name: string;
  fullfilled: boolean;
};

export const requirementsData: RequirementsData[] = [
  {
    name: "Fächer des Basisjahres = 56 KP",
    fullfilled: true,
  },
  {
    name: "Grundlagenfächer und Kernfächer >= 84 KP",
    fullfilled: false,
  },
  {
    name: "Grundlagenfächer >= 45 KP",
    fullfilled: false,
  },
  {
    name: "Kernfächer >= 32 KP",
    fullfilled: false,
  },
  {
    name: "Grundlagenfächer, Kernfächer und Wahlfächer >= 96 KP",
    fullfilled: true,
  },
  {
    name: "Seminar = 2KP",
    fullfilled: false,
  },
  {
    name: "Ergänzung >= 5 KP",
    fullfilled: false,
  },
  {
    name: "Wissenschaft im Kontext >= 6 KP",
    fullfilled: false,
  },
  {
    name: "Bachelorarbeit = 10 KP",
    fullfilled: false,
  },
  {
    name: "Gesamt  >= 180 KP",
    fullfilled: false,
  },
];

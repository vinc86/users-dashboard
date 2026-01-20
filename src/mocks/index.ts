import type { User } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "George Harris",
    role: "admin",
    jobTitle: "Software Engineer",
    team: "Security",
    email: "george.harris@example.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    name: "Arianna Russo",
    role: "editor",
    jobTitle: "Product Designer",
    team: "Website",
    email: "arianna.russo@example.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    name: "Marco Esposito",
    role: "viewer",
    jobTitle: "Software Engineer",
    team: "Finance",
    email: "marco.esposito@example.com",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

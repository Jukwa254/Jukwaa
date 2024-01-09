import Image from "../assets/images/signup-image.png";

export type CardType = {
  id: number;
  projectTitle: string;
  created_at: string;
  ProjectDescription: string;
  projectCategory: string;
  likes: number;
  dislikes: number;
  projectAvatar: string;
  projectImage: string;
};

export const cards: CardType[] = [
  {
    id: 1,
    projectTitle: "The New Youth Fund",
    ProjectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    projectAvatar: Image,
    projectImage: Image,
  },
  {
    id: 2,
    projectTitle: "The New Youth Fund",
    ProjectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    projectAvatar: Image,
    projectImage: Image,
  },
  {
    id: 3,
    projectTitle: "The New Youth Fund",
    ProjectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    projectAvatar: Image,
    projectImage: Image,
  },
  {
    id: 4,
    projectTitle: "The New Youth Fund",
    ProjectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    projectAvatar: Image,
    projectImage: Image,
  },
];

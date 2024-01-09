import Image from "../assets/images/signup-image.png";

export type CardType = {
  id: number;
  projectTitle: string;
  created_at: string;
  projectDescription: string;
  projectCategory: string;
  likes: number;
  dislikes: number;
  organizationLogo: string;
  organizationName: string;
  projectImage: string;
  projectComments: number;
};

export const cards: CardType[] = [
  {
    id: 1,
    projectTitle: "The New Youth Fund",
    projectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    organizationLogo: Image,
    organizationName: "Kenya Power Limited",
    projectImage: Image,
    projectComments: 2400,
  },

  {
    id: 2,
    projectTitle: "2024 Financial Bugteting",
    projectDescription:
      "Ready to take control of your financial future? Explore our services, read success stories from our community, and join us on a journey towards financial empowerment. [Your Brand Name] is not just about managing budgets; it's about transforming lives. Let's build a prosperous future together.",
    projectCategory: "Government",
    likes: 2423,
    dislikes: 26,
    created_at: "12/5/2023",
    organizationLogo: Image,
    organizationName: "Ministry of Finance",
    projectImage: Image,
    projectComments: 240,
  },
  {
    id: 3,
    projectTitle: "The New Youth Fund",
    projectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    organizationLogo: Image,
    organizationName: "Kenya Power Limited",
    projectImage: Image,
    projectComments: 2400,
  },
  {
    id: 4,
    projectTitle: "The New Youth Fund",
    projectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    organizationLogo: Image,
    organizationName: "Kenya Power Limited",
    projectImage: Image,
    projectComments: 2400,
  },
  {
    id: 5,
    projectTitle: "The New Youth Fund",
    projectDescription:
      "Our government proposes to undertake a new project aimed at improving public transport infrastructure in urban areas. The project involves the construction of new bus lanes and the upgrade of existing one. The project aims to increase access to affordable and reliable public transportation for residents, reduce carbon emissions, and stimulate economic growth by facilitating the movement of people and goods",
    projectCategory: "Productivity",
    likes: 3300,
    dislikes: 500,
    created_at: "12/1/2020",
    organizationLogo: Image,
    organizationName: "Kenya Power Limited",
    projectImage: Image,
    projectComments: 2400,
  },
];

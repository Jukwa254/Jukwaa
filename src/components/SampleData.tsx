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
    id: 6,
    projectTitle: "Green Energy Revolution",
    projectDescription:
      "The government is embarking on a transformative project to boost renewable energy sources. This initiative will focus on the construction of solar and wind farms across the nation, aiming to reduce dependency on fossil fuels and promote a cleaner, sustainable energy future.",
    projectCategory: "Environment",
    likes: 2800,
    dislikes: 300,
    created_at: "01/10/2024",
    organizationLogo: Image,
    organizationName: "National Energy Authority",
    projectImage: Image,
    projectComments: 1800,
  },
  {
    id: 7,
    projectTitle: "Healthcare Infrastructure Upgrade",
    projectDescription:
      "A comprehensive plan is underway to modernize and expand healthcare facilities nationwide. The project will involve the construction of new hospitals, clinics, and medical research centers, aiming to enhance healthcare accessibility and quality for all citizens.",
    projectCategory: "Health",
    likes: 3100,
    dislikes: 200,
    created_at: "01/15/2024",
    organizationLogo: Image,
    organizationName: "Ministry of Health",
    projectImage: Image,
    projectComments: 2200,
  },
  {
    id: 8,
    projectTitle: "Digital Education Initiative",
    projectDescription:
      "To adapt to the digital age, the government is launching a program to integrate technology into education. This initiative will provide schools with modern digital tools, online resources, and training for educators, aiming to enhance learning outcomes and prepare students for future challenges.",
    projectCategory: "Education",
    likes: 2600,
    dislikes: 400,
    created_at: "01/20/2024",
    organizationLogo: Image,
    organizationName: "Department of Education",
    projectImage: Image,
    projectComments: 1900,
  },
  {
    id: 9,
    projectTitle: "Urban Renewal Project",
    projectDescription:
      "A major urban renewal project is set to transform city centers, focusing on revitalizing infrastructure, improving public spaces, and promoting sustainable urban development. The initiative aims to create vibrant, livable cities for residents and attract investments for economic growth.",
    projectCategory: "Infrastructure",
    likes: 2900,
    dislikes: 250,
    created_at: "01/25/2024",
    organizationLogo: Image,
    organizationName: "Urban Development Authority",
    projectImage: Image,
    projectComments: 2100,
  },
  {
    id: 10,
    projectTitle: "Agricultural Innovation Program",
    projectDescription:
      "To boost agricultural productivity and sustainability, the government is launching an innovation program. This initiative will support farmers with advanced technologies, training, and research, aiming to enhance food security, increase yields, and promote sustainable farming practices.",
    projectCategory: "Agriculture",
    likes: 2700,
    dislikes: 350,
    created_at: "01/30/2024",
    organizationLogo: Image,
    organizationName: "Ministry of Agriculture",
    projectImage: Image,
    projectComments: 2000,
  },
  {
    id: 11,
    projectTitle: "Smart City Integration",
    projectDescription:
      "The government is initiating a 'Smart City' project to integrate advanced technologies for efficient urban management. This includes the deployment of IoT devices, smart grids, and data analytics platforms to enhance city services, improve sustainability, and optimize resource utilization.",
    projectCategory: "Technology",
    likes: 2600,
    dislikes: 280,
    created_at: "02/05/2024",
    organizationLogo: Image,
    organizationName: "Smart City Authority",
    projectImage: Image,
    projectComments: 1700,
  },
  {
    id: 12,
    projectTitle: "Rural Development Initiative",
    projectDescription:
      "A comprehensive rural development initiative is underway to address the unique challenges faced by rural communities. The project focuses on improving infrastructure, promoting local industries, enhancing access to healthcare and education, and empowering local governance for sustainable development.",
    projectCategory: "Development",
    likes: 2500,
    dislikes: 310,
    created_at: "02/10/2024",
    organizationLogo: Image,
    organizationName: "Ministry of Rural Affairs",
    projectImage: Image,
    projectComments: 1600,
  },
  {
    id: 13,
    projectTitle: "Cultural Heritage Preservation",
    projectDescription:
      "To safeguard our rich cultural heritage, the government is launching a preservation program. This initiative will focus on restoring historical sites, promoting traditional arts and crafts, documenting cultural practices, and raising awareness about the importance of preserving our cultural legacy.",
    projectCategory: "Culture",
    likes: 2400,
    dislikes: 320,
    created_at: "02/15/2024",
    organizationLogo: Image,
    organizationName: "National Heritage Commission",
    projectImage: Image,
    projectComments: 1500,
  },
  {
    id: 14,
    projectTitle: "Climate Resilience Initiative",
    projectDescription:
      "Addressing the challenges of climate change, the government is launching a resilience initiative. This program will focus on implementing adaptation strategies, enhancing disaster preparedness, promoting sustainable practices, and building community resilience to mitigate the impacts of climate variability.",
    projectCategory: "Environment",
    likes: 2700,
    dislikes: 270,
    created_at: "02/20/2024",
    organizationLogo: Image,
    organizationName: "Climate Change Authority",
    projectImage: Image,
    projectComments: 1800,
  },
  {
    id: 15,
    projectTitle: "Inclusive Employment Program",
    projectDescription:
      "To promote inclusive growth, the government is launching an employment program targeting marginalized communities. This initiative will provide training, job placement services, and support for entrepreneurship, aiming to create equitable opportunities and reduce unemployment among vulnerable groups.",
    projectCategory: "Employment",
    likes: 2800,
    dislikes: 260,
    created_at: "02/25/2024",
    organizationLogo: Image,
    organizationName: "Department of Labor and Employment",
    projectImage: Image,
    projectComments: 1900,
  },
];

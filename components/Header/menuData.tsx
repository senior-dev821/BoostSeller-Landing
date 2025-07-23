import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Features",
    path: "#features", // 👈 anchor link
    newTab: false,
  },
  {
    id: 2,
    title: "How It Works",
    path: "#howitworks",
    newTab: false,
  },
  {
    id: 3,
    title: "About",
    path: "#about",
    newTab: false,
  },
	{
    id: 4,
    title: "Our Team",
    path: "#ourteam",
    newTab: false,
  },
  {
    id: 5,
    title: "Pricing",
    path: "#pricing",
    newTab: false,
  },
];

export default menuData;

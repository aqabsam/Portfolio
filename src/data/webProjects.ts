export type WebProjectIcon = "map-pin" | "cloud" | "gamepad" | "clock" | "users" | "heart";

export interface WebProject {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: WebProjectIcon;
  gradient: string;
  iconGradient: string;
}

export const defaultWebProjects: WebProject[] = [
  {
    id: "web-lost-found",
    icon: "map-pin",
    title: "Lost & Found",
    description: "Report and track lost and found items with real-time updates.",
    gradient: "from-blue-100 to-blue-200",
    iconGradient: "from-blue-600 to-blue-700",
    link: "https://aqabsam.github.io/LOST-AND-FOUND/",
  },
  {
    id: "web-weather",
    icon: "cloud",
    title: "Weather App",
    description: "Get live weather updates and forecasts using API integration.",
    gradient: "from-green-100 to-green-200",
    iconGradient: "from-green-600 to-green-700",
    link: "https://aqabsam.github.io/PRODIGY_WD_05/",
  },
  {
    id: "web-ttt",
    icon: "gamepad",
    title: "Tic Tac Toe",
    description: "Interactive Tic Tac Toe game built with JavaScript and React.",
    gradient: "from-purple-100 to-purple-200",
    iconGradient: "from-purple-600 to-purple-700",
    link: "https://aqabsam.github.io/PRODIGY_WD_03/",
  },
  {
    id: "web-stopwatch",
    icon: "clock",
    title: "Stopwatch",
    description: "A fully functional stopwatch with start, stop, reset, and lap features.",
    gradient: "from-orange-100 to-orange-200",
    iconGradient: "from-orange-600 to-orange-700",
    link: "https://aqabsam.github.io/PRODIGY_WD_02/",
  },
  {
    id: "web-nice",
    icon: "users",
    title: "Nice",
    description: "An interactive platform to connect students with startup initiatives.",
    gradient: "from-teal-100 to-teal-200",
    iconGradient: "from-teal-600 to-teal-700",
    link: "https://yourdomain.com/nice",
  },
  {
    id: "web-bezubaan",
    icon: "heart",
    title: "Helping Hand for Bezubaan",
    description: "Web app supporting charitable initiatives for the mute community.",
    gradient: "from-red-100 to-red-200",
    iconGradient: "from-red-600 to-red-700",
    link: "https://aqabsam.github.io/HELPING_HAND_FOR_BEZUBAAN/",
  },
];

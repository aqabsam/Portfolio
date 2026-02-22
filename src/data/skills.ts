import reactLogo from "../assets/skills/react.png";
import jsLogo from "../assets/skills/javascript.png";
import tailwindLogo from "../assets/skills/tailwind.png";
import bootstrapLogo from "../assets/skills/bootstrap.png";

export interface Skill {
  id: string;
  name: string;
  logo: string;
  percentage: number;
}

export const defaultSkills: Skill[] = [
  { id: "skill-react", name: "React", logo: reactLogo, percentage: 90 },
  { id: "skill-js", name: "JavaScript", logo: jsLogo, percentage: 88 },
  { id: "skill-tailwind", name: "Tailwind CSS", logo: tailwindLogo, percentage: 90 },
  { id: "skill-bootstrap", name: "Bootstrap", logo: bootstrapLogo, percentage: 86 },
  { id: "skill-mongodb", name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248", percentage: 82 },
  { id: "skill-express", name: "Express.js", logo: "https://cdn.simpleicons.org/express/000000", percentage: 80 },
  { id: "skill-node", name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933", percentage: 84 },
  { id: "skill-flutter", name: "Flutter", logo: "https://cdn.simpleicons.org/flutter/02569B", percentage: 84 },
  { id: "skill-firebase", name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28", percentage: 82 },
  { id: "skill-python", name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB", percentage: 83 },
  { id: "skill-flask", name: "Flask", logo: "https://cdn.simpleicons.org/flask/000000", percentage: 78 },
  { id: "skill-ml", name: "Machine Learning", logo: "https://cdn.simpleicons.org/scikitlearn/F7931E", percentage: 76 },
];

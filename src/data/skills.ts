export interface Skill {
  id: string;
  name: string;
  logo: string;
  percentage: number;
}

export const defaultSkills: Skill[] = [
  { id: "skill-react", name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB", percentage: 90 },
  { id: "skill-js", name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript/F7DF1E", percentage: 88 },
  { id: "skill-tailwind", name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4", percentage: 90 },
  { id: "skill-bootstrap", name: "Bootstrap", logo: "https://cdn.simpleicons.org/bootstrap/7952B3", percentage: 86 },
  { id: "skill-mongodb", name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248", percentage: 82 },
  { id: "skill-express", name: "Express.js", logo: "https://cdn.simpleicons.org/express/000000", percentage: 80 },
  { id: "skill-node", name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933", percentage: 84 },
  { id: "skill-flutter", name: "Flutter", logo: "https://cdn.simpleicons.org/flutter/02569B", percentage: 84 },
  { id: "skill-firebase", name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28", percentage: 82 },
  { id: "skill-python", name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", percentage: 83 },
  { id: "skill-flask", name: "Flask", logo: "https://cdn.simpleicons.org/flask/000000", percentage: 78 },
  { id: "skill-ml", name: "Machine Learning", logo: "https://cdn.simpleicons.org/pytorch/EE4C2C", percentage: 76 },
];

import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc, writeBatch } from "firebase/firestore";

const requiredEnvKeys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const missingEnvKeys = requiredEnvKeys.filter((key) => !process.env[key]?.trim());

if (missingEnvKeys.length > 0) {
  console.error(`Missing Firebase env vars: ${missingEnvKeys.join(", ")}`);
  process.exit(1);
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const defaultSkills = [
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

const defaultCertificates = [
  {
    id: "cert-ml-webdev",
    title: "Machine Learning and Web Development",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
  },
  {
    id: "cert-c-programming",
    title: "C Programming",
    issuer: "IIT Roorkee",
    date: "Jul 2025",
    link: "/IIT Roorkee.pdf",
  },
  {
    id: "cert-state-level",
    title: "State Level Bootcamp",
    issuer: "Bihar DSTTE",
    date: "May 2025",
    link: "/BOOTCAMP.pdf",
  },
  {
    id: "cert-bootcamp",
    title: "Boot Camp",
    issuer: "IIT Bombay",
    date: "Apr 2025",
    link: "/BOOTCAMP.pdf",
  },
];

const defaultWebProjects = [
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const replaceCollection = async (collectionName, documents) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const nextIds = new Set(documents.map((item) => item.id));
  const batch = writeBatch(db);

  documents.forEach((item) => {
    batch.set(doc(db, collectionName, item.id), item);
  });

  snapshot.forEach((existingDoc) => {
    if (!nextIds.has(existingDoc.id)) {
      batch.delete(existingDoc.ref);
    }
  });

  await batch.commit();
};

const run = async () => {
  await replaceCollection("skills", defaultSkills);
  await replaceCollection("certificates", defaultCertificates);
  await replaceCollection("webProjects", defaultWebProjects);

  await setDoc(
    doc(db, "settings", "resume"),
    { link: "/resume.pdf", updatedAt: Date.now() },
    { merge: true },
  );

  console.log("Firestore portfolio data seeded successfully.");
};

run().catch((error) => {
  console.error("Failed to seed Firestore:", error);
  process.exit(1);
});

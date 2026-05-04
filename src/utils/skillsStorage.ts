import { collection, doc, getDocs, onSnapshot, writeBatch } from "firebase/firestore";
import { defaultSkills, Skill } from "../data/skills";
import { db, isFirebaseReady } from "./firebase";

const SKILLS_STORAGE_KEY = "portfolio_skills_v1";
const SKILLS_UPDATED_EVENT = "portfolio_skills_updated";
const SKILLS_COLLECTION = "skills";
const DEFAULT_SKILL_IDS = new Set(defaultSkills.map((skill) => skill.id));

const sanitizeSkills = (skills: Skill[]): Skill[] => {
  const validSkills = skills.filter(
    (skill) =>
      skill &&
      typeof skill.id === "string" &&
      DEFAULT_SKILL_IDS.has(skill.id) &&
      typeof skill.name === "string" &&
      typeof skill.logo === "string" &&
      typeof skill.percentage === "number",
  );

  if (validSkills.length !== defaultSkills.length) {
    return defaultSkills;
  }

  return defaultSkills.map((defaultSkill) => {
    const matchedSkill = validSkills.find((skill) => skill.id === defaultSkill.id);
    return matchedSkill ?? defaultSkill;
  });
};

const updateLocalSkills = (skills: Skill[]) => {
  localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills));
  window.dispatchEvent(new Event(SKILLS_UPDATED_EVENT));
};

export const getSkills = (): Skill[] => {
  const raw = localStorage.getItem(SKILLS_STORAGE_KEY);
  if (!raw) {
    updateLocalSkills(defaultSkills);
    return defaultSkills;
  }

  try {
    const parsed = JSON.parse(raw) as Skill[];
    return Array.isArray(parsed) && parsed.length > 0 ? sanitizeSkills(parsed) : defaultSkills;
  } catch {
    return defaultSkills;
  }
};

export const saveSkills = (skills: Skill[]): void => {
  const sanitizedSkills = sanitizeSkills(skills);
  updateLocalSkills(sanitizedSkills);

  if (!isFirebaseReady || !db) {
    return;
  }

  void (async () => {
    try {
      const skillsCollection = collection(db, SKILLS_COLLECTION);
      const existingSnapshot = await getDocs(skillsCollection);
      const nextIds = new Set(sanitizedSkills.map((skill) => skill.id));
      const batch = writeBatch(db);

      sanitizedSkills.forEach((skill) => {
        batch.set(doc(db, SKILLS_COLLECTION, skill.id), skill);
      });

      existingSnapshot.forEach((skillDoc) => {
        if (!nextIds.has(skillDoc.id)) {
          batch.delete(skillDoc.ref);
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Failed to sync skills to Firebase:", error);
    }
  })();
};

export const subscribeToSkills = (onChange: (skills: Skill[]) => void): (() => void) => {
  const handleUpdate = () => onChange(getSkills());

  const handleStorage = (event: StorageEvent) => {
    if (event.key === SKILLS_STORAGE_KEY) {
      onChange(getSkills());
    }
  };

  window.addEventListener(SKILLS_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  if (!isFirebaseReady || !db) {
    return () => {
      window.removeEventListener(SKILLS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }

  const unsubscribeFirestore = onSnapshot(collection(db, SKILLS_COLLECTION), (snapshot) => {
    const firebaseSkills = snapshot.docs.map((skillDoc) => skillDoc.data() as Skill);
    const sanitizedFirebaseSkills = sanitizeSkills(firebaseSkills);

    if (firebaseSkills.length === 0) {
      const localSkills = getSkills();
      onChange(localSkills);
      if (localSkills.length > 0) {
        saveSkills(localSkills);
      }
      return;
    }

    onChange(sanitizedFirebaseSkills);
    updateLocalSkills(sanitizedFirebaseSkills);

    const isCorrupted =
      firebaseSkills.length !== defaultSkills.length ||
      firebaseSkills.some((skill) => !DEFAULT_SKILL_IDS.has(skill.id));

    if (isCorrupted) {
      saveSkills(defaultSkills);
    }
  });

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(SKILLS_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
};

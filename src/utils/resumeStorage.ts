import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";

const RESUME_STORAGE_KEY = "portfolio_resume_link_v1";
const RESUME_UPDATED_EVENT = "portfolio_resume_updated";
const DEFAULT_RESUME_LINK = "/resume.pdf";
const SETTINGS_COLLECTION = "settings";
const RESUME_DOC_ID = "resume";

const updateLocalResume = (resumeLink: string) => {
  localStorage.setItem(RESUME_STORAGE_KEY, resumeLink);
  window.dispatchEvent(new Event(RESUME_UPDATED_EVENT));
};

export const getResumeLink = (): string => {
  const storedResumeLink = localStorage.getItem(RESUME_STORAGE_KEY);
  return storedResumeLink && storedResumeLink.trim() ? storedResumeLink : DEFAULT_RESUME_LINK;
};

export const saveResumeLink = (resumeLink: string): void => {
  updateLocalResume(resumeLink);

  if (!isFirebaseReady || !db) {
    return;
  }

  void setDoc(
    doc(db, SETTINGS_COLLECTION, RESUME_DOC_ID),
    { link: resumeLink, updatedAt: Date.now() },
    { merge: true },
  ).catch((error) => {
    console.error("Failed to sync resume to Firebase:", error);
  });
};

export const subscribeToResume = (onChange: (resumeLink: string) => void): (() => void) => {
  const handleUpdate = () => onChange(getResumeLink());

  const handleStorage = (event: StorageEvent) => {
    if (event.key === RESUME_STORAGE_KEY) {
      onChange(getResumeLink());
    }
  };

  window.addEventListener(RESUME_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  if (!isFirebaseReady || !db) {
    return () => {
      window.removeEventListener(RESUME_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }

  const unsubscribeFirestore = onSnapshot(doc(db, SETTINGS_COLLECTION, RESUME_DOC_ID), (snapshot) => {
    const firebaseLink = snapshot.data()?.link;
    if (typeof firebaseLink === "string" && firebaseLink.trim()) {
      onChange(firebaseLink);
      updateLocalResume(firebaseLink);
      return;
    }

    const localLink = getResumeLink();
    onChange(localLink);
    if (localLink) {
      saveResumeLink(localLink);
    }
  });

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(RESUME_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
};

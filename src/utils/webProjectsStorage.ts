import { collection, doc, getDocs, onSnapshot, writeBatch } from "firebase/firestore";
import { defaultWebProjects, WebProject } from "../data/webProjects";
import { db, isFirebaseReady } from "./firebase";

const WEB_PROJECTS_STORAGE_KEY = "portfolio_web_projects_v1";
const WEB_PROJECTS_UPDATED_EVENT = "portfolio_web_projects_updated";
const WEB_PROJECTS_COLLECTION = "webProjects";

const updateLocalWebProjects = (projects: WebProject[]) => {
  localStorage.setItem(WEB_PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event(WEB_PROJECTS_UPDATED_EVENT));
};

export const getWebProjects = (): WebProject[] => {
  const raw = localStorage.getItem(WEB_PROJECTS_STORAGE_KEY);
  if (!raw) {
    updateLocalWebProjects(defaultWebProjects);
    return defaultWebProjects;
  }

  try {
    const parsed = JSON.parse(raw) as WebProject[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultWebProjects;
  } catch {
    return defaultWebProjects;
  }
};

export const saveWebProjects = (projects: WebProject[]): void => {
  updateLocalWebProjects(projects);

  if (!isFirebaseReady || !db) {
    return;
  }

  void (async () => {
    try {
      const projectsCollection = collection(db, WEB_PROJECTS_COLLECTION);
      const existingSnapshot = await getDocs(projectsCollection);
      const nextIds = new Set(projects.map((project) => project.id));
      const batch = writeBatch(db);

      projects.forEach((project) => {
        batch.set(doc(db, WEB_PROJECTS_COLLECTION, project.id), project);
      });

      existingSnapshot.forEach((projectDoc) => {
        if (!nextIds.has(projectDoc.id)) {
          batch.delete(projectDoc.ref);
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Failed to sync web projects to Firebase:", error);
    }
  })();
};

export const subscribeToWebProjects = (onChange: (projects: WebProject[]) => void): (() => void) => {
  const handleUpdate = () => onChange(getWebProjects());

  const handleStorage = (event: StorageEvent) => {
    if (event.key === WEB_PROJECTS_STORAGE_KEY) {
      onChange(getWebProjects());
    }
  };

  window.addEventListener(WEB_PROJECTS_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  if (!isFirebaseReady || !db) {
    return () => {
      window.removeEventListener(WEB_PROJECTS_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }

  const unsubscribeFirestore = onSnapshot(collection(db, WEB_PROJECTS_COLLECTION), (snapshot) => {
    const firebaseProjects = snapshot.docs.map((projectDoc) => projectDoc.data() as WebProject);

    if (firebaseProjects.length === 0) {
      const localProjects = getWebProjects();
      onChange(localProjects);
      if (localProjects.length > 0) {
        saveWebProjects(localProjects);
      }
      return;
    }

    onChange(firebaseProjects);
    updateLocalWebProjects(firebaseProjects);
  });

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(WEB_PROJECTS_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
};

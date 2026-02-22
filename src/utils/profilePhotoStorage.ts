import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";

const PROFILE_PHOTO_STORAGE_KEY = "portfolio_profile_photo_v1";
const PROFILE_PHOTO_UPDATED_EVENT = "portfolio_profile_photo_updated";
const SETTINGS_COLLECTION = "settings";
const PROFILE_PHOTO_DOC_ID = "profilePhoto";

const updateLocalProfilePhoto = (photoLink: string) => {
  localStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, photoLink);
  window.dispatchEvent(new Event(PROFILE_PHOTO_UPDATED_EVENT));
};

export const getProfilePhotoLink = (): string => {
  return localStorage.getItem(PROFILE_PHOTO_STORAGE_KEY) ?? "";
};

export const saveProfilePhotoLink = (photoLink: string): void => {
  updateLocalProfilePhoto(photoLink);

  if (!isFirebaseReady || !db) {
    return;
  }

  void setDoc(
    doc(db, SETTINGS_COLLECTION, PROFILE_PHOTO_DOC_ID),
    { link: photoLink, updatedAt: Date.now() },
    { merge: true },
  ).catch((error) => {
    console.error("Failed to sync profile photo to Firebase:", error);
  });
};

export const subscribeToProfilePhoto = (onChange: (photoLink: string) => void): (() => void) => {
  const handleUpdate = () => onChange(getProfilePhotoLink());

  const handleStorage = (event: StorageEvent) => {
    if (event.key === PROFILE_PHOTO_STORAGE_KEY) {
      onChange(getProfilePhotoLink());
    }
  };

  window.addEventListener(PROFILE_PHOTO_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  if (!isFirebaseReady || !db) {
    return () => {
      window.removeEventListener(PROFILE_PHOTO_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }

  const unsubscribeFirestore = onSnapshot(doc(db, SETTINGS_COLLECTION, PROFILE_PHOTO_DOC_ID), (snapshot) => {
    const firebaseLink = snapshot.data()?.link;
    if (typeof firebaseLink === "string" && firebaseLink.trim()) {
      onChange(firebaseLink);
      updateLocalProfilePhoto(firebaseLink);
      return;
    }

    const localLink = getProfilePhotoLink();
    onChange(localLink);
    if (localLink) {
      saveProfilePhotoLink(localLink);
    }
  });

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(PROFILE_PHOTO_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
};

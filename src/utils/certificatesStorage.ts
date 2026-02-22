import { Certificate, defaultCertificates } from "../data/certificates";
import { collection, doc, getDocs, onSnapshot, writeBatch } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";

const CERTIFICATES_STORAGE_KEY = "portfolio_certificates_v1";
const CERTIFICATES_UPDATED_EVENT = "portfolio_certificates_updated";
const CERTIFICATES_COLLECTION = "certificates";

const updateLocalCertificates = (certificates: Certificate[]) => {
  localStorage.setItem(CERTIFICATES_STORAGE_KEY, JSON.stringify(certificates));
  window.dispatchEvent(new Event(CERTIFICATES_UPDATED_EVENT));
};

export const getCertificates = (): Certificate[] => {
  const raw = localStorage.getItem(CERTIFICATES_STORAGE_KEY);
  if (!raw) {
    updateLocalCertificates(defaultCertificates);
    return defaultCertificates;
  }

  try {
    const parsed = JSON.parse(raw) as Certificate[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultCertificates;
  } catch {
    return defaultCertificates;
  }
};

export const saveCertificates = (certificates: Certificate[]): void => {
  updateLocalCertificates(certificates);

  if (!isFirebaseReady || !db) {
    return;
  }

  void (async () => {
    try {
      const certificatesCollection = collection(db, CERTIFICATES_COLLECTION);
      const existingSnapshot = await getDocs(certificatesCollection);
      const nextIds = new Set(certificates.map((certificate) => certificate.id));
      const batch = writeBatch(db);

      certificates.forEach((certificate) => {
        batch.set(doc(db, CERTIFICATES_COLLECTION, certificate.id), certificate);
      });

      existingSnapshot.forEach((certificateDoc) => {
        if (!nextIds.has(certificateDoc.id)) {
          batch.delete(certificateDoc.ref);
        }
      });

      await batch.commit();
    } catch (error) {
      console.error("Failed to sync certificates to Firebase:", error);
    }
  })();
};

export const subscribeToCertificates = (onChange: (certificates: Certificate[]) => void): (() => void) => {
  const handleUpdate = () => onChange(getCertificates());

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CERTIFICATES_STORAGE_KEY) {
      onChange(getCertificates());
    }
  };

  window.addEventListener(CERTIFICATES_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  if (!isFirebaseReady || !db) {
    return () => {
      window.removeEventListener(CERTIFICATES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }

  const unsubscribeFirestore = onSnapshot(collection(db, CERTIFICATES_COLLECTION), (snapshot) => {
    const firebaseCertificates = snapshot.docs.map((doc) => doc.data() as Certificate);

    if (firebaseCertificates.length === 0) {
      const localCertificates = getCertificates();
      onChange(localCertificates);
      if (localCertificates.length > 0) {
        saveCertificates(localCertificates);
      }
      return;
    }

    onChange(firebaseCertificates);
    updateLocalCertificates(firebaseCertificates);
  });

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(CERTIFICATES_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
};

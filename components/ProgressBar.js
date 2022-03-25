import { useState, useEffect } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ProgressBar = ({ file, setFile }) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [cancel, setCancel] = useState(false);

  useEffect(() => {
    const collectionRef = collection(db, "images");
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snap) => {
        const percent = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        if (!cancel) {
          setProgress(percent);
        }
      },
      (err) => {
        if (!cancel) {
          setError(err);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          if (!cancel) {
            setUrl(downloadUrl);
            if (url != null) {
              addDoc(collectionRef, {
                url: url,
                createdAt: serverTimestamp(),
              });
            }
          }
        });
      }
    );
    if (url) {
      if (!cancel) {
        setFile(null);
      }
    }
    return () => {
      setCancel(true);
    };
  }, [url, setFile]);

  return <div className="progressBar" style={{ width: `${progress}%` }}></div>;
};
export default ProgressBar;

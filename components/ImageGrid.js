import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const ImageGrid = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const ref = collection(db, "images");
    ref = query(ref, orderBy("createdAt", "desc"));
    onSnapshot(ref, (snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });
  }, []);
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded" />
          </div>
        ))}
    </div>
  );
};
export default ImageGrid;

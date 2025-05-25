import { db } from "../../backend/firebaseConfig";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { USER_UID } = req.query;
      const userRef = doc(db, "idMap", USER_UID);
      const userSnapshot = await getDoc(userRef);

      const { userId } = userSnapshot.data();
    res.status(200).json({ userId }); 
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

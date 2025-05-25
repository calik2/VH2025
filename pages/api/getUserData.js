import { db } from "../../backend/firebaseConfig";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { USER_ID } = req.query;
      const userRef = doc(db, "users", USER_ID);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();
    res.status(200).json({ userData }); 
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

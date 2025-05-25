import { db } from "../../backend/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {

      const { USER_UID } = req.query;
      const userRef = doc(db, "idMap", USER_UID);
      const userSnapshot = await getDoc(userRef);

      const { userId } = userSnapshot.data();

      const { isMentor, Name, isStudent, Hobbies, Values, Preferences, LinkedIn, photoURL } = req.body;

      // Use newUserId as document ID (converted to string because Firestore IDs are strings)
      const userDocRef = doc(db, 'users', userId);

      await setDoc(userDocRef, {
        isMentor,
        Name,
        isStudent,
        Hobbies,
        Values,
        Preferences,
        LinkedIn,
        Liked: [],
        photoURL,
      });

      res.status(200).json({ message: `${userId} added` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

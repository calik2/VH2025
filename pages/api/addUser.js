import { doc, collection, runTransaction, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { isMentor, Name, isStudent, Hobbies, Values, Preferences, LinkedIn } = req.body;

      const counterDocRef = doc(db, "counters", "userId");

      const newUserId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterDocRef);

        let lastUserId = 0;
        if (counterDoc.exists()) {
          lastUserId = counterDoc.data().lastUserId || 0;
        }

        const nextUserId = lastUserId + 1;

        // Update the counter
        transaction.set(counterDocRef, { lastUserId: nextUserId });

        return nextUserId;
      });

      // Use newUserId as document ID (converted to string because Firestore IDs are strings)
      const userDocRef = doc(db, 'users', newUserId.toString());

      await setDoc(userDocRef, {
        isMentor,
        Name,
        isStudent,
        Hobbies,
        Values,
        Preferences,
        LinkedIn,
        Liked: [],
      });

      res.status(200).json({ message: `${newUserId} added` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

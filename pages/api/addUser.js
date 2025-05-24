import { doc, collection, runTransaction, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { isMentor, Name, Hobbies, Values, Preferences, LinkedIn } = req.body;
      const targetCollection = isMentor ? "mentors" : "mentees";

      const counterDocRef = doc(db, "counters", "users");

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
      const userDocRef = doc(db, targetCollection, newUserId.toString());

      await setDoc(userDocRef, {
        Name,
        Hobbies,
        Values,
        Preferences,
        LinkedIn,
      });

      res.status(200).json({ message: `${isMentor ? "Mentor" : "Mentee"} added`, userId: newUserId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

import { getAuth } from "firebase/auth";
import { doc, runTransaction, setDoc } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { uid } = req.body; // ✅ expect UID from frontend/auth hook

      if (!uid) {
        return res.status(400).json({ message: "Missing user UID" });
      }

      const counterDocRef = doc(db, "counters", "userId");

      const newUserId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterDocRef);
        let lastUserId = 0;
        if (counterDoc.exists()) {
          lastUserId = counterDoc.data().lastUserId || 0;
        }
        const nextUserId = lastUserId + 1;

        transaction.set(counterDocRef, { lastUserId: nextUserId });
        return nextUserId;
      });

      // 🔗 Map Firebase Auth UID to newUserId in the "idMap" collection
      const idMapDocRef = doc(db, "idMap", uid);
      await setDoc(idMapDocRef, {
        userId: newUserId.toString()
      });

      res.status(200).json({ message: `User ${uid} mapped to ID ${newUserId}` });
    } catch (err) {
      console.error("Mapping error:", err);
      res.status(500).json({ message: "Error mapping user UID" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

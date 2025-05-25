import { db } from "../../backend/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";



export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { USER_ID } = req.query;
      const { otherUser } = req.body;

      if (!USER_ID) {
        return res.status(400).json({ message: "Missing USER_ID" });
      }

      if (!otherUser) {
        return res.status(400).json({ message: "No othr user to check" });
      }

      const userRef = doc(db, "users", USER_ID.toString());
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = userDoc.data();
      const likedArray = userData.Liked || [];

      const liked = likedArray.includes(otherUser);

      const action = likedArray.includes(otherUser) ? "liked" : "not";
      res.status(200).json({ message: `${otherUser} was ${action}.` });

    } catch (err) {
      console.error("Check like error:", err);
      res.status(500).json({ message: "Failed to check" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
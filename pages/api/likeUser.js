import { db } from "../../backend/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";



export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { USER_ID } = req.query;
      const { likedUser } = req.body;

      if (!USER_ID) {
        return res.status(400).json({ message: "Missing USER_ID" });
      }

      if (!likedUser) {
        return res.status(400).json({ message: "No likes to update" });
      }

      const userRef = doc(db, "users", USER_ID.toString());
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return res.status(404).json({ message: "User not found" });
      }

      const userData = userDoc.data();
      const likedArray = userData.Liked || [];

      const updateAction = likedArray.includes(likedUser)
        ? arrayRemove(likedUser)
        : arrayUnion(likedUser);

      await updateDoc(userRef, {
        Liked: updateAction
      });

      const action = likedArray.includes(likedUser) ? "removed" : "added";
      res.status(200).json({ message: `Successfully ${action} ${likedUser} from Liked list.` });

    } catch (err) {
      console.error("Like error:", err);
      res.status(500).json({ message: "Failed to update Liked list" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
import { db } from "../../backend/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";


export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { USER_ID } = req.query;
      const updatedFields = req.body;

      if (!USER_ID) {
        return res.status(400).json({ message: "Missing USER_ID" });
      }

      if (!updatedFields || Object.keys(updatedFields).length === 0) {
        console.log("No fields to update");        
        return res.status(400).json({ message: "No fields to update" });
      }

      const userRef = doc(db, "users", USER_ID.toString());

      await updateDoc(userRef, updatedFields);

      res.status(200).json({ message: "User profile updated successfully" });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ message: "Failed to update user profile" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

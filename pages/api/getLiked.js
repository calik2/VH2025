import { db } from '../../backend/firebaseConfig';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { USER_ID } = req.query;

    const userRef = doc(db, "users", USER_ID);
    const userSnapshot = await getDoc(userRef);

    const userData = userSnapshot.data();
    const likedIds = userData.Liked || [];

    if (likedIds.length === 0) {
      return res.status(200).json({ likedUsers: [] });
    }

    const batchSize = 10;
    let likedUsers = [];

    for (let i = 0; i < likedIds.length; i += batchSize) {
      const batch = likedIds.slice(i, i + batchSize);
      const q = query(collection(db, "users"), where("__name__", "in", batch));
      const querySnapshot = await getDocs(q);

      likedUsers = likedUsers.concat(
        querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    }

    return res.status(200).json({ likedUsers });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

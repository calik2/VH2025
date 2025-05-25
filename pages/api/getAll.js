import { db } from "../../backend/firebaseConfig";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { USER_ID } = req.query;

    // get data for the user with USER_ID
    const userRef = doc(db, "users", USER_ID);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const userIsMentor = userData.isMentor;

    // get all users who are NOT the same mentor/mentee type
    const allUsersRef = collection(db, "users");
    const oppositeUsersQuery = query(allUsersRef, where("isMentor", "!=", userIsMentor));

    const querySnapshot = await getDocs(oppositeUsersQuery);
    const allOppositeUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (allOppositeUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ allOppositeUsers }); 
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

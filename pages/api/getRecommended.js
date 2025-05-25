import { db } from "../../backend/firebaseConfig";
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { USER_ID } = req.query;
    //console.log(USER_ID);

    // get data for the user with USER_ID
    const userRef = doc(db, "users", USER_ID);
    //console.log(USER_ID);
    const userSnapshot = await getDoc(userRef);
    //console.log(userSnapshot);

    const userData = userSnapshot.data();
    const userIsMentor = userData.isMentor;

    // get all users who are NOT the same mentor/mentee type
    const allUsersRef = collection(db, "users");
    const oppositeUsersQuery = query(allUsersRef, where("isMentor", "!=", userIsMentor));

    const querySnapshot = await getDocs(oppositeUsersQuery);
    const allOppositeUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const scoredUsers = []
    for(const otherUser of allOppositeUsers) {
       const score = calculateScore(userData, otherUser);
        scoredUsers.push({ otherUser, score });
    }
    scoredUsers.sort((a, b) => b.score - a.score);
    
    return res.status(200).json({ scoredUsers });
    
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

function calculateScore(userData, otherUser) {
  let score = 0;

  const adviceTypeScore = Math.abs(userData.Preferences.adviceType - otherUser.Preferences.adviceType) * 5;

  const engagementScore = Math.abs(userData.Preferences.engagement - otherUser.Preferences.engagement) * 5;


  const communicationScore = Math.abs(userData.Preferences.communicationStyle - otherUser.Preferences.communicationStyle) * 5;

  let valueScore = 0;
  for (const value of userData.Values) {
    if (otherUser.Values.includes(value)) {
      valueScore += 1;
    }
  }

  valueScore = valueScore * (userData.Preferences.values) * 2;

  score = valueScore - (adviceTypeScore + engagementScore + communicationScore);
  return score;

}

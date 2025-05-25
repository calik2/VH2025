import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NavigationBar } from "@/components/app-navbar"
import { cookies } from 'next/headers';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../backend/firebaseConfig";
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



type Mentor = {
  id: number;
  isStudent: boolean;
  Values: [string];
  photoURL: string;
  isMentor: boolean;
  Hobbies: string;
  Name: string;
  LinkedIn: string; 
}

type AllMentors = {
  allOppositeUsers:[Mentor];
}

interface MentorCardProps {
  user: Mentor
}

const getInitials = (name?: string) => {
  if (!name) return ""
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
}


function MentorCard({ user }: MentorCardProps) {
  // Split hobbies by comma and trim whitespace
  const hobbiesArray = user.Hobbies.split(",")
    .map((hobby) => hobby.trim())
    .filter((hobby) => hobby.length > 0)

  return (
    <Card className="w-full max-w-sm mx-auto h-[100%] flex flex-col justify-between">
      <CardContent className="space-y-4">
      {/* <CardHeader className="text-center pb-4"> */}
        <a
          href={user.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-semibold text-[#4F364B] hover:text-[#CABAD7] transition-colors"
        >
          {user.Name}
          <ExternalLink className="h-4 w-4" />
        </a>
        <div className="text-sm text-muted-foreground font-medium">
          {user.isStudent ? "Student" : user.isMentor ? "Mentor" : "Mentee"}
        </div>
      {/* </CardHeader> */}

        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
          <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || "/default.png"} alt="Profile" />
          <AvatarFallback className="text-3xl">{getInitials(user.Name)}</AvatarFallback>
        </Avatar>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Values</h4>
          <div className="flex flex-wrap gap-2">
            {user.Values.map((value, index) => (
              <Badge key={index} className="text-xs bg-[#47564F] text-white">
                {value}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Hobbies</h4>
          <div className="flex flex-wrap gap-2">
            {hobbiesArray.map((hobby, index) => (
              <Badge key={index} className="text-xs bg-[#47564F] text-white">
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function All() {

  // Get UID from cookies and use that to get the numeric user id from firebase
  const cookieStore = await cookies();
  const uid: string = cookieStore.get('uid')?.value ?? '';
  const userRef = doc(db, "idMap", uid);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.data();
  const userId = userData?.userId.toString();
    
  const res = await fetch(`http://localhost:3000/api/getAll?USER_ID=${userId}`);
  const data: AllMentors = await res.json();
  console.log(data)
    return (
        <div className="container mx-auto py-10 px-4 flex flex-col items-center">
        <NavigationBar/>
        <h1 className="text-3xl font-bold mb-8 text-[#4F364B]">All</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.allOppositeUsers.map((item) => (
                <div className="p-2 h-full">
                  <MentorCard key={item.id} user={item} />
                </div>
            ))}
        </div>
        </div>
    )

}

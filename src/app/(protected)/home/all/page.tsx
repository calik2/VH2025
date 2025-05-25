// 'use client';

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useState } from "react"
// import { Heart } from "lucide-react"
// import { NavigationBar } from "@/components/app-navbar";

// // Sample data - this could come from an API, database, etc.
// const items = [
//   {
//     id: 1,
//     title: "Analytics Dashboard",
//     description: "Comprehensive analytics dashboard with real-time data visualization.",
//     footer: "Last updated: 2 days ago",
//   },
//   {
//     id: 2,
//     title: "Task Management",
//     description: "Organize and track your tasks with our intuitive management system.",
//     footer: "Last updated: 5 days ago",
//   },
//   {
//     id: 3,
//     title: "User Profiles",
//     description: "Detailed user profiles with customizable settings and preferences.",
//     footer: "Last updated: 1 week ago",
//   },
//   {
//     id: 4,
//     title: "Content Library",
//     description: "Access our extensive library of resources and materials.",
//     footer: "Last updated: 3 days ago",
//   },
//   {
//     id: 5,
//     title: "Messaging Platform",
//     description: "Connect with team members through our secure messaging platform.",
//     footer: "Last updated: 1 day ago",
//   },
//   {
//     id: 6,
//     title: "Calendar Events",
//     description: "Schedule and manage your events with our interactive calendar.",
//     footer: "Last updated: 4 days ago",
//   },
//   {
//     id: 7,
//     title: "File Storage",
//     description: "Securely store and organize your files in our cloud-based system.",
//     footer: "Last updated: 6 days ago",
//   },
//   {
//     id: 8,
//     title: "Reporting Tools",
//     description: "Generate comprehensive reports with our customizable tools.",
//     footer: "Last updated: 2 weeks ago",
//   },
//   {
//     id: 9,
//     title: "API Integration",
//     description: "Seamlessly integrate with third-party services through our API.",
//     footer: "Last updated: 3 weeks ago",
//   },
// ]

// export default function Liked() {
//     const toggleLike = (id: number) => {
//         // TODO: REPLACE WITH API FUNCTION
//     }

//     const [likedMentors, setLikedMentors] = useState<number[]>([])

//     return (
//         <div className="container mx-auto py-10 px-4 flex flex-col items-center">
//         <NavigationBar/>
//         <h1 className="text-3xl font-bold mb-8">All Mentors</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {items.map((item) => (
//                 <Card key={item.id} className="h-full relative">
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-2 right-2 z-10"
//                     onClick={() => toggleLike(item.id)}
//                     aria-label={likedMentors.includes(item.id) ? "Unlike mentor" : "Like mentor"}
//                 >
//                     <Heart
//                     className={likedMentors.includes(item.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
//                     size={20}
//                     />
//                 </Button>
//                 <CardHeader>
//                     <CardTitle>{item.title}</CardTitle>
//                     <CardDescription>{item.description}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
//                     <span className="text-muted-foreground">Content Area</span>
//                     </div>
//                 </CardContent>
//                 <CardFooter className="text-sm text-muted-foreground">{item.footer}</CardFooter>
//                 </Card>
//             //   <Card key={item.id} className="h-full">
//             //     <CardHeader>
//             //       <CardTitle>{item.title}</CardTitle>
//             //       <CardDescription>{item.description}</CardDescription>
//             //     </CardHeader>
//             //     <CardContent>
//             //       <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
//             //         <span className="text-muted-foreground">Content Area</span>
//             //       </div>
//             //     </CardContent>
//             //     <CardFooter className="text-sm text-muted-foreground">{item.footer}</CardFooter>
//             //   </Card>
//             ))}
//         </div>
//         </div>
//     )
// }
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Home } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { NavigationBar } from "@/components/app-navbar"
import { cookies } from 'next/headers';
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../backend/firebaseConfig";
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Image from "next/image"



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

function MentorCard({ user }: MentorCardProps) {
  // Split hobbies by comma and trim whitespace
  const hobbiesArray = user.Hobbies.split(",")
    .map((hobby) => hobby.trim())
    .filter((hobby) => hobby.length > 0)

  return (
    <Card className="w-full max-w-sm mx-auto h-[100%] flex flex-col justify-between">
      <CardHeader className="text-center pb-4">
        <a
          href={user.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg font-semibold text-[#5A465A] hover:text-[#CABAD7] transition-colors"
        >
          {user.Name}
          <ExternalLink className="h-4 w-4" />
        </a>
        <div className="text-sm text-muted-foreground font-medium">
          {user.isStudent ? "Student" : user.isMentor ? "Mentor" : "User"}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
            {/* <Image
              src={user.photoURL || "/placeholder.svg"}
              alt={`${user.Name}'s profile picture`}
              fill
              className="object-cover"
              crossOrigin="anonymous"
            /> */}
          </div>
        </div>

        {/* Values */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Values</h4>
          <div className="flex flex-wrap gap-2">
            {user.Values.map((value, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
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
              <Badge key={index} variant="outline" className="text-xs">
                {hobby}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function Recommended() {

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

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

type ReccomendedMentors = {
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
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="text-center pb-4">
        <a
          href={user.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
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
          <Avatar className="h-24 w-24">
          <AvatarImage src={user.photoURL || "/file.svg"} alt="Profile" />
          <AvatarFallback className="text-3xl">{getInitials(user.Name)}</AvatarFallback>
        </Avatar>
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
  const data: ReccomendedMentors = await res.json();
  console.log(data)
  return (
    <>
    {/* <div className="fixed top-5 z-50"><NavigationBar /></div> */}
      {/* push page content down so it doesn’t live under the bar */}
      <div className="container mx-auto py-10 px-4 flex flex-col items-center">
      <NavigationBar />
        <h1 className="text-3xl font-bold mb-10">Recommended Mentors</h1>
    
      <Carousel className="w-full h-full flex flex-col">
        <CarouselContent className="h-[800px]">
          {
            data.allOppositeUsers.map((mentor) => (
              <CarouselItem key={mentor.id} className="md:basis-2/3 lg:basis-1/2">
                <div className="p-2 h-full">
                  <MentorCard key={mentor.id} user={mentor} />
                </div>
              </CarouselItem>

            ))
          }
        </CarouselContent>
        <CarouselPrevious className="group left-4 text-white bg-[#4F364B] hover:bg-[#CABAD7]"> 
        <svg className="w-5 h-5 text-gray-500 group-hover:[#4F364B]" />
        </CarouselPrevious>
        <CarouselNext className="right-4 group text-white bg-[#4F364B] hover:bg-[#CABAD7]">
        <svg className="w-5 h-5 text-gray-500 group-hover:[#4F364B]" />
        </CarouselNext>
      </Carousel>
    </div>
    </>
    
  )
}


// Sample data for recommended mentors
// const recommendedMentors = [
//   {
//     id: 101,
//     title: "Dr. Sarah Johnson",
//     description: "AI Research Specialist with 10+ years experience at Google Brain.",
//     footer: "Specializes in: Machine Learning, Neural Networks",
//     match: "98% match to your interests",
//   },
//   {
//     id: 102,
//     title: "Prof. Michael Chen",
//     description: "Stanford Professor of Computer Science and bestselling author.",
//     footer: "Specializes in: Algorithms, Data Structures",
//     match: "95% match to your interests",
//   },
//   {
//     id: 103,
//     title: "Emma Rodriguez",
//     description: "Senior Software Architect at Amazon with expertise in cloud systems.",
//     footer: "Specializes in: AWS, System Design",
//     match: "92% match to your interests",
//   },
//   {
//     id: 104,
//     title: "Dr. James Wilson",
//     description: "Former CTO of a Fortune 500 company and tech startup advisor.",
//     footer: "Specializes in: Leadership, Entrepreneurship",
//     match: "90% match to your interests",
//   },
//   {
//     id: 105,
//     title: "Olivia Thompson",
//     description: "Full-stack developer and open source contributor with 500+ PRs.",
//     footer: "Specializes in: React, Node.js, TypeScript",
//     match: "88% match to your interests",
//   },
// ]

// export default function Recommended() {
//   const [likedMentors, setLikedMentors] = useState<number[]>([])

//   const toggleLike = (id: number) => {
//     setLikedMentors((prev) => (prev.includes(id) ? prev.filter((mentorId) => mentorId !== id) : [...prev, id]))
//   }

//   return (
//     <div className="container mx-auto py-10 px-4 flex flex-col items-center">
//         <NavigationBar/>
//       <h1 className="text-3xl font-bold mb-8">Reccomended Mentors</h1>
    
//       <Carousel className="w-full">
//         <CarouselContent>
//           {
//             recommendedMentors.map((mentor) => (
//               <CarouselItem key={mentor.id} className="md:basis-2/3 lg:basis-1/2">
//                 <div className="p-2 h-full">
//                   <Card className="h-full relative">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="absolute top-2 right-2 z-10"
//                       onClick={() => toggleLike(mentor.id)}
//                       aria-label={likedMentors.includes(mentor.id) ? "Unlike mentor" : "Like mentor"}
//                     >
//                       <Heart
//                         className={
//                           likedMentors.includes(mentor.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
//                         }
//                         size={20}
//                       />
//                     </Button>
//                     <CardHeader>
//                       <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-2">
//                         {mentor.match}
//                       </div>
//                       <CardTitle>{mentor.title}</CardTitle>
//                       <CardDescription>{mentor.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
//                         <span className="text-muted-foreground">Mentor Profile</span>
//                       </div>
//                     </CardContent>
//                     <CardFooter className="flex flex-col items-start">
//                       <p className="text-sm text-muted-foreground mb-2">{mentor.footer}</p>
//                       <Button size="sm">Request Mentorship</Button>
//                     </CardFooter>
//                   </Card>
//                 </div>
//               </CarouselItem>

//             ))
//           }
//         </CarouselContent>
//         <CarouselPrevious className="group left-4 text-white bg-[#4F364B] hover:bg-[#CABAD7]"> 
//         <svg className="w-5 h-5 text-gray-500 group-hover:[#4F364B]" />
//         </CarouselPrevious>
//         <CarouselNext className="right-4 group text-white bg-[#4F364B] hover:bg-[#CABAD7]">
//         <svg className="w-5 h-5 text-gray-500 group-hover:[#4F364B]" />
//         </CarouselNext>
//       </Carousel>
//     </div>
//   )
// }

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
  otherUser: {
        id: number;
        photoURL: string;
        Hobbies: string,
        isStudent: boolean,
        Name: string;
        Values: [string];
        isMentor: boolean;
        LinkedIn: string;
      };
}

type ReccomendedMentors = {
  scoredUsers:[Mentor];
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
  const hobbiesArray = user.otherUser.Hobbies.split(",")
    .map((hobby) => hobby.trim())
    .filter((hobby) => hobby.length > 0)

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="text-center pb-4">
        <a
          href={user.otherUser.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {user.otherUser.Name}
          <ExternalLink className="h-4 w-4" />
        </a>
        <div className="text-sm text-muted-foreground font-medium">
          {user.otherUser.isStudent ? "Student" : user.otherUser.isMentor ? "Mentor" : "User"}
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
            {user.otherUser.Values.map((value, index) => (
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
    
  const res = await fetch(`http://localhost:3000/api/getRecommended?USER_ID=${userId}`);
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
            data.scoredUsers.map((mentor) => (
              <CarouselItem key={mentor.otherUser.id} className="md:basis-2/3 lg:basis-1/2">
                <div className="p-2 h-full">
                  <MentorCard key={mentor.otherUser.id} user={mentor} />
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
"use client"

import { useEffect, useState } from "react";

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Home } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { NavigationBar } from "@/components/app-navbar"
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../backend/firebaseConfig";


// Sample data for recommended mentors




export default function Recommended() {
  const [likedMentors, setLikedMentors] = useState<number[]>([])
  const [recommendedMentors, setRecommendedMentors] = useState<MentorCard[]>([]);

  type ScoredUserEntry = {
    otherUser: {
      ID: number;
      Name: string;
      Hobbies: string;
      Values: string[];
      isStudent: boolean;
      LinkedIn: string;
      photoURL: string;
    };
    score: number | null;
  };

  type MentorCard = {
    ID: number;
    Name: string;
    Hobbies: string;
    Values: string[];
    isStudent: boolean;
    LinkedIn: string;
    photoURL: string;
  };

  useEffect(() => {
    const fetchRecommendedMentors = async () => {
      try {
        const USER_UID = localStorage.getItem('USER_UID')?.toString();
        if (!USER_UID) {
          console.error("USER_UID not found in localStorage");
          return;
        }
        
        const userRef = doc(db, "idMap", USER_UID);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        const userId = userData?.userId.toString();
        console.log(userId);
        console.log("heeeyyy");
        
        const response = await fetch(`/api/getRecommended?USER_ID=${encodeURIComponent(userId)}`);
        const json = await response.json();

        const formatted: MentorCard[] = (json.scoredUsers as ScoredUserEntry[]).map((entry, index) => {
          const user = entry.otherUser;
        
          return {
            ID: user.ID,
            Name: user.Name,
            Hobbies: user.Hobbies,
            Values: user.Values,
            isStudent: user.isStudent,
            LinkedIn: user.LinkedIn,
            photoURL: user.photoURL,
          };
        });


        setRecommendedMentors(formatted); // ensure `data` is an array
        console.log(formatted);
      } catch (error) {
        console.error("Failed to fetch recommended mentors:", error);
      }
    };
  
    fetchRecommendedMentors();
  }, []);
  

  const toggleLike = (id: number) => {
    setLikedMentors((prev) => (prev.includes(id) ? prev.filter((mentorId) => mentorId !== id) : [...prev, id]))
  }

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center">
      <NavigationBar/>
        <h1 className="text-3xl font-bold mb-8">Reccomended Mentors</h1>
          <Carousel className="w-full">
            <CarouselContent>
            {
              recommendedMentors.map((mentor) => (
                <CarouselItem key={mentor.ID} className="md:basis-2/3 lg:basis-1/2">
                  <div className="p-2 h-full">
                    <Card className="h-full relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => toggleLike(mentor.ID)}
                        aria-label={likedMentors.includes(mentor.ID) ? "Unlike mentor" : "Like mentor"}
                      >
                    <Heart
                      className={
                        likedMentors.includes(mentor.ID) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }
                      size={20}
                    />
                    </Button>
                        <CardHeader>
                          <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-2">
                            {mentor.match}
                          </div>
                          <CardTitle>{mentor.title}</CardTitle>
                          <CardDescription>{mentor.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                            <span className="text-muted-foreground">Mentor Profile</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start">
                          <p className="text-sm text-muted-foreground mb-2">{mentor.footer}</p>
                          <Button size="sm">Request Mentorship</Button>
                        </CardFooter>
                      </Card>
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
      )
    }
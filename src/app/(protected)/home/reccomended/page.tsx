"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Home } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { NavigationBar } from "@/components/app-navbar"

// Sample data for recommended mentors
const recommendedMentors = [
  {
    id: 101,
    title: "Dr. Sarah Johnson",
    description: "AI Research Specialist with 10+ years experience at Google Brain.",
    footer: "Specializes in: Machine Learning, Neural Networks",
    match: "98% match to your interests",
  },
  {
    id: 102,
    title: "Prof. Michael Chen",
    description: "Stanford Professor of Computer Science and bestselling author.",
    footer: "Specializes in: Algorithms, Data Structures",
    match: "95% match to your interests",
  },
  {
    id: 103,
    title: "Emma Rodriguez",
    description: "Senior Software Architect at Amazon with expertise in cloud systems.",
    footer: "Specializes in: AWS, System Design",
    match: "92% match to your interests",
  },
  {
    id: 104,
    title: "Dr. James Wilson",
    description: "Former CTO of a Fortune 500 company and tech startup advisor.",
    footer: "Specializes in: Leadership, Entrepreneurship",
    match: "90% match to your interests",
  },
  {
    id: 105,
    title: "Olivia Thompson",
    description: "Full-stack developer and open source contributor with 500+ PRs.",
    footer: "Specializes in: React, Node.js, TypeScript",
    match: "88% match to your interests",
  },
]

export default function Recommended() {
  const [likedMentors, setLikedMentors] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedMentors((prev) => (prev.includes(id) ? prev.filter((mentorId) => mentorId !== id) : [...prev, id]))
  }

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center">
      <NavigationBar/>
      <h1 className="text-3xl font-bold mb-8">Reccomended Mentors</h1>
    
      <Carousel className="w-full max-w-5xl">
        <CarouselContent>
          {
            recommendedMentors.map((mentor) => (
              <CarouselItem key={mentor.id} className="md:basis-2/3 lg:basis-1/2">
                <div className="p-2 h-full">
                  <Card className="h-full relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => toggleLike(mentor.id)}
                      aria-label={likedMentors.includes(mentor.id) ? "Unlike mentor" : "Like mentor"}
                    >
                      <Heart
                        className={
                          likedMentors.includes(mentor.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
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
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
  //   <div className="container mx-auto py-10 px-4 flex flex-col items-center">
  //       <NavigationBar/>
  //       <h1 className="text-3xl font-bold mb-8">Reccomended Mentors</h1>

  //     <p className="text-muted-foreground mb-8">
  //       Based on your profile and interests, we've selected these top mentors for you.
  //     </p>

  //     <div className="flex-1 flex items-center justify-center">
  //       <Carousel className="w-full max-w-5xl">
  //         <CarouselContent>
  //           {recommendedMentors.map((mentor) => (
  //             <CarouselItem key={mentor.id} className="md:basis-2/3 lg:basis-1/2">
  //               <div className="p-2 h-full">
  //                 <Card className="h-full relative">
  //                   <Button
  //                     variant="ghost"
  //                     size="icon"
  //                     className="absolute top-2 right-2 z-10"
  //                     onClick={() => toggleLike(mentor.id)}
  //                     aria-label={likedMentors.includes(mentor.id) ? "Unlike mentor" : "Like mentor"}
  //                   >
  //                     <Heart
  //                       className={
  //                         likedMentors.includes(mentor.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
  //                       }
  //                       size={20}
  //                     />
  //                   </Button>
  //                   <CardHeader>
  //                     <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit mb-2">
  //                       {mentor.match}
  //                     </div>
  //                     <CardTitle>{mentor.title}</CardTitle>
  //                     <CardDescription>{mentor.description}</CardDescription>
  //                   </CardHeader>
  //                   <CardContent>
  //                     <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
  //                       <span className="text-muted-foreground">Mentor Profile</span>
  //                     </div>
  //                   </CardContent>
  //                   <CardFooter className="flex flex-col items-start">
  //                     <p className="text-sm text-muted-foreground mb-2">{mentor.footer}</p>
  //                     <Button size="sm">Request Mentorship</Button>
  //                   </CardFooter>
  //                 </Card>
  //               </div>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>
  //         <CarouselPrevious className="left-2" />
  //         <CarouselNext className="right-2" />
  //       </Carousel>
  //     </div>
  //   </div>
  // )
}

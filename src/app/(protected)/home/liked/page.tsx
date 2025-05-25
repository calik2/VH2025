'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Heart } from "lucide-react"
import { NavigationBar } from "@/components/app-navbar";

// Sample data - this could come from an API, database, etc.
const items = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization.",
    footer: "Last updated: 2 days ago",
  },
  {
    id: 2,
    title: "Task Management",
    description: "Organize and track your tasks with our intuitive management system.",
    footer: "Last updated: 5 days ago",
  },
  {
    id: 3,
    title: "User Profiles",
    description: "Detailed user profiles with customizable settings and preferences.",
    footer: "Last updated: 1 week ago",
  },
  {
    id: 4,
    title: "Content Library",
    description: "Access our extensive library of resources and materials.",
    footer: "Last updated: 3 days ago",
  },
  {
    id: 5,
    title: "Messaging Platform",
    description: "Connect with team members through our secure messaging platform.",
    footer: "Last updated: 1 day ago",
  },
  {
    id: 6,
    title: "Calendar Events",
    description: "Schedule and manage your events with our interactive calendar.",
    footer: "Last updated: 4 days ago",
  },
  {
    id: 7,
    title: "File Storage",
    description: "Securely store and organize your files in our cloud-based system.",
    footer: "Last updated: 6 days ago",
  },
  {
    id: 8,
    title: "Reporting Tools",
    description: "Generate comprehensive reports with our customizable tools.",
    footer: "Last updated: 2 weeks ago",
  },
  {
    id: 9,
    title: "API Integration",
    description: "Seamlessly integrate with third-party services through our API.",
    footer: "Last updated: 3 weeks ago",
  },
]

export default function Liked() {
    const toggleLike = (id: number) => {
        // TODO: REPLACE WITH API FUNCTION
    }

    const [likedMentors, setLikedMentors] = useState<number[]>([])

    return (
        <div className="container mx-auto py-10 px-4 flex flex-col items-center">
        <NavigationBar/>
        <h1 className="text-3xl font-bold mb-8">Liked Mentors</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <Card key={item.id} className="h-full relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => toggleLike(item.id)}
                    aria-label={likedMentors.includes(item.id) ? "Unlike mentor" : "Like mentor"}
                >
                    <Heart
                    className={likedMentors.includes(item.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
                    size={20}
                    />
                </Button>
                <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Content Area</span>
                    </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">{item.footer}</CardFooter>
                </Card>
            //   <Card key={item.id} className="h-full">
            //     <CardHeader>
            //       <CardTitle>{item.title}</CardTitle>
            //       <CardDescription>{item.description}</CardDescription>
            //     </CardHeader>
            //     <CardContent>
            //       <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
            //         <span className="text-muted-foreground">Content Area</span>
            //       </div>
            //     </CardContent>
            //     <CardFooter className="text-sm text-muted-foreground">{item.footer}</CardFooter>
            //   </Card>
            ))}
        </div>
        </div>
    )
}


// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Heart } from "lucide-react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// // Sample data - this could come from an API, database, etc.
// const initialItems = [
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

// export default function Home() {
//   const [likedMentors, setLikedMentors] = useState<number[]>([])
//   const [activeTab, setActiveTab] = useState("all")

//   const toggleLike = (id: number) => {
//     setLikedMentors((prev) => (prev.includes(id) ? prev.filter((mentorId) => mentorId !== id) : [...prev, id]))
//   }

//   const displayItems =
//     activeTab === "liked" ? initialItems.filter((item) => likedMentors.includes(item.id)) : initialItems

//   return (
//     <main className="container mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-8">Mentor Information Grid</h1>

//       <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
//         <TabsList>
//           <TabsTrigger value="all">All Mentors</TabsTrigger>
//           <TabsTrigger value="liked">Liked Mentors</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all">
//           <p className="text-muted-foreground mb-4">Showing all available mentors. Click the heart to like a mentor.</p>
//         </TabsContent>
//         <TabsContent value="liked">
//           <p className="text-muted-foreground mb-4">Showing only liked mentors. Click the heart to unlike a mentor.</p>
//         </TabsContent>
//       </Tabs>

//       {activeTab === "liked" && likedMentors.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-xl">You haven't liked any mentors yet.</p>
//           <p className="text-muted-foreground mt-2">Go to the All Mentors tab to like some mentors.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {displayItems.map((item) => (
//             <Card key={item.id} className="h-full relative">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-2 right-2 z-10"
//                 onClick={() => toggleLike(item.id)}
//                 aria-label={likedMentors.includes(item.id) ? "Unlike mentor" : "Like mentor"}
//               >
//                 <Heart
//                   className={likedMentors.includes(item.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}
//                   size={20}
//                 />
//               </Button>
//               <CardHeader>
//                 <CardTitle>{item.title}</CardTitle>
//                 <CardDescription>{item.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
//                   <span className="text-muted-foreground">Content Area</span>
//                 </div>
//               </CardContent>
//               <CardFooter className="text-sm text-muted-foreground">{item.footer}</CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </main>
//   )
// }


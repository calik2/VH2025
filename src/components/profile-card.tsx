"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Linkedin } from "lucide-react"
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebaseConfig";

interface ProfileData {
  name: string
  linkedin: string
  avatar: string
  hobbies: string
  liked: string[]         // your “Liked” array
  values: string[]        // your “Values” array
  pref1: number           // adviceType
  pref2: number           // engagement
  isMentor: boolean
  isStudent: boolean
}

export default function ProfileCard() {


  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const storedUid = typeof window !== "undefined"
  //   ? localStorage.getItem("USER_UID")
  //   : null
  // const USER_ID = "4"  // or pull from props / context

  useEffect(() => {
    async function fetchProfile() {
      try {
        const USER_UID = localStorage.getItem('USER_UID')?.toString();
        if (!USER_UID) {
          console.error("USER_UID not found in localStorage");
          return;
        }
        
        const userRef = doc(db, "idMap", USER_UID);
        const userSnapshot = await getDoc(userRef);
        const userData1 = userSnapshot.data();
        const userId = userData1?.userId.toString();

        const res = await fetch(`/api/getUserData?USER_ID=${encodeURIComponent(userId)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const { userData } = await res.json()
        // console.log("🔥 userData from API:", userData)

        const {
          Name,
          LinkedIn,
          Hobbies,
          Liked,
          Values,
          Preferences,
          isMentor,
          isStudent,
          photoURL
        } = userData

        const valuesArr = Array.isArray(Values) ? Values : []

        console.log("raw Values from API:", Values)
        // adapt these fields to match what you're storing
        // after you get `userData` from the API…
        setProfile({
          name:        Name,
          linkedin:    LinkedIn,
          hobbies:     Hobbies || [],        // if that’s a string, rename your JSX too
          liked:       Liked  || [],
          values:      valuesArr,
          pref1:       Preferences.adviceType,
          pref2:       Preferences.engagement,
          isMentor:    isMentor,
          isStudent:   isStudent,
          avatar:      photoURL || "",
        })

      } catch (err: any) {
        console.error(err)
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <div className="p-4 text-center">Loading…</div>
  if (error)   return <div className="p-4 text-center text-red-600">Error: {error}</div>
  if (!profile) return null

  const getInitials = (name?: string) => {
    if (!name) return ""
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  const hobbyList = profile.hobbies
          .split(",")           // split on commas
          .map(h => h.trim())   // trim extra whitespace
          .filter(Boolean)

  const roleLabel = profile.isMentor ? "Mentor" : "Mentee";

  return (
    <div className="container justify-center mx-auto px-10 py-10 px-4 flex items-center">
    <Card className="justify-center w-full items-center">
      <CardHeader className="flex flex-col items-center space-y-4 pb-6">
        <Avatar className="h-56 w-56">
          <AvatarImage src={profile.avatar || "/file.svg"} alt="Profile" />
          <AvatarFallback className="text-3xl">{getInitials(profile.name)}</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground text-lg">{roleLabel}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* LinkedIn */}
        <div className="px-20 justify-center">
          <Label className="text-sm font-medium flex items-center mb-2">
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Label>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {profile.linkedin}
          </a>
        </div>

        <Separator />

        {/* Hobbies/Intersts */}
        <div className="px-20">
    <Label className="text-sm font-medium mb-3 block">
      Hobbies/Interests
    </Label>
    <div className="flex flex-wrap gap-2">
      {hobbyList.map((hobby, idx) => (
        <Badge key={idx} variant="secondary" className="text-sm text-white bg-[#4F364B]">
          {hobby}
        </Badge>
      ))}
</div>
        </div>
        <div className="">
        {/* <pre className="p-2 bg-gray-100">{JSON.stringify(profile.values)}</pre> */}

        <Label className="px-20 text-sm font-medium mb-3 block">Values</Label>
        <div className="px-20 flex flex-wrap justify-left gap-2">
          {profile.values && profile.values.length > 0 ? (
            profile.values.map((value, i) => (
              <Badge key={i} className="text-sm border bg-[#47564F]">
                {value}
              </Badge>
            ))
          ) : (
            <p className="text-muted-foreground">No values found</p>
          )}
</div>
        {/* <Label className="text-sm font-medium mb-3 block">Values</Label>
        <div className="flex flex-wrap gap-2">
          {profile.values?.map((value, i) => (
            <Badge key={i} variant="secondary" className="text-sm">
              {value}
            </Badge>
          ))}
        </div> */}
        </div>

        <Separator />

        {/* Preferences */}
        <div className="px-20 justify-center">
          <Label className="text-sm font-medium mb-2 block">
            How important you view sharing values:
          </Label>
          <div className="flex items-center text-sm">
            <span className="text-black">Don't Care!</span>
            <div className="flex-1 mx-4">
              <Slider min={0} max={5} step={1} value={[profile.pref1]} disabled /> {/* INSERT VALUE HERE */}
            </div>
            <span className="text-black">Important</span>
          </div>
        </div>
        <div className="px-20 justify-center">
          <Label className="text-sm font-medium mb-2 block">
            The kind of advice you are hoping to exchange:
          </Label>
          <div className="flex items-center text-sm">
            <span className="text-black mx-3.5">Career</span>
            <div className="flex-1 mx-4">
              <Slider min={0} max={5} step={1} value={[profile.pref2]} disabled /> {/* INSERT VALUE HERE */}
            </div>
            <span className="text-black mx-3">Social</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
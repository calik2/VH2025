"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Linkedin } from "lucide-react"

interface ProfileData {
  name: string
  avatar: string
  linkedin: string
  interests: string[]
  values: string[]
}

export default function ProfileCard() { // NEED TO REPLACE WITH DATA RETRIEVED FROM DATABASE
  const profile: ProfileData = {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=200&width=200",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    interests: ["React", "TypeScript", "Design Systems", "Photography"],
    values: ["Growth", "Recognition", "Challenge"],
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container justify-center mx-auto px-10 py-10 px-4 flex items-center">
    <Card className="justify-center w-full items-center">
      <CardHeader className="flex flex-col items-center space-y-4 pb-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback className="text-3xl">{getInitials(profile.name)}</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-muted-foreground text-lg">Software Developer</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* LinkedIn */}
        <div>
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

        {/* Interests */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Interests</Label>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-3 block">Values</Label>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((values, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {values}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Preferences */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            How important you view sharing values:
          </Label>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Don't Care!</span>
            <div className="flex-1 mx-4">
              <Slider min={0} max={5} step={1} value={[3]} disabled /> {/* INSERT VALUE HERE */}
            </div>
            <span className="text-muted-foreground">Important</span>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">
            The kind of advice you are hoping to exchange:
          </Label>
          <div className="flex items-center text-sm">
            <span className="text-muted-foreground">Career</span>
            <div className="flex-1 mx-4">
              <Slider min={0} max={5} step={1} value={[3]} disabled /> {/* INSERT VALUE HERE */}
            </div>
            <span className="text-muted-foreground">Social</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}

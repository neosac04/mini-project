"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, BookOpen, FileText } from "lucide-react"

export function RoadmapVisualization() {
  const router = useRouter()
  const [activePoint, setActivePoint] = useState<string | null>(null)

  const handlePointClick = (point: string) => {
    setActivePoint(point)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative h-[600px] w-full">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/road-map-vv9hXxsO9vNe2RXeunSrmE0GpR2Aeu.png"
          alt="Educational Roadmap"
          fill
          style={{ objectFit: "contain" }}
        />

        {/* College Recommendation Point (Red) */}
        <div
          className={`absolute top-[25%] left-[15%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${activePoint === "college" ? "scale-110" : ""}`}
          onClick={() => handlePointClick("college")}
        >
          <div className="relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40">
              {activePoint === "college" && (
                <Card className="animate-fade-in">
                  <CardContent className="p-3">
                    <Button size="sm" className="w-full" onClick={() => handleNavigate("/dashboard/colleges")}>
                      <GraduationCap className="mr-2 h-4 w-4" />
                      College Recommendations
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={24} />
            </div>
          </div>
        </div>

        {/* Course Suggestions Point (Green) */}
        <div
          className={`absolute top-[25%] right-[15%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${activePoint === "course" ? "scale-110" : ""}`}
          onClick={() => handlePointClick("course")}
        >
          <div className="relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40">
              {activePoint === "course" && (
                <Card className="animate-fade-in">
                  <CardContent className="p-3">
                    <Button size="sm" className="w-full" onClick={() => handleNavigate("/dashboard/courses")}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Course Suggestions
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg">
              <BookOpen size={24} />
            </div>
          </div>
        </div>

        {/* Resume Builder Point (Blue) */}
        <div
          className={`absolute bottom-[25%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${activePoint === "resume" ? "scale-110" : ""}`}
          onClick={() => handlePointClick("resume")}
        >
          <div className="relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-40">
              {activePoint === "resume" && (
                <Card className="animate-fade-in">
                  <CardContent className="p-3">
                    <Button size="sm" className="w-full" onClick={() => handleNavigate("/dashboard/resume")}>
                      <FileText className="mr-2 h-4 w-4" />
                      Resume Builder
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
              <FileText size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-2">Your Educational Pathway</h2>
        <p className="text-muted-foreground">Click on each point to explore your personalized recommendations</p>
      </div>
    </div>
  )
}

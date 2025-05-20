import { RoadmapVisualization } from "@/components/roadmap/roadmap-visualization"

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Educational Roadmap</h1>
      <RoadmapVisualization />
    </div>
  )
}

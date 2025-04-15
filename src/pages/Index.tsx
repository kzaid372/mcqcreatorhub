
import { useState } from "react"
import { InputSection } from "@/components/InputSection"
import { OutputSection } from "@/components/OutputSection"
import { ActionButton } from "@/components/ActionButton"

const Index = () => {
  const [context, setContext] = useState("")
  const [generatedJson, setGeneratedJson] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Temporary mock generation for frontend demo
  const generateQuestions = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockJson = JSON.stringify({
        questions: [
          {
            question: "What is the main topic of the given context?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: "Option A"
          },
          {
            question: "Which key concept is mentioned in the text?",
            options: ["Concept 1", "Concept 2", "Concept 3", "Concept 4"],
            correctAnswer: "Concept 2"
          }
        ]
      }, null, 2)
      setGeneratedJson(mockJson)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            MCQ Question Generator
          </h1>
          <p className="text-gray-600">
            Upload a document or enter text to generate multiple choice questions
          </p>
        </div>

        <InputSection value={context} onChange={setContext} />

        <div className="flex justify-center">
          <ActionButton
            onClick={generateQuestions}
            isLoading={isLoading}
            disabled={!context.trim()}
          />
        </div>

        <OutputSection jsonData={generatedJson} />
      </div>
    </div>
  )
}

export default Index

import { useState } from "react"
import { InputSection } from "@/components/InputSection"
import { OutputSection } from "@/components/OutputSection"
import { ActionButton } from "@/components/ActionButton"
import { SettingsForm } from "@/components/SettingsForm"
import { useToast } from "@/hooks/use-toast"

const BASE_URL = "http://localhost:8000";

const Index = () => {
  const [context, setContext] = useState("")
  const [generatedJson, setGeneratedJson] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()
  
  // Settings state aligned with API parameters
  const [numQuestions, setNumQuestions] = useState(5)
  const [difficulty, setDifficulty] = useState("medium")
  const [topics, setTopics] = useState("science,space")
  const [questionTypes, setQuestionTypes] = useState("multiple_choice")
  const [useLLM, setUseLLM] = useState(true)

  // Function to handle document upload
  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file)
  }

  // Generate questions from API
  const generateQuestions = async () => {
    setIsLoading(true)
    
    try {
      let response;
      
      if (uploadedFile) {
        // File upload approach
        const formData = new FormData();
        formData.append('document', uploadedFile);
        formData.append('numQuestions', numQuestions.toString());
        formData.append('difficulty', difficulty);
        formData.append('topics', topics);
        formData.append('questionTypes', questionTypes);
        formData.append('useLLM', useLLM.toString());
        
        response = await fetch(`${BASE_URL}/api/generate-mcqs`, {
          method: 'POST',
          body: formData
        });
      } else if (context.trim()) {
        // Text input approach
        response = await fetch(`${BASE_URL}/api/generate-mcqs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            context,
            numQuestions,
            difficulty,
            topics,
            questionTypes,
            useLLM
          })
        });
      } else {
        toast({
          title: "Error",
          description: "Please provide either text or upload a document",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedJson(JSON.stringify(data, null, 2));
      
      toast({
        title: "Success!",
        description: `Generated ${numQuestions} questions based on your input`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

        <div className="grid gap-8 md:grid-cols-2">
          <InputSection 
            value={context} 
            onChange={setContext} 
            onFileUpload={handleFileUpload}
          />
          <SettingsForm
            numQuestions={numQuestions}
            setNumQuestions={setNumQuestions}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            topics={topics}
            setTopics={setTopics}
            questionTypes={questionTypes}
            setQuestionTypes={setQuestionTypes}
            useLLM={useLLM}
            setUseLLM={setUseLLM}
          />
        </div>

        <div className="flex justify-center">
          <ActionButton
            onClick={generateQuestions}
            isLoading={isLoading}
            disabled={(!context.trim() && !uploadedFile)}
          />
        </div>

        <OutputSection jsonData={generatedJson} />
      </div>
    </div>
  )
}

export default Index

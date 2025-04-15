
import { useState } from "react"
import { InputSection } from "@/components/InputSection"
import { OutputSection } from "@/components/OutputSection"
import { ActionButton } from "@/components/ActionButton"
import { SettingsForm } from "@/components/SettingsForm"
import { useToast } from "@/hooks/use-toast"

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
      const baseUrl = "http://localhost:8000"; // This should be configured for your environment
      
      // Different request handling for text input vs file upload
      if (uploadedFile) {
        // File upload approach
        const formData = new FormData();
        formData.append('document', uploadedFile);
        formData.append('numQuestions', numQuestions.toString());
        formData.append('difficulty', difficulty);
        formData.append('topics', topics);
        formData.append('questionTypes', questionTypes);
        formData.append('useLLM', useLLM.toString());
        
        // Mock API call for now - would be replaced with actual fetch
        setTimeout(() => {
          mockResponse();
        }, 1500);
        
        // Actual API call would be:
        // response = await fetch(`${baseUrl}/api/generate-mcqs`, {
        //   method: 'POST',
        //   body: formData
        // });
      } else if (context.trim()) {
        // Text input approach
        const payload = {
          context,
          numQuestions,
          difficulty,
          topics,
          questionTypes,
          useLLM
        };
        
        // Mock API call for now - would be replaced with actual fetch
        setTimeout(() => {
          mockResponse();
        }, 1500);
        
        // Actual API call would be:
        // response = await fetch(`${baseUrl}/api/generate-mcqs`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(payload)
        // });
      } else {
        toast({
          title: "Error",
          description: "Please provide either text or upload a document",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Handle successful response from API
      // const data = await response.json();
      // setGeneratedJson(JSON.stringify(data, null, 2));
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }
  
  // Mock response function - would be replaced with actual API calls
  const mockResponse = () => {
    const mockJson = JSON.stringify({
      metadata: {
        numQuestions,
        difficulty,
        topics: topics.split(",").map(t => t.trim()),
        questionTypes: questionTypes.split(",").map(t => t.trim()),
        useLLM
      },
      questions: [
        {
          id: "q1",
          question: "Which planet is known as the Red Planet?",
          type: "multiple_choice",
          options: ["Earth", "Mars", "Venus", "Jupiter"],
          correctAnswer: "Mars",
          difficulty: "easy",
          topic: "space"
        },
        {
          id: "q2",
          question: "The solar system has eight planets.",
          type: "true_false",
          correctAnswer: true,
          difficulty: "easy",
          topic: "space"
        },
        {
          id: "q3",
          question: "The four inner planets are relatively small and ______.",
          type: "fill_in_blank",
          correctAnswer: "rocky",
          difficulty: "medium",
          topic: "space"
        },
        {
          id: "q4",
          question: "Which planet is the only one known to support life?",
          type: "multiple_choice",
          options: ["Mars", "Venus", "Earth", "Jupiter"],
          correctAnswer: "Earth",
          difficulty: "easy",
          topic: "space"
        },
        {
          id: "q5",
          question: "What is the central body in our solar system?",
          type: "multiple_choice",
          options: ["Earth", "Moon", "Sun", "Milky Way"],
          correctAnswer: "Sun",
          difficulty: "easy",
          topic: "space"
        }
      ]
    }, null, 2);
    
    setGeneratedJson(mockJson);
    setIsLoading(false);
    
    toast({
      title: "Success!",
      description: "Generated 5 questions based on your input",
    });
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

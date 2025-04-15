
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface SettingsFormProps {
  numQuestions: number
  setNumQuestions: (value: number) => void
  difficulty: string
  setDifficulty: (value: string) => void
  topics: string
  setTopics: (value: string) => void
  questionTypes: string
  setQuestionTypes: (value: string) => void
  useLLM: boolean
  setUseLLM: (value: boolean) => void
}

export const SettingsForm = ({
  numQuestions,
  setNumQuestions,
  difficulty,
  setDifficulty,
  topics,
  setTopics,
  questionTypes,
  setQuestionTypes,
  useLLM,
  setUseLLM,
}: SettingsFormProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Generation Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="num-questions">Number of Questions</Label>
          <Input
            id="num-questions"
            type="number"
            min="1"
            max="50"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topics">Topics (comma-separated)</Label>
          <Input
            id="topics"
            placeholder="math, science, history"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question-types">Question Types (comma-separated)</Label>
          <Input
            id="question-types"
            placeholder="multiple-choice, true-false"
            value={questionTypes}
            onChange={(e) => setQuestionTypes(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="use-llm"
            checked={useLLM}
            onCheckedChange={setUseLLM}
          />
          <Label htmlFor="use-llm">Use LLM for generation</Label>
        </div>
      </CardContent>
    </Card>
  )
}

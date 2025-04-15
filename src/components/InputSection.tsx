
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InputSectionProps {
  value: string
  onChange: (value: string) => void
}

export const InputSection = ({ value, onChange }: InputSectionProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Input Context
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your context or document text here..."
          className="min-h-[200px] p-4"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  )
}

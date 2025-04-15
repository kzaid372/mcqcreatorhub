
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUp } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface InputSectionProps {
  value: string
  onChange: (value: string) => void
}

export const InputSection = ({ value, onChange }: InputSectionProps) => {
  const [fileName, setFileName] = useState<string>("")
  const { toast } = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    try {
      const text = await file.text()
      onChange(text)
      setFileName(file.name)
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been loaded`,
      })
    } catch (error) {
      toast({
        title: "Error reading file",
        description: "Please try again with a different file",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Input Context
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
            <FileUp className="h-4 w-4" />
            Upload Document
          </Label>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".txt,.doc,.docx,.pdf"
            onChange={handleFileUpload}
          />
          {fileName && (
            <p className="text-sm text-muted-foreground">
              Uploaded: {fileName}
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label>Or Enter Text Directly</Label>
          <Textarea
            placeholder="Enter your context or document text here..."
            className="min-h-[200px] p-4"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  )
}

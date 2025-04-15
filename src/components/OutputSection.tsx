
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OutputSectionProps {
  jsonData: string
}

export const OutputSection = ({ jsonData }: OutputSectionProps) => {
  const { toast } = useToast()

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonData)
      toast({
        title: "Copied!",
        description: "JSON has been copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Generated MCQ Questions (JSON)
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8"
          disabled={!jsonData}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[400px] text-sm">
          {jsonData || "Generated questions will appear here..."}
        </pre>
      </CardContent>
    </Card>
  )
}

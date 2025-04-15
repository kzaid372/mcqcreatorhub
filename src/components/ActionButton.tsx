
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ActionButtonProps {
  onClick: () => void
  isLoading: boolean
  disabled: boolean
}

export const ActionButton = ({ onClick, isLoading, disabled }: ActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Generate MCQ Questions"
      )}
    </Button>
  )
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TextSummarization() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/summarize_text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setSummary(data.summary);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text Summarization</CardTitle>
        <CardDescription>
          Generate a concise summary of your text
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={10}
            className="mb-4"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Summarizing..." : "Summarize Text"}
          </Button>
        </form>
      </CardContent>
      {summary && (
        <CardFooter>
          <div>
            <h3 className="text-lg font-semibold mb-2">Summary:</h3>
            <p>{summary}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

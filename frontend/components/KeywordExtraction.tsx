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

export default function KeywordExtraction() {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/extract_keywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setKeywords(data.keywords);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Extraction</CardTitle>
        <CardDescription>Extract key words from your text</CardDescription>
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
            {isLoading ? "Extracting..." : "Extract Keywords"}
          </Button>
        </form>
      </CardContent>
      {keywords.length > 0 && (
        <CardFooter>
          <div>
            <h3 className="text-lg font-semibold mb-2">Extracted Keywords:</h3>
            <ul className="list-disc pl-5">
              {keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

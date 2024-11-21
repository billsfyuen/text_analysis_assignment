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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function KeywordExtraction() {
  const [text, setText] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [numKeywords, setNumKeywords] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setKeywords([]);

    if (text.trim() === "") {
      setError("Please enter some text before extracting keywords.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/extract_keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, num_keywords: numKeywords }),
      });

      if (!response.ok) {
        throw new Error("Failed to extract keywords. Please try again");
      }

      const data = await response.json();
      setKeywords(data.keywords);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
          <div className="mb-4">
            <Label htmlFor="num-keywords" className="mb-2 block">
              Number of Keywords
            </Label>
            <Select
              value={numKeywords.toString()}
              onValueChange={(value) => setNumKeywords(parseInt(value, 10))}
            >
              <SelectTrigger id="num-keywords" className="w-[180px]">
                <SelectValue placeholder="Select number of keywords" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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

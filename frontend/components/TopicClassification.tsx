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

export default function TopicClassification() {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/classify_topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setTopic(data.topic);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Classification</CardTitle>
        <CardDescription>Classify the topic of your text</CardDescription>
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
            {isLoading ? "Classifying..." : "Classify Topic"}
          </Button>
        </form>
      </CardContent>
      {topic && (
        <CardFooter>
          <div>
            <h3 className="text-lg font-semibold mb-2">Classified Topic:</h3>
            <p>{topic}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

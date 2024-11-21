import { useState, useEffect } from "react";
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

export default function TopicClassification() {
  const [text, setText] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [predefinedTopics, setPredefinedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_topics");

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();
        setPredefinedTopics(data.topics);
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };

    fetchTopics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTopic("");

    if (text.trim() === "") {
      setError("Please enter some text before classifying the topic.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/classify_topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to classify topic. Please try again");
      }

      const data = await response.json();
      setTopic(data.topic);
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
        <CardTitle>Topic Classification</CardTitle>
        <CardDescription>Classify the topic of your text</CardDescription>
      </CardHeader>
      <CardContent>
        {predefinedTopics.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Predefined Topics:</h3>
            <p className="text-sm text-muted-foreground">
              {predefinedTopics.join(", ")}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here..."
            rows={10}
            className="mb-4"
          />
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
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

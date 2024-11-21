"use client";

import { useState } from "react";
import KeywordExtraction from "@/components/KeywordExtraction";
import TextSummarization from "@/components/TextSummarization";
import TopicClassification from "@/components/TopicClassification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Task = "keyword" | "summary" | "topic" | null;

export default function Home() {
  const [selectedTask, setSelectedTask] = useState<Task>(null);

  const renderSelectedComponent = () => {
    switch (selectedTask) {
      case "keyword":
        return <KeywordExtraction />;
      case "summary":
        return <TextSummarization />;
      case "topic":
        return <TopicClassification />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            AI Text Analysis System
          </CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Choose a task to perform:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={() => setSelectedTask("keyword")}
              variant={selectedTask === "keyword" ? "default" : "outline"}
            >
              Keyword Extraction
            </Button>
            <Button
              onClick={() => setSelectedTask("summary")}
              variant={selectedTask === "summary" ? "default" : "outline"}
            >
              Text Summarization
            </Button>
            <Button
              onClick={() => setSelectedTask("topic")}
              variant={selectedTask === "topic" ? "default" : "outline"}
            >
              Topic Classification
            </Button>
          </div>
          {renderSelectedComponent()}
        </CardContent>
      </Card>
    </div>
  );
}

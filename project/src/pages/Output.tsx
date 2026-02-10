import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

interface OutputData {
  mode: "explain" | "summarize" | "quiz";
  topic: string;
  notes?: string;
}

interface OutputProps {
  data: OutputData;
  onNavigate: (page: "home" | "tools" | "input" | "output") => void;
}

export default function Output({ data }: OutputProps) {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/${data.mode}`,
         // ✅ FIXED
          {
            topic: data.topic,
            notes: data.notes || "",
          }
        );

        setResult(response.data.result);
      } catch (error) {
        console.error(error);
        setResult("Backend error. Is Flask running?");
      }
    };

    fetchData();
  }, [data.mode, data.topic, data.notes]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Result</h2>
      <pre className="whitespace-pre-wrap text-gray-300">{result}</pre>
    </div>
  );
}

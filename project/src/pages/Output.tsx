import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function Output({ data }: any) {
  const [result, setResult] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/${data.mode}`,
          {
            topic: data.topic,
            notes: data.notes || "",
          }
        );

        setResult(response.data.result);
      } catch (error) {
        console.error(error);
        setResult("Backend connection failed.");
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

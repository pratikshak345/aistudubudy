import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { FaCopy, FaDownload, FaRobot } from "react-icons/fa";
import { API_BASE_URL } from "../config";

interface OutputProps {
  data: {
    topic: string;
    notes: string;
    mode: string;
  };
  onNavigate: (page: string) => void;
}

export default function Output({ data }: OutputProps) {

  const [result, setResult] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchResult = async () => {

      try {

        let endpoint = "";

        if (data.mode === "explain") endpoint = "/api/explain";
        if (data.mode === "summarize") endpoint = "/api/summarize";
        if (data.mode === "quiz") endpoint = "/api/quiz";

        const res = await axios.post(
          `${API_BASE_URL}${endpoint}`,
          {
            topic: data.topic,
            notes: data.notes
          }
        );

        setResult(res.data.result);

      } catch (error) {

        setResult("Error generating result");

      } finally {

        setLoading(false);

      }

    };

    fetchResult();

  }, [data]);

  // ⭐ Typing Animation
  useEffect(() => {

    if (!result) return;

    let index = 0;

    const interval = setInterval(() => {

      setDisplayedText(result.slice(0, index));

      index++;

      if (index > result.length) clearInterval(interval);

    }, 10);

    return () => clearInterval(interval);

  }, [result]);

  // Copy Answer
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    alert("Answer copied!");
  };

  // Download PDF
  const downloadPDF = () => {

    const doc = new jsPDF();

    const lines = doc.splitTextToSize(result, 180);

    doc.text(lines, 10, 10);

    doc.save("AI_Study_Result.pdf");

  };

  return (

    <div className="min-h-screen text-white p-10">

      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <FaRobot />
        AI Generated Result
      </h1>

      {loading ? (

        <div className="flex items-center gap-3 text-blue-400">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
          <p>AI is thinking...</p>
        </div>

      ) : (

        <div className="bg-[#161B22] p-6 rounded-xl shadow-lg border border-gray-700">

          {/* Buttons */}
          <div className="flex gap-4 mb-6">

            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              <FaCopy />
              Copy
            </button>

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              <FaDownload />
              Download PDF
            </button>

          </div>

          {/* AI Result */}
          <div className="prose prose-invert max-w-none text-gray-200 leading-loose text-lg">

            <ReactMarkdown>
              {displayedText}
            </ReactMarkdown>

          </div>

        </div>

      )}

    </div>
  );
}
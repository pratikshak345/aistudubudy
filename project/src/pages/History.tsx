import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function History() {

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const res = await axios.get(`${API_BASE_URL}/api/history`);

        setHistory(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchHistory();

  }, []);

  return (

    <div className="min-h-screen text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        📚 AI Result History
      </h1>

      {history.length === 0 ? (

        <p className="text-gray-400">No history available</p>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {history.map((item, index) => (

            <div
              key={index}
              className="bg-[#161B22] p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all shadow-lg"
            >

              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                {item.topic}
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                Mode: {item.mode}
              </p>

              <p className="text-gray-300 text-sm leading-relaxed">
                {item.result.substring(0, 150)}...
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}
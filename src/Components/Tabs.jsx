// src/components/Tabs.jsx
import { useNavigate } from "react-router-dom";

export default function Tabs({ active = "create" }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-16 pt-2 shadow-sm border-b">
      <div className="flex gap-6 text-lg font-medium">
        <div
          className={`cursor-pointer pb-2 ${
            active === "create"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600"
          }`}
          onClick={() => navigate("/create-flashcard")}
        >
          Create Flashcard
        </div>

        <div
          className={`cursor-pointer pb-2 ${
            active === "my"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-600"
          }`}
          onClick={() => navigate("/my-flashcards")}
        >
          My Flashcard
        </div>
      </div>
    </div>
  );
}

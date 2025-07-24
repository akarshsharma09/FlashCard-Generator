import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyFlashcards() {
  const navigate = useNavigate();
  const flashcards = useSelector((state) => state.flashcards, shallowEqual);

  return (
    <div className="min-h-screen bg-slate-100 pb-6">
      <Navbar />
      <Tabs active="myflashcards" />

      <div className="max-w-6xl mx-auto mt-4 px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          My Flashcards
        </h1>

        {flashcards.length === 0 ? (
          <p className="text-center text-gray-600">No flashcards created yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {flashcards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition duration-300 flex flex-col items-center justify-between h-[250px]"
              >
                {/* Circle placeholder */}
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-gray-500 font-bold text-sm">
                    {card.groupName?.charAt(0) || "G"}
                  </span>
                </div>

                {/* Group Name */}
                <h2 className="text-md font-semibold text-center text-gray-800">
                  {card.groupName}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 text-center mt-1 line-clamp-2">
                  {card.flashcards?.[0]?.definition || "No description available."}
                </p>

                {/* Button */}
                <button
                  className="mt-auto text-red-600 border border-red-500 px-4 py-1 mb-6 rounded-full text-sm hover:bg-red-50 transition"
                  onClick={() => navigate(`/flashcard/${i}`)} // <-- FIXED HERE
                >
                  View Card
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

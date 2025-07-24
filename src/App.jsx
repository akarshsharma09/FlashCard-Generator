// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFlashcard from "./Pages/CreateFlashcard";
import MyFlashcards from "./Pages/MyFlashcards";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlashcardDetails from "./Pages/FlashcardDetails";
import Footer from "./Components/Footer";
// You can import more pages like MyFlashcards, FlashcardDetails when ready

function App() {
  return (
    <>
    
    <div className="w-screen min-h-screen overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<CreateFlashcard />} />
          <Route path="/create-flashcard" element={<CreateFlashcard />} />
          <Route path="/my-flashcards" element={<MyFlashcards />} />
          <Route path="/flashcard/:id" element={<FlashcardDetails />} />
        </Routes>

        <Footer />

      </Router>
    </div>
          <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      </>
      
  );
}

export default App;

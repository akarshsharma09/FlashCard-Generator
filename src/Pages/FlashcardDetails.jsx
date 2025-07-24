import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Tabs from "../Components/Tabs";
import { ArrowLeft, Share2, Download, Printer } from "react-feather";
import { useState, useRef } from "react";
import SharePopup from "../Components/SharePopup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FlashcardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const flashcards = useSelector((state) => state.flashcards);
  const card = flashcards?.[id];

  const [showSharePopup, setShowSharePopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Page 0 = group detail

  const printRef = useRef();

const handlePrint = () => {
  const content = printRef.current;
  const printContents = content.innerHTML;
  const win = window.open("", "", "height=700,width=900");
  win.document.write("<html><head><title>" + card.groupName + "</title>");
  win.document.write(
    "<style>body{font-family:sans-serif;padding:20px;}img{max-width:100%;height:auto;}</style>"
  );
  win.document.write("</head><body>");
  win.document.write(printContents);
  win.document.write("</body></html>");
  win.document.close();
  win.print();
};


 const handleDownload = async () => {
  const input = printRef.current;
  if (!input) return;

  const canvas = await html2canvas(input, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${card.groupName || "flashcard"}.pdf`);
};

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 text-red-600 text-lg">
        Flashcard not found.
        <button
          onClick={() => navigate("/my-flashcards")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const totalPages = card.flashcards.length + 1;

  const renderImage = (image) => {
    if (!image) return null;
    return (
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt="Flashcard"
        className="rounded shadow w-full max-h-[300px] object-contain"
      />
    );
  };

  const renderContent = () => {
    if (currentPage === 0) {
      // Group details page
      return (
        <>
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            {renderImage(card.image)}
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-4 text-sm text-gray-700 leading-relaxed">
            {card.description || "No group description provided."}
          </div>
        </>
      );
    } else {
      // Flashcard pages
      const term = card.flashcards[currentPage - 1];
      return (
        <>
          <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            {renderImage(term.image)}
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-4 text-sm text-gray-700 leading-relaxed">
            <h3 className="text-lg font-bold mb-2">{term.term}</h3>
            <p>{term.definition}</p>
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Tabs active="myflashcards" />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Back & Title */}
        <div className="flex items-center space-x-3 mb-6">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => navigate("/my-flashcards")}
          />
          <h1 className="text-xl font-semibold text-gray-800">
            {card.groupName}
          </h1>
        </div>

        {/* Subtitle (first page only) */}
        {currentPage === 0 && (
          <p className="text-xl text-gray-600 text-start mt-1 line-clamp-2 mb-4">
            <span>Here is the Group info with card details.</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-12 md:col-span-3 bg-white p-4 rounded shadow-sm">
            <h2 className="text-sm font-semibold text-gray-500 border-b pb-2 mb-2">
              Flashcards
            </h2>
            <p
              onClick={() => setCurrentPage(0)}
              className={`text-sm px-2 py-1 rounded cursor-pointer ${
                currentPage === 0
                  ? "text-red-600 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Group Info
            </p>
            {card.flashcards?.map((_, i) => (
              <p
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`text-sm px-2 py-1 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "text-red-600 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                Card {i + 1}
              </p>
            ))}
          </div>

          {/* Main Flashcard Content */}
          <div
            ref={printRef}
            className="col-span-12 md:col-span-9 bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row"
          >
            {renderContent()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-end space-x-4 mt-6">
          <button
            onClick={() => setShowSharePopup(true)}
            className="flex items-center px-4 py-2 bg-white rounded shadow border hover:bg-gray-100"
          >
            <Share2 size={16} className="mr-2" /> Share
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-white rounded shadow border hover:bg-gray-100"
          >
            <Download size={16} className="mr-2" /> Download
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-white rounded shadow border hover:bg-gray-100"
          >
            <Printer size={16} className="mr-2" /> Print
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-6">
          <button
            className="text-xl text-gray-400 hover:text-gray-600"
            onClick={() =>
              setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
            }
          >
            &lt;
          </button>
          <span className="text-sm text-gray-500">
            {currentPage + 1}/{totalPages}
          </span>
          <button
            className="text-xl text-gray-400 hover:text-gray-600"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages - 1 ? prev + 1 : prev
              )
            }
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Share Popup */}
      {showSharePopup && (
        <SharePopup onClose={() => setShowSharePopup(false)} />
      )}
    </div>
  );
}

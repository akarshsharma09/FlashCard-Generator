import { X, Copy } from "react-feather";
import { useState } from "react";
import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function SharePopup({ onClose }) {
  const [copied, setCopied] = useState(false);
  const shareLink = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800">Share Flashcard</h2>

        {/* Copy Link */}
        <div className="flex items-center border rounded overflow-hidden">
          <input
            type="text"
            readOnly
            value={shareLink}
            className="flex-grow px-3 py-2 text-sm text-gray-700 border-none focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm"
          >
            <Copy size={16} />
          </button>
        </div>

        {/* Copied Alert */}
        {copied && (
          <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>
        )}

        {/* Social Icons */}
        <div className="flex justify-between items-center mt-5 px-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-blue-600 w-6 h-6 hover:scale-110" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-blue-800 w-6 h-6 hover:scale-110" />
          </a>
          <a
            href={`https://wa.me/?text=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-green-600 w-6 h-6 hover:scale-110" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-sky-500 w-6 h-6 hover:scale-110" />
          </a>
          <a
            href={`mailto:?body=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdEmail className="text-red-500 w-6 h-6 hover:scale-110" />
          </a>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
 <footer className="py-6 bg-slate-100 text-gray-500 md:px-8 md:py-0 border-t border-slate-300">


      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <span className="text-sm">&copy; 2025 Akarsh Sharma</span>

        <div className="flex gap-4 ">
          <a
            href="https://akarshcodes.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition mr-5 "
          >
            <Globe size={20} />
            <span>Built by Akarsh.Codes</span>
          </a>

        </div>
      </div>
    </footer>
  );
}

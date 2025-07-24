// src/components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold flex items-center gap-2">
  <img
    src="/Screenshot (151).png"
    alt="Flashcard Icon"
    className="w-8 h-8 object-contain"
  />
  <span className="text-red-500">FlashCard</span> Generator
</div>
    </nav>
  );
}

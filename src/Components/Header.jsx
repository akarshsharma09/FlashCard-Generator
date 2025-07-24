import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="p-4">
      <Link to="/">
        <img
          src="/Screenshot (151).png"
          alt="Home Icon"
          className="h-10 w-10 cursor-pointer"
        />
      </Link>
    </header>
  );
}

export default Header;

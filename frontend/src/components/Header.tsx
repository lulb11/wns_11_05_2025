import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <h1>🌍 WWCountries</h1>
      <nav>
        <Link to="/" className="nav-link">Liste des pays</Link>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";
import { Country } from "../types";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="country-card">
      <div className="country-emoji">{country.emoji}</div>
      <div className="country-info">
        <h3>{country.name}</h3>
        <p className="country-code">{country.code}</p>
        {country.continent && (
          <p className="country-continent">{country.continent.name}</p>
        )}
      </div>
      <Link to={`/country/${country.code}`} className="country-link">
        Voir détails
      </Link>
    </div>
  );
}

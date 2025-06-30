import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../api/queries";

export function CountryDetailPage() {
  const { code } = useParams<{ code: string }>();
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <div className="loading">Chargement des détails...</div>;
  if (error) return <div className="error">Erreur: {error.message}</div>;
  if (!data?.country) return <div className="error">Pays non trouvé</div>;

  const country = data.country;

  return (
    <div className="country-detail-page">
      <div className="country-detail-card">
        <div className="country-header">
          <div className="country-emoji-large">{country.emoji}</div>
          <div className="country-title">
            <h1>{country.name}</h1>
            <p className="country-code-large">{country.code}</p>
          </div>
        </div>

        <div className="country-info-details">
          <div className="info-row">
            <span className="info-label">Nom:</span>
            <span className="info-value">{country.name}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Code:</span>
            <span className="info-value">{country.code}</span>
          </div>

          <div className="info-row">
            <span className="info-label">Emoji:</span>
            <span className="info-value">{country.emoji}</span>
          </div>

          {country.continent && (
            <div className="info-row">
              <span className="info-label">Continent:</span>
              <span className="info-value">{country.continent.name}</span>
            </div>
          )}
        </div>

        <div className="country-actions">
          <Link to="/" className="back-button">
            ← Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
}

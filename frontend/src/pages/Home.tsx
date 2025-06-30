import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../api/queries";
import { CountryCard } from "../components/CountryCard";
import { AddCountryForm } from "../components/AddCountryForm";

export function HomePage() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <div className="loading">Chargement des pays...</div>;
  if (error) return <div className="error">Erreur: {error.message}</div>;

  return (
    <div className="home-page">
      <div className="countries-section">
        <h1>Liste des pays</h1>
        <div className="countries-grid">
          {data?.countries?.map((country: any) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      </div>

      <div className="add-country-section">
        <AddCountryForm />
      </div>
    </div>
  );
}

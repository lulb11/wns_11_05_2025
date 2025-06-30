import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COUNTRY, GET_COUNTRIES, GET_CONTINENTS } from "../api/queries";
import { NewCountryInput } from "../types";

export function AddCountryForm() {
  const [formData, setFormData] = useState<NewCountryInput>({
    code: "",
    name: "",
    emoji: "",
  });
  const [error, setError] = useState<string>("");

  const { data: continentsData } = useQuery(GET_CONTINENTS);
  const [addCountry, { loading }] = useMutation(ADD_COUNTRY, {
    onCompleted: () => {
      setFormData({ code: "", name: "", emoji: "" });
      setError("");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code || !formData.name || !formData.emoji) {
      setError("Tous les champs sont requis");
      return;
    }

    try {
      await addCountry({
        variables: { data: formData },
        update: (cache, { data }) => {
          const existingCountries = cache.readQuery({ query: GET_COUNTRIES }) as { countries: any[] } | null;
          if (existingCountries && data?.addCountry) {
            cache.writeQuery({
              query: GET_COUNTRIES,
              data: {
                countries: [...existingCountries.countries, data.addCountry],
              },
            });
          }
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'continent' ? (value ? { id: parseInt(value) } : undefined) : value
    }));
  };

  return (
    <div className="add-country-form">
      <h2>Ajouter un nouveau pays</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="code">Code pays (2-3 caractères):</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            maxLength={3}
            placeholder="FRA"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nom du pays:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            placeholder="France"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emoji">Emoji:</label>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            maxLength={4}
            placeholder="🇫🇷"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="continent">Continent (optionnel):</label>
          <select
            id="continent"
            name="continent"
            value={formData.continent?.id || ""}
            onChange={handleChange}
          >
            <option value="">Sélectionner un continent</option>
            {continentsData?.continents?.map((continent: any) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le pays"}
        </button>
      </form>
    </div>
  );
}

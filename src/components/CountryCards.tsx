import * as React from "react";
import { formatNumber } from "../utils";

type CountryStatProps = {
  label: string;
  value: string;
};

const CountryStat: React.FC<CountryStatProps> = ({ label, value }) => {
  return (
    <div className="country-stat">
      <span className="label">{label}:</span>
      {value}
    </div>
  );
};

type CountryCardProps = {
  country: any;
};

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="country-card">
      <div className="country-flag">
        <img src={country.flags.svg} alt={`flag of ${country.name}`} />
      </div>
      <div className="country-info">
        <h2>{country.name}</h2>
        <CountryStat
          label="Population"
          value={formatNumber(country.population)}
        />
        <CountryStat label="Region" value={country.region} />
        <CountryStat label="Capital" value={country.capital} />
      </div>
    </div>
  );
};

type CountryCardsProps = {
  countries: any[];
};

const CountryCards: React.FC<CountryCardsProps> = ({ countries }) => {
  return (
    <div className="cards-container">
      {countries.map((c) => (
        <CountryCard country={c} key={c.name} />
      ))}
    </div>
  );
};

export default CountryCards;

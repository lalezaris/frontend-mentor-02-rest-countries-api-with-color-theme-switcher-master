import * as React from "react";

const CountryStat = ({ label, value }) => {
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
      <img
        className="country-flag"
        src={country.flags.svg}
        alt={`flag of ${country.name}`}
      />
      <div className="country-info">
        <h2>{country.name}</h2>
        <CountryStat label="Population" value={country.population} />
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

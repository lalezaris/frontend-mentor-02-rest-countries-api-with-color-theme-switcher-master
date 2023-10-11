import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import SearchAndFilter from "../components/SearchAndFilter";
import CountryCards from "../components/CountryCards";
import data from "../../data.json";
import { debounce } from "../utils";
import { Country } from "../types/country";

// https://restcountries.com/v2/all?fields=name,flags,population,region,capital

const IndexPage: React.FC<PageProps> = () => {
  const [countries, setCountries] = React.useState<Country[]>();
  const [regions, setRegions] = React.useState<(string | undefined)[]>([]);
  const [regionFilter, setRegionFilter] = React.useState<string>();

  React.useEffect(() => {
    fetch(
      "https://restcountries.com/v2/all?fields=name,flags,population,region,capital"
    )
      .then(
        (res) => res.json(),
        (err) => setCountries(data)
      )
      .then((body) => {
        if (body) {
          setCountries(body);
        } else {
          setCountries(data);
        }
      });
  }, []);

  React.useEffect(() => {
    if (!regions.length) {
      const regions = countries
        ?.map((country) => country.region)
        .filter((region, i, arr) => {
          return region && arr.indexOf(region) === i;
        });

      regions && setRegions(regions);
    }
  }, [countries]);

  let [error, setError] = React.useState<string>();

  const handleSearch = (value: string) => {
    let url =
      "https://restcountries.com/v2/all?fields=name,flags,population,region,capital";

    if (value)
      url = `https://restcountries.com/v2/name/${value}?fields=name,flags,population,region,capital`;

    fetch(url)
      .then(
        (res) => {
          if (res.status !== 200) {
            setError(value);
          } else {
            setError("");
            return res.json();
          }
        },
        () => {
          setError(value);
        }
      )
      .then((body) => {
        if (body) {
          setCountries(body);
        }
      });
  };

  const debouncedSearch = debounce(handleSearch, 500);

  const filteredCountries =
    regionFilter && countries
      ? countries.filter((country) => country.region === regionFilter)
      : countries;

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <SearchAndFilter
          handleSearch={debouncedSearch}
          regions={regions}
          handleRegionFilter={setRegionFilter}
        />
      )}
      {error ? (
        <div>No countries matching the search "{error}"</div>
      ) : filteredCountries ? (
        filteredCountries.length ? (
          <CountryCards countries={filteredCountries} />
        ) : (
          <div>No countries matching search in the region "{regionFilter}"</div>
        )
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

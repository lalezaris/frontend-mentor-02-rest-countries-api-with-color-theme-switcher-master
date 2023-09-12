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
    console.log(">>> IN REGION USEEFFECT", countries);
    const regions = countries
      ?.map((country) => country.region)
      .filter((region, i, arr) => {
        return region && arr.indexOf(region) === i;
      });

    console.log(">>>", regions);
    regions && setRegions(regions);
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

  console.log(">>> rerender regionFilter", regionFilter);
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
        <div> THERE WAS A PROBLEM WITH THE SEARCH: "{error}"</div>
      ) : countries ? (
        <CountryCards
          countries={
            regionFilter
              ? countries.filter((country) => country.region === regionFilter)
              : countries
          }
        />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import SearchAndFilter from "../components/SearchAndFilter";
import CountryCards from "../components/CountryCards";
import data from "../../data.json";
import { debounce } from "../utils";

// https://restcountries.com/v2/all?fields=name,flags,population,region,capital

const IndexPage: React.FC<PageProps> = () => {
  const [countries, setCountries] = React.useState();

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

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <SearchAndFilter handleSearch={debouncedSearch} />
      )}
      {error ? (
        <div> THERE WAS A PROBLEM WITH THE SEARCH: "{error}"</div>
      ) : countries ? (
        <CountryCards countries={countries} />
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;

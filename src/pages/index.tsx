import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import searchOutline from "../images/search-outline.svg";
import SearchAndFilter from "../components/SearchAndFilter";
import CountryCards from "../components/CountryCards";
import data from "../../data.json";

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

  let [wait, setWait] = React.useState(true);
  let [error, setError] = React.useState<string>();
  let currentTimeout: NodeJS.Timeout;

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
        (err) => {
          setError(value);
        }
      )
      .then((body) => {
        if (body) {
          setCountries(body);
        }
      });
  };

  const debouncedSearch = (value: string) => {
    if (wait) {
      console.log("wait, then run", value);
      clearTimeout(currentTimeout);
      currentTimeout = setTimeout(() => {
        handleSearch(value);
        console.log("ok now run", value);
        setWait(true);
      }, 500);
    } else {
      handleSearch(value);
      console.log("just run it", value);
      setWait(true);
    }
    setTimeout(() => {
      console.log("clear");
      setWait(false);
    }, 500);
  };

  console.log("countries: ", countries);

  return (
    <>
      WAIT: {wait ? "true" : "false"}
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

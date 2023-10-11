import * as React from "react";
import searchOutline from "../images/search-outline.svg";

type SearchAndFilterProps = {
  handleSearch: (value: string) => void;
  regions?: (string | undefined)[];
  handleRegionFilter: (value: string) => void;
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  handleSearch,
  regions,
  handleRegionFilter,
}) => {
  return (
    <div className="search-container">
      <div className="search-input">
        <label>
          <img src={searchOutline} alt="magnifying glass" />
        </label>
        <input
          type="search"
          placeholder="Search for a country..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      <select
        className="region-select"
        onChange={(e) => handleRegionFilter(e.target.value)}
      >
        <option value={""}>All Regions</option>
        {regions?.map((region, i) => (
          <option key={i} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchAndFilter;

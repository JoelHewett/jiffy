import { useState } from "react";

export const Search = ({
  onSearch,
  loading,
}: {
  onSearch: (searchText: string) => void;
  loading: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        name="search"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button disabled={loading} onClick={() => onSearch(searchValue)}>
        Search
      </button>
    </div>
  );
};

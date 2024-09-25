import "./App.css";
import { useGiphyData } from "./hooks/useGiphyData";
import { Grid } from "./components/Grid";
import { Search } from "./components/Search";
import { useState } from "react";
import { useSavedGifs } from "./hooks/useSavedGifs";

const TRENDING_TITLE = "Trending";

function App() {
  const [searchTitle, setSearchTitle] = useState(TRENDING_TITLE);
  const [showSaved, setShowSaved] = useState(false);
  const { savedGifs, toggleGifSave } = useSavedGifs();
  const { gifs, loading, getSearch, pageSize } = useGiphyData({ savedGifs });

  const onSearch = (value: string) => {
    const title = value === "" ? TRENDING_TITLE : value;
    setSearchTitle(title);
    getSearch(value);
    setShowSaved(false);
  };

  return (
    <>
      <div className="header">
        <div className="container">
          <h1>Jiffy</h1>
          <Search onSearch={onSearch} loading={loading} />
        </div>
      </div>
      <div className="body">
        <div className="container">
          <div className="nav">
            <button
              className={!showSaved ? "navActive" : ""}
              onClick={() => setShowSaved(false)}
            >
              Search
            </button>
            <button
              className={showSaved ? "navActive" : ""}
              onClick={() => setShowSaved(true)}
            >
              My saved
            </button>
          </div>
          {!showSaved && (
            <Grid
              gifs={gifs}
              showPlaceholders={loading}
              title={searchTitle}
              pageSize={pageSize}
              onClick={toggleGifSave}
            />
          )}
          {showSaved && (
            <Grid
              gifs={savedGifs}
              title="My saved"
              pageSize={pageSize}
              onClick={toggleGifSave}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

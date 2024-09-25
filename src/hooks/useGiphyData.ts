import { useEffect, useState } from "react";
import { Gif } from "../types";
import { fetchSearch, fetchTrending } from "../fetch";

const PAGE_LIMIT = 20;

let initFetch = false;

const markSavedGifs = (gifs: Gif[], savedGifs: Gif[]) => {
  return gifs.map((gif) => {
    return {
      ...gif,
      saved: savedGifs.some((savedGif) => savedGif.id === gif.id),
    };
  });
};

export const useGiphyData = ({ savedGifs = [] }: { savedGifs: Gif[] }) => {
  const [gifs, setGifs] = useState<Array<Gif>>([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const markedGifs = markSavedGifs(gifs, savedGifs);

  const getTrending = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const newGifs = await fetchTrending(PAGE_LIMIT);
    if (newGifs) {
      setGifs(newGifs);
    } else {
      setFetchError(true);
    }

    setLoading(false);
  };

  const getSearch = async (searchText: string) => {
    if (loading) {
      return;
    }

    if (searchText === "") {
      getTrending();
      return;
    }

    setLoading(true);

    const newGifs = await fetchSearch(searchText, PAGE_LIMIT);
    if (newGifs) {
      setGifs(newGifs);
    } else {
      setFetchError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!initFetch) {
      initFetch = true;
      getTrending();
    }
  }, []);

  return {
    gifs: markedGifs,
    fetchError,
    loading,
    getSearch,
    pageSize: PAGE_LIMIT,
  };
};

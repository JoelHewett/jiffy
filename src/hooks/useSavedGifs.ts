import { useEffect, useState } from "react";
import { Gif } from "../types";

const STORAGE_KEY = "gifs";

const persistData = (gifs: Gif[]) => {
  try {
    const gifsJSON = JSON.stringify(gifs);
    localStorage.setItem(STORAGE_KEY, gifsJSON);
    return true;
  } catch (error) {
    return false;
  }
};

const loadData = () => {
  try {
    const gifsJSON = localStorage.getItem(STORAGE_KEY);
    if (gifsJSON === null) {
      return [];
    }
    return JSON.parse(gifsJSON) as Gif[];
  } catch (error) {
    return undefined;
  }
};

export const useSavedGifs = () => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [savedGifs, setSavedGifs] = useState<Array<Gif>>(() => {
    const savedGifs = loadData();
    if (!savedGifs) {
      setLoadFailed(true);
      return [];
    }

    return savedGifs;
  });
  const [storeFailed, setStoreFailed] = useState(false);

  const saveGif = (gif: Gif) => {
    const alreadySaved = savedGifs.some((savedGif) => savedGif.id === gif.id);
    if (alreadySaved) {
      return;
    }

    setSavedGifs((current) => {
      return [...current, { ...gif, saved: true }];
    });
  };

  const removeGif = (gif: Gif) => {
    setSavedGifs((current) => {
      return current.filter((savedGif) => savedGif.id !== gif.id);
    });
  };

  const toggleGifSave = (gif: Gif) => {
    if (gif.saved) {
      removeGif(gif);
    }
    saveGif(gif);
  };

  useEffect(() => {
    const success = persistData(savedGifs);
    setStoreFailed(!success);
  }, [savedGifs]);

  return {
    savedGifs,
    toggleGifSave,
    storeFailed,
    loadFailed,
  };
};

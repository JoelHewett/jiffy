import { Gif } from "./types";

const BASE_URL = "https://api.giphy.com/v1/gifs/";
const KEY = import.meta.env.VITE_GIPHY_API_KEY;

interface GifData {
  alt_text: string;
  images: {
    fixed_width: {
      url: string;
    };
  };
  id: string;
}

interface TrendingResponse {
  data: GifData[];
}

const mapGifData = (trending: TrendingResponse) => {
  return trending.data?.map<Gif>((gif) => {
    return {
      alt: gif?.alt_text,
      src: gif?.images?.fixed_width?.url,
      id: gif?.id,
    };
  });
};

export const fetchTrending = async (pageLimit: number) => {
  const url = `${BASE_URL}trending?api_key=${KEY}&limit=${pageLimit}&offset=0&rating=g&bundle=messaging_non_clips`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const trending = (await response.json()) as TrendingResponse;
    return mapGifData(trending);
  } catch (error) {
    return undefined;
  }
};

export const fetchSearch = async (searchText: string, pageLimit: number) => {
  const url = `${BASE_URL}search?api_key=${KEY}&limit=${pageLimit}&offset=0&rating=g&bundle=messaging_non_clips&q=${searchText}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const trending = (await response.json()) as TrendingResponse;
    return mapGifData(trending);
  } catch (error) {
    return undefined;
  }
};

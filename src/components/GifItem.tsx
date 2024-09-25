import { useState } from "react";
import { Gif } from "../types";

export const GifItem = ({ gif }: { gif: Gif }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={!loaded ? "gridPlaceholder" : ""}>
      <img
        src={gif.src}
        alt={gif.alt}
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </div>
  );
};

import { Gif } from "../types";
import starIcon from "../assets/star-symbol-icon.svg";
import { GifItem } from "./GifItem";

export const Grid = ({
  title,
  gifs,
  showPlaceholders,
  pageSize,
  onClick,
}: {
  title: string;
  gifs: Gif[];
  showPlaceholders?: boolean;
  pageSize: number;
  onClick: (gif: Gif) => void;
}) => {
  const items = () => {
    if (showPlaceholders) {
      const placeholders = [];
      for (let i = 0; i < pageSize; i++) {
        placeholders.push(
          <li className="gridItem" key={i}>
            <div className="gridPlaceholder"></div>
          </li>
        );
      }
      return placeholders;
    }

    return gifs.map((gif) => (
      <li className="gridItem" key={gif.id} onClick={() => onClick(gif)}>
        <img
          className={`iconSaved ${gif.saved ? "iconSavedActive" : ""}`}
          src={starIcon}
          alt="Saved"
        />
        <GifItem gif={gif} />
      </li>
    ));
  };

  return (
    <>
      <h2>{title}</h2>
      <ul className="grid">{items()}</ul>
    </>
  );
};

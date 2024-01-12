import { useEffect, useState } from "react";

const imagesColor = "62c5b9";

const IMAGES = [
  `https://icongr.am/clarity/happy-face.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/heart.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/piggy-bank.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/star.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/sun.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/tree.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/asterisk.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/boat.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/bolt.svg?size=128&color=${imagesColor}`,
  `https://icongr.am/clarity/car.svg?size=128&color=${imagesColor}`,
]
  .flatMap((image) => [`a|${image}`, `b|${image}`])
  .sort(() => Math.random() - 0.5);

export default function App() {
  const [guessed, setGuessed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
        setGuessed((guessed) => guessed.concat(selected));
      }
      setTimeout(() => setSelected([]), 1000);
    }
  }, [selected]);
  useEffect(() => {
    if (guessed.length === IMAGES.length) {
      alert("You win!");
      location.reload();
    }
  });
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
        gap: 24,
      }}
    >
      {IMAGES.map((image) => {
        const [, url] = image.split("|");

        return (
          <li
            onClick={() =>
              selected.length < 2 &&
              setSelected((selected) => selected.concat(image))
            }
            style={{
              background: "#302751",
              cursor: "pointer",
              padding: 15,
              fill: "#444",
              border: "2px solid #f9f7fd",
              borderRadius: 12,
            }}
            key={image}
          >
            {selected.includes(image) || guessed.includes(image) ? (
              <img src={url} alt="icon" />
            ) : (
              <img
                key={image}
                src={`https://icongr.am/entypo/help.svg?size=128&color=${imagesColor}`}
                alt="icon"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

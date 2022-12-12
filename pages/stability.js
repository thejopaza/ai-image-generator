import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Stability() {
  const [imgSrc, setImgSrc] = useState("");
  const [seed, setSeed] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("api/stability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "soulless Half-orc Sorcerer from the petrified wood who always wanted to learn magic but struggled with it. !!!!High fantasy art!!!!, full_body, full body, HDR, trending on artstation, !!!!glowing and epic!!!!, epic lighting from above, epic fantasy card game art, !!!!epic character portrait!!!!, full art illustration, !!!!senior character artist!!!! | blender, render, !!!text!!!, disfigured, cropped, out of frame, nsfw, grain:-3",
        }),
      });
      const { data } = await response.json();
      setImgSrc(data.imageBinary);
      setSeed(data.seed);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>CLICK THIS</button>
      <img src={imgSrc} />
      <span>{seed}</span>
    </div>
  );
}

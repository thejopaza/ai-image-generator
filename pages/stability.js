import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Stability() {
  const [imgSrc, setImgSrc] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("api/stability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "Happy & smiling rabbit meets its soulmate. Colorful, illustration, insanely detailed, intricate, 8k, dramatic lighting, beautiful, epic composition, octane render",
        }),
      });
      const { data } = await response.json();
      setImgSrc(data.imageBinary);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>CLICK THIS</button>
      <img src={imgSrc} />
    </div>
  );
}

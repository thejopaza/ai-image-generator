import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Stability() {
  const [imgSrc, setImgSrc] = useState("");

  const handleClick = async () => {
    const response = await fetch("api/stability");
    const data = await response.json();
    setImgSrc(data.imageBinary);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>CLICK THIS</button>
      <img src={imgSrc} />
    </div>
  );
}

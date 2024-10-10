import styles from "./StartupDetailHeader.module.css";
import noImageIcon from "../../assets/no-image.png";

export default function StartupDetailHeader({ startup }) {
  if (!startup) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src={startup.image || noImageIcon}
        alt=" 로고"
      />
      <div className={styles.startup}>
        <h1>{startup.name}</h1>
        <h2>{startup.categoryName}</h2>
      </div>
    </div>
  );
}

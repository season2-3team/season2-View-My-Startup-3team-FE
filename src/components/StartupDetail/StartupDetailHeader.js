import styles from './StartupDetailHeader.module.css';
import noImageIcon from '../../assets/no-image.png';

export default function StartupDetailHeader({ startup }) {
  if (!startup) {
    return <div>로딩 중...</div>; // 로딩 중 표시
  }
  return (
    <div>
      <img src={startup.image || noImageIcon} alt=" 로고" />
      {startup.name}
      {startup.categoryName}
    </div>
  );
}

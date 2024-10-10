import styles from './StartupDetailDropdown.module.css';

export default function DropdownMenu({ onPatch, onDelete }) {
  return (
    <ul className={styles.menu}>
      <li onClick={onPatch}>수정</li>
      <li onClick={onDelete}>삭제</li>
    </ul>
  );
}

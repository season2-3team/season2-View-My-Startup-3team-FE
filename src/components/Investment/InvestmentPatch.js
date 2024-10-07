import styles from './InvestmentPatch.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import Modal from '../Common/Modal';
import { useState } from 'react';
import { patchInvestment } from '../../api/InvestmentService';

export default function InvestmentPatch() {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>수정 권한 인증</h1>
          <img
            src={X}
            onClick={handleCloseModal}
            style={{ cursor: 'pointer' }}
            alt="close btn"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className={styles.group}>
          <h1>비밀번호</h1>
          <div className={styles.password}>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={handleChange}
            />
            <img
              src={isPasswordVisible ? visibilityOff : visibilityOn}
              alt={isPasswordVisible ? '비밀번호 표시' : '비밀번호 숨기기'}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <button className={styles.delete}>수정하기</button>
      </div>
    </Modal>
  );
}

import styles from './InvestmentDelete.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import Modal from '../Common/Modal';
import { useState } from 'react';
import { deleteInvestment } from '../../api/InvestmentService';

export default function InvestmentDelete({ investmentId, onClose }) {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 임시 핸들러
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await deleteInvestment(investmentId, { password });
    //   if (res.status === 204) {
    //     setSuccess(true);
    //   } else {
    //     const data = await res.json();
    //     setError(data.message);
    //   }
    // } catch (err) {
    //   setError('삭제 요청 중 오류가 발생했습니다.');
    // }
  };

  return (
    <Modal>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>삭제 권한 인증</h1>
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
        <button className={styles.delete} onClick={handleSubmit}>
          삭제하기
        </button>
      </div>
    </Modal>
  );
}

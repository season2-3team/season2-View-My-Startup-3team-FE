import styles from './InvestmentModal.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import { useState } from 'react';

export default function InvestmentModal({ onClose }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [checkPasswordVisible, setCheckPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleCheckPasswordVisibility = () => {
    setCheckPasswordVisible(!checkPasswordVisible);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <form className={styles.form}>
          <div>
            <h1>기업에 투자하기</h1>
            <img
              src={X}
              onClick={onClose}
              style={{ cursor: 'pointer' }}
              alt="close btn"
            />
          </div>
          <div>
            {/* 임시 하드 코딩 */}
            <h1>투자 기업 정보</h1>
            <p>코드잇</p>
          </div>
          <div className={styles.group}>
            <label htmlFor="name">투자자 이름</label>
            <input
              type="text"
              id="name"
              placeholder="투자자 이름을 입력해 주세요"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="investAmount">투자 금액</label>
            <input
              type="text"
              id="investAmount"
              placeholder="투자 금액을 입력해 주세요"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="comment">투자 코멘트</label>
            <textarea
              type="text"
              id="comment"
              placeholder="투자에 대한 코멘트를 입력해 주세요"
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="password">비밀번호</label>
            <div className={styles.password}>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="비밀번호를 입력해 주세요"
              />
              <img
                src={isPasswordVisible ? visibilityOff : visibilityOn}
                alt={isPasswordVisible ? '비밀번호 표시' : '비밀번호 숨기기'}
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className={styles.group}>
            <label htmlFor="checkPassword">비밀번호 확인</label>
            <div className={styles.password}>
              <input
                type={checkPasswordVisible ? 'text' : 'password'}
                id="checkPassword"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
              />
              <img
                src={checkPasswordVisible ? visibilityOff : visibilityOn}
                alt={checkPasswordVisible ? '비밀번호 표시' : '비밀번호 숨기기'}
                onClick={toggleCheckPasswordVisibility}
              />
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={onClose}>취소</button>
            <button>투자하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

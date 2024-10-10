import styles from './InvestmentPatch.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import Modal from '../Common/Modal';
import { useState } from 'react';
import InvestmentUpdate from './InvestmentUpdate';

export default function InvestmentPatch({ onClose, mockInvestor, startup }) {
  const { password: storedPassword } = mockInvestor || {};
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInvestmentUpdate, setShowInvestmentUpdate] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (password !== storedPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      console.log('비밀번호 불일치');
    } else {
      setError('');
      setShowInvestmentUpdate(true);
      console.log('비밀번호 일치, 모달 열기');
    }
  };

  return (
    <div>
      <Modal>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>수정 권한 인증</h1>
            <img
              src={X}
              onClick={onClose}
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
          <button className={styles.patch} onClick={handlePasswordSubmit}>
            수정하기
          </button>
        </div>
      </Modal>

      {showInvestmentUpdate && (
        <InvestmentUpdate
          onClose={() => {
            setShowInvestmentUpdate(false);
            onClose();
          }}
          startup={startup}
          mockInvestor={mockInvestor}
          initialValues={{
            name: mockInvestor.name,
            investAmount: mockInvestor.investAmount,
            comment: mockInvestor.comment,
            password: mockInvestor.password
          }}
        />
      )}
    </div>
  );
}

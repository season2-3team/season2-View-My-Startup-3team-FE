import styles from './InvestmentPatch.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import Modal from '../Common/Modal';
import { useState } from 'react';
import { patchInvestment } from '../../api/InvestmentService';
import InvestmentUpdate from './InvestmentUpdate';

export default function InvestmentPatch({ onClose, mockInvestor, startup }) {
  const {
    id,
    password: storedPassword,
    ...investorDetails
  } = mockInvestor || {};
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInvestmentUpdate, setShowInvestmentUpdate] = useState(false);
  const [error, setError] = useState('');

  const [investAmount, setInvestAmount] = useState('');
  const [comment, setComment] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log('비밀번호 입력:', password);
    console.log('저장된 비밀번호:', storedPassword);
    console.log('타입:', typeof storedPassword);
    if (password !== storedPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      console.log('비밀번호 불일치');
    } else {
      setError('');
      setShowInvestmentUpdate(true);
      console.log('비밀번호 일치, 모달 열기');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateRes = await patchInvestment(id, { investAmount });

      if (updateRes.status === 200) {
        onClose();
      } else {
        setError('수정 요청이 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('투자 수정 중 오류가 발생했습니다.');
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
          onClick={handleUpdateSubmit}
          onClose={() => {
            setShowInvestmentUpdate(false);
            onClose();
          }}
          startup={startup}
          initialValues={{
            name: mockInvestor.name,
            investAmount: mockInvestor.investAmount,
            comment: mockInvestor.comment
          }}
        />
      )}
    </div>
  );
}

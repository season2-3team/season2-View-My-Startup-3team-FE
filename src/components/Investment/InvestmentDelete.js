import styles from './InvestmentDelete.module.css';
import X from '../../assets/ic_x.svg';
import visibilityOn from '../../assets/btn_visibility_on.svg';
import visibilityOff from '../../assets/btn_visibility_off.svg';
import Modal from '../Common/Modal';
import { useState } from 'react';
import { deleteInvestment } from '../../api/InvestmentService';
import InvestmentDeleteFail from './InvestmentDeleteFail';

export default function InvestmentDelete({ onClose, mockInvestor }) {
  const { id } = mockInvestor || {};

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [error, setError] = useState('');
  const [deleteFail, setDeleteFail] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await deleteInvestment(id, { password });
      console.log('응답:', res); // 응답 출력

      if (res.status === 204) {
        // 삭제 성공 시 모달 닫기
        onClose();
      } else if (res.status === 403) {
        // 비밀번호가 틀린 경우 실패 모달 표시
        console.log('비밀번호 틀림'); // 확인용 로그
        setDeleteFail(true);
      } else {
        // 기타 오류 처리
        setError('알 수 없는 오류가 발생했습니다.');
        console.error('삭제 요청 중 오류 발생:', res);
      }
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
      console.error(err.response.data); // 에러 응답 출력
      setError('삭제 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>삭제 권한 인증</h1>
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
        <button className={styles.delete} onClick={handleSubmit}>
          삭제하기
        </button>
      </div>

      {deleteFail && <InvestmentDeleteFail setDeleteFail={setDeleteFail} />}
    </Modal>
  );
}

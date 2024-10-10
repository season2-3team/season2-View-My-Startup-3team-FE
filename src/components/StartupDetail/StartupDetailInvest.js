import styles from './StartupDetailInvest.module.css';
import kebab from '../../assets/ic_kebab.svg';
import { useState, useEffect } from 'react';
import Pagination from '../Common/Pagination';
import { formatAmount } from '../../utils/formatAmount';
import InvestmentCreate from '../Investment/InvestmentCreate';
import InvestmentPatch from '../Investment/InvestmentPatch';
import InvestmentDelete from '../Investment/InvestmentDelete';
import StartupDetailDropdown from './StartupDetailDropdown';

const MAX_ITEMS = 5;

export default function StartupDetailInvest({ startup, mockInvestor }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(MAX_ITEMS);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isPatchModalOpen, setPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleOpenPatchModal = () => {
    setPatchModalOpen(true);
  };

  const handleClosePatchModal = () => {
    setPatchModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleMenuClick = (investor) => {
    setSelectedInvestor(investor);
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && selectedInvestor && !event.target.closest('.menu')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, selectedInvestor]);

  if (!startup) {
    return <div>Loading...</div>;
  }

  if (!mockInvestor.list) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(mockInvestor.totalCount / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentInvestors = mockInvestor.list.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>View My Startup에서 받은 투자</h1>
        <button onClick={handleOpenCreateModal}>기업 투자하기</button>
      </div>
      <div>
        <h1>총 {formatAmount(startup.simInvest)}원</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '8.4rem' }}>투자자 이름</th>
              <th style={{ width: '8.4rem' }}>순위</th>
              <th style={{ width: '8.4rem' }}>투자 금액</th>
              <th style={{ width: '83.6rem' }}>투자 코멘트</th>
              <th style={{ width: '6.4rem' }}> </th>
            </tr>
          </thead>
          <tbody>
            {currentInvestors.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.rank}위</td>
                <td>{formatAmount(item.investAmount)} 원</td>
                <td style={{ textAlign: 'left' }}>{item.comment}</td>
                <td>
                  <img
                    src={kebab}
                    alt="더보기 아이콘"
                    onClick={() => handleMenuClick(item)}
                    style={{ cursor: 'pointer' }}
                  />
                  {selectedInvestor?.id === item.id && dropdownOpen && (
                    <StartupDetailDropdown
                      onPatch={() => handleOpenPatchModal(true)}
                      onDelete={() => handleOpenDeleteModal(true)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isCreateModalOpen && (
        <InvestmentCreate onClose={handleCloseCreateModal} startup={startup} />
      )}
      {isPatchModalOpen && selectedInvestor && (
        <InvestmentPatch
          onClose={handleClosePatchModal}
          startup={startup}
          mockInvestor={selectedInvestor}
        />
      )}
      {isDeleteModalOpen && selectedInvestor && (
        <InvestmentDelete
          onClose={handleCloseDeleteModal}
          mockInvestor={selectedInvestor}
        />
      )}
    </div>
  );
}

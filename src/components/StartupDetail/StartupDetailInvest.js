import styles from './StartupDetailInvest.module.css';
import kebab from '../../assets/ic_kebab.svg';
import { useState, useEffect } from 'react';
import Pagination from '../Common/Pagination';
import { formatAmount } from '../../utils/formatAmount';
import InvestmentCreate from '../Investment/InvestmentCreate';
import InvestmentPatch from '../Investment/InvestmentPatch';
import InvestmentDelete from '../Investment/InvestmentDelete';
import StartupDetailDropdown from './StartupDetailDropdown';
import { useParams } from 'react-router-dom';
import useFetchInvestors from '../../hooks/useFetchInvestors';
import useFetchStartup from '../../hooks/useFetchStartupDetail';
import Warn from '../Warn';

const MAX_ITEMS = 5;

export default function StartupDetailInvest() {
  const { id } = useParams();
  const maxItems = MAX_ITEMS;
  const [currentPage, setCurrentPage] = useState(1); // currentPage 상태를 여기서 관리

  const { investors, error, totalCount, showLoading } = useFetchInvestors(
    id,
    currentPage,
    maxItems
  );

  const { startup } = useFetchStartup(id);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isPatchModalOpen, setPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isPatchModalOpen) {
      console.log('isPatchModalOpen:', isPatchModalOpen);
    }
  }, [isPatchModalOpen]);

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
  };

  const handleOpenPatchModal = () => {
    console.log('Patch modal opened');
    setPatchModalOpen(true);
  };

  const handleClosePatchModal = () => {
    setPatchModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    console.log('Delete modal opened');
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleMenuClick = (investor) => {
    setSelectedInvestor(investor);
    setDropdownOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && selectedInvestor && !event.target.closest(".menu")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen, selectedInvestor]);

  if (error) {
    return <Warn variant="error" title="오류발생" description={error} />;
  }

  if (showLoading) {
    return <div>목록을 불러오는 중입니다....</div>;
  }

  if (!startup) {
    return;
  }

  if (!investors) {
    return <div>Loading...</div>;
  }

  const totalPages = Math.ceil(totalCount / maxItems);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>View My Startup에서 받은 투자</h1>
        <button onClick={handleOpenCreateModal}>기업 투자하기</button>
      </div>
      <div>
        <h1>총 {formatAmount(startup.startup.simInvest)}원</h1>
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
            {investors.list.map((item) => (
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
                      onPatch={() => {
                        handleOpenPatchModal();
                        setDropdownOpen(false);
                      }}
                      onDelete={() => {
                        handleOpenDeleteModal();
                        setDropdownOpen(false);
                      }}
                    />
                  )}
                </td>
              </tr>
            </thead>
            <tbody>
              {currentInvestors.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.rank}위</td>
                  <td>{formatAmount(item.investAmount)} 원</td>
                  <td style={{ textAlign: "left" }}>{item.comment}</td>
                  <td>
                    <img
                      src={kebab}
                      alt="더보기 아이콘"
                      onClick={() => handleMenuClick(item)}
                      className={styles.img}
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
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isCreateModalOpen && (
        <InvestmentCreate
          onClose={handleCloseCreateModal}
          startup={startup.startup}
        />
      )}
      {isPatchModalOpen && selectedInvestor && (
        <InvestmentPatch
          onClose={handleClosePatchModal}
          startup={startup.startup}
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

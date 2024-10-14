import styles from "./StartupDetailInvest.module.css";
import kebab from "../../assets/ic_kebab.svg";
import { useState, useEffect } from "react";
import Pagination from "../Common/Pagination";
import { formatAmount } from "../../utils/formatAmount";
import InvestmentCreate from "../Investment/InvestmentCreate";
import InvestmentPatch from "../Investment/InvestmentPatch";
import InvestmentDelete from "../Investment/InvestmentDelete";
import StartupDetailDropdown from "./StartupDetailDropdown";
import { useParams } from "react-router-dom";
import useFetchInvestors from "../../hooks/useFetchInvestors";
import useFetchStartup from "../../hooks/useFetchStartupDetail";
import Warn from "../Warn";

const MAX_ITEMS = 5;

export default function StartupDetailInvest() {
  const { id } = useParams();
  const maxItems = MAX_ITEMS;
  const [currentPage, setCurrentPage] = useState(1);

  const { investors, error, totalCount, showLoading } = useFetchInvestors(
    id,
    currentPage,
    maxItems,
  );

  const { startup } = useFetchStartup(id);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isPatchModalOpen, setPatchModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleOpenCreateModal = () => setCreateModalOpen(true);
  const handleCloseCreateModal = () => setCreateModalOpen(false);

  const handleOpenPatchModal = () => setPatchModalOpen(true);
  const handleClosePatchModal = () => setPatchModalOpen(false);

  const handleOpenDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const handleMenuClick = (investor) => {
    setSelectedInvestor(investor);
    setDropdownOpen((prev) => !prev); // 클릭할 때 드롭다운 열기/닫기
  };

  const handleClickOutside = (event) => {
    if (
      dropdownOpen &&
      !event.target.closest(".menu") &&
      !event.target.closest(".kebab-icon")
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (error) {
    return <Warn variant="error" title="오류발생" description={error} />;
  }

  if (showLoading && !investors) {
    return <div>목록을 불러오는 중입니다....</div>;
  }

  if (!startup) {
    return;
  }

  const totalPages = Math.ceil(totalCount / maxItems);

  return (
    <div className={styles.content}>
      <div className={styles.headerBox}>
        <div className={styles.header}>
          <h1>View My Startup에서 받은 투자</h1>
          <button onClick={handleOpenCreateModal} style={{ cursor: "pointer" }}>
            기업 투자하기
          </button>
        </div>
      </div>
      <div>
        <h1>총 {formatAmount(startup.startup.simInvest)}원</h1>
        <div className={styles.wrapper}>
          {investors && investors.list.length > 0 ? (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: "8.4rem" }}>투자자 이름</th>
                    <th style={{ width: "8.4rem" }}>순위</th>
                    <th style={{ width: "8.4rem" }}>투자 금액</th>
                    <th style={{ width: "auto" }}>투자 코멘트</th>
                    <th style={{ width: "6.4rem" }}> </th>
                  </tr>
                </thead>
                <tbody>
                  {investors.list.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.name}>{item.name}</td>
                      <td>{item.rank}위</td>
                      <td>{formatAmount(item.investAmount)} 원</td>
                      <td style={{ textAlign: "left" }}>{item.comment}</td>
                      <td style={{ position: "relative" }}>
                        <img
                          src={kebab}
                          alt="더보기 아이콘"
                          onClick={() => handleMenuClick(item)}
                          style={{ cursor: "pointer" }}
                        />
                        {selectedInvestor?.id === item.id && dropdownOpen && (
                          <StartupDetailDropdown
                            onPatch={() => {
                              setDropdownOpen(false);
                              handleOpenPatchModal();
                            }}
                            onDelete={() => {
                              setDropdownOpen(false);
                              handleOpenDeleteModal();
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className={styles.null}>
              아직 투자한 기업이 없어요,
              <br />
              버튼을 눌러 기업에 투자해보세요!
            </div>
          )}
        </div>
      </div>
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

import useFetchStartups from "../../hooks/useFetchStartups";
import StartupDetailHeader from "./StartupDetailHeader";
import StartupDetailInfo from "./StartupDetailInfo";
import StartupDetailInvest from "./StartupDetailInvest";

const MAX_ITEMS = 10;

export default function StartupDetail() {
  const maxItems = MAX_ITEMS;
  const { error } = useFetchStartups(1, maxItems, "total_investment", "desc");

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  return (
    <>
      <StartupDetailHeader />
      <StartupDetailInfo />
      <StartupDetailInvest />
    </>
  );
}

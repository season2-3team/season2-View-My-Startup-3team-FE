const STARTUP_API_BASE_URL = "https://season2-view-my-startup-3team-be.onrender.com/api/startups";

// Article 목록 가져오기
export async function getStartupList(
  page = 1,
  limit = 10,
  order = "simInvest",
  sort = "desc",
  keyword = "",
) {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      order,
      sort,
      keyword,
    });
    const response = await fetch(
      `${STARTUP_API_BASE_URL}?${params.toString()}`,
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("errMessage", errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

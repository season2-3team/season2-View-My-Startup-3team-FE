const STARTUP_API_BASE_URL = "http://localhost:3000/api/startups";

export async function getStartupInfo(page, limit, order, sort, keyword) {
  const params = new URLSearchParams({
    page,
    limit,
    order,
    sort,
    keyword,
  });

  try {
    const response = await fetch(
      `${STARTUP_API_BASE_URL}?${params.toString()}`
    );
    // 응답 상태 확인
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log("errMessage", errorMessage);
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // 받아온 데이터를 콘솔에 출력
    return data; // 필요한 경우 데이터를 반환
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

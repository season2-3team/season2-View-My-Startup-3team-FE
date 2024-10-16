const STARTUP_API_BASE_URL =
  'https://season2-view-my-startup-3team-be.onrender.com/api/startups';

export async function getStartup(id) {
  try {
    const response = await fetch(`${STARTUP_API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export async function getInvestors(
  id,
  page = 1,
  limit = 5,
  order = 'invest_amount',
  sort = 'desc'
) {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      order,
      sort
    });
    const response = await fetch(
      `${STARTUP_API_BASE_URL}/${id}?${params.toString()}`
    );
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log('errMessage', errorMessage);
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

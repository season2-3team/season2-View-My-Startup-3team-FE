import axios from "axios";

const instance = axios.create({
  baseURL: "https://season2-view-my-startup-3team-be.onrender.com/api/startups",
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(
      "주의 : 에러 발생!",
      err.response ? err.response.data : err.message,
    );

    throw err;
  },
);

async function get(url, params = {}) {
  return await instance.get(url, { params });
}

export async function getStartup(id) {
  const res = await get(`/api/startups/${id}`);
  return res.data;
}

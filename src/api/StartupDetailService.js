import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(
      '주의 : 에러 발생!',
      err.response ? err.response.data : err.message
    );

    throw err;
  }
);

async function get(url, params = {}) {
  return await instance.get(url, { params });
}

export async function getStartup(id) {
  const res = await get(`/api/startups/${id}`);
  console.log(res.data);
  return res.data;
}

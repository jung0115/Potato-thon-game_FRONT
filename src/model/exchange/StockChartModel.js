import client from 'gamja-backend-client';

// API 호출 및 데이터 가공을 담당하는 Model
const host = 'https://api.miruku.dog';

const getConnection = (token) => {
  return {
    host: host,
    headers: {
      ...token ? { 'Authorization': `Bearer ${token}` } : null
    }
  }
}

// 코인 가격 기록을 가져오는 함수
export async function fetchCoinPriceHistories(coinId, currentDate, pastDate, token) {
  const response = await client.functional.coin.price_histories.getPriceHistories(
    getConnection(token),
    coinId, 
    {
      from: pastDate.toString(),
      to: currentDate.toString()
    }
  );
  return response.histories;
}
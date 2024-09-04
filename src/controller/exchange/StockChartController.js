import { fetchCoinPriceHistories } from '../../model/exchange/StockChartModel';

// 코인 가격 데이터 정리
export function processCoinHistoryData(histories, is10Minute, is30Minute, is1Hour) {
  const data = [];
  const interval = is10Minute ? 10 : is30Minute ? 30 : 60;

  for (let i = 0; i < histories.length; i += interval) {
    data.unshift(histories[i].price);
  }

  return data;
}

// 시간 간격에 따라 데이터를 가져오는 함수
export async function loadCoinData(coins, chartWidth, setCoinData, token, timeOptions) {
  const { is10Minute, is30Minute, is1Hour } = timeOptions;

  const currentDate = new Date();
  const pastDate = new Date();
  const subTime = (chartWidth - 44 - 1) / (88 + 1) + 1;

  if (is10Minute) {
    pastDate.setMinutes(pastDate.getMinutes() - (subTime * 10) - 1);
  } else if (is30Minute) {
    pastDate.setMinutes(pastDate.getMinutes() - (subTime * 30) - 1);
  } else if (is1Hour) {
    pastDate.setHours(pastDate.getHours() - subTime - 1);
  }

  setCoinData({});  // 데이터 초기화

  const updatedCoinData = {};
  for (let coin of coins) {
    const histories = await fetchCoinPriceHistories(coin.id, currentDate, pastDate, token);
    updatedCoinData[coin.id] = processCoinHistoryData(histories, is10Minute, is30Minute, is1Hour);
  }

  setCoinData(updatedCoinData);
}
import {
  fetchRemainAmount,
  fetchCurrentPrice,
  fetchOwnMoney,
  fetchOwnCoin,
  buyCoin,
  sellCoin
} from '../../model/exchange/BuyingSellingModel';

export const getInitialData = async (coinId, token, setRemainAmount, setCurrentPrice, setOwnMoney, setOwnAmount) => {
  try {
    const [remainAmount, currentPrice, ownMoney, ownAmount] = await Promise.all([
      fetchRemainAmount(coinId, token),
      fetchCurrentPrice(coinId, token),
      fetchOwnMoney(token),
      fetchOwnCoin(coinId, token)
    ]);

    setRemainAmount(remainAmount);
    setCurrentPrice(currentPrice);
    setOwnMoney(ownMoney);
    setOwnAmount(ownAmount);
  } catch (error) {
    console.error('Error fetching initial data:', error);
  }
};

export const handleBuy = async (coinId, inputValue, currentPrice, token, ownMoney, setIsLoading, setResultValue) => {
  if (inputValue > 0) {
    const resultValue = Number(inputValue) * Number(currentPrice);
    if (resultValue <= ownMoney) {
      setIsLoading(true);
      try {
        await buyCoin(coinId, inputValue, currentPrice, token);
        setResultValue(resultValue);
      } catch (error) {
        console.error('Error during buy:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('보유하신 화폐로 구매가 불가능합니다!');
    }
  }
};

export const handleSell = async (coinId, inputValue, currentPrice, token, setIsLoading, setResultValue) => {
  if (inputValue > 0) {
    const resultValue = Number(inputValue) * Number(currentPrice);
    setIsLoading(true);
    try {
      await sellCoin(coinId, inputValue, currentPrice, token);
      setResultValue(resultValue);
    } catch (error) {
      console.error('Error during sell:', error);
    } finally {
      setIsLoading(false);
    }
  }
};
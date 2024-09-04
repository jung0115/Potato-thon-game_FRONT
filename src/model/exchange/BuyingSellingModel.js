import client from 'gamja-backend-client';
const host = 'https://api.miruku.dog';

export const getConnection = (token) => ({
  host: host,
  headers: {
    ...token ? { 'Authorization': `Bearer ${token}` } : {}
  }
});

export const fetchRemainAmount = async (coinId, token) => {
  const response = await client.functional.coin.getCoins(getConnection(token));
  const coin = response.coins.find(c => c.id === coinId);
  return coin ? Number(coin.amount) : 0;
};

export const fetchCurrentPrice = async (coinId, token) => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setMinutes(currentDate.getMinutes() - 1);

  const response = await client.functional.coin.price_histories.getPriceHistories(
    getConnection(token),
    coinId,
    { from: pastDate.toString(), to: currentDate.toString() }
  );
  return response.histories[0]?.price || 0;
};

export const fetchOwnMoney = async (token) => {
  const response = await client.functional.user.me.getMyUser(getConnection(token));
  return response.user.balance;
};

export const fetchOwnCoin = async (coinId, token) => {
  const response = await client.functional.user.me.coins.getMyCoins(getConnection(token));
  const coin = response.coins.find(c => c.id === coinId);
  return coin ? Number(coin.amount) : 0;
};

export const buyCoin = async (coinId, amount, price, token) => {
  await client.functional.market.coin.buy(getConnection(token), coinId, {
    amount: amount.toString(),
    price: price.toString()
  });
};

export const sellCoin = async (coinId, amount, price, token) => {
  await client.functional.market.coin.sell(getConnection(token), coinId, {
    amount: amount.toString(),
    price: price.toString()
  });
};
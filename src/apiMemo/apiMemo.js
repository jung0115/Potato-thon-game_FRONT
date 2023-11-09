// api 연결 시 참고
const host = 'https://api.miruku.dog';

const [token, setToken] = useState(null);

const getConnection = () => {
  return {
    host: host,
    headers: {
      ...token ? {
        'Authorization': `Bearer ${token}`
      } : null
    }
  }
}

// 회원가입 -------------------------------------------------------------------------------
async function user() {
  await client.functional.user.register(
    getConnection(),
    {
      name: '뼈다귀감자탕',
      id: '010-0987-1234',
      password: 'test1234'
    }
  )
}

// 로그인 -------------------------------------------------------------------------------
async function authSignIn() {
  await client.functional.auth.signIn(
    getConnection(),
    {
      id: 'test', // ID
      password: 'test' // Password
    }
  ).then(response => {
    //response.token // JWT token
    setToken(response.token);
  });
}

// 코인 종류 조회 -------------------------------------------------------------------------------
async function coinGetGoins() {
  await client.functional.coin.getCoins(
    getConnection()
  ).then(response => {
    console.log(response);
  })
}

// 코인 추가 -------------------------------------------------------------------------------
async function coinCreateCoin() {
  await client.functional.coin.manageCreateCoin(
    getConnection(),
    {
      id: 'abcchoco', // ID
      name: 'ABC 초콜릿', // Name
      price: '1000', // Initial price
      minPrice: '500', // Min price
      maxPrice: '3000', // Max price
      amount: '30' // Initial amount of this coin in market
    }
  );
}

// 코인 증감 기록 확인 -------------------------------------------------------------------------------
async function coinPriceHistories() {
  await client.functional.coin.price_histories.getPriceHistories(
    getConnection(),
    'soda', // Coin ID
    {
      from: '2023-10-31 12:00:00', // From
      to: '2023-10-31 12:00:00' // To
    }
  ).then(response => {
      
  });
}
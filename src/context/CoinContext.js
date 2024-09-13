import React from "react";

// CoinContext 객체 생성
const CoinContext = React.createContext({
    coins: [],
    setCoins: () => {},
    priceDiffs: {},
    setPriceDiffs: () => {},
    isDetailOpen: false,
    setDetailOpen: () => {},
    currentTime: new Date(),
    selectedCoin: null,
    setSelectedCoin: () => {},
});

export default CoinContext;
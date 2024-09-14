import React, { useState, useEffect } from "react";
import CoinContext from "./CoinContext";
import CoinListModel from "../model/coinList/CoinListModel";

const CoinProvider = ({ children }) => {
    const [isDetailOpen, setDetailOpen] = useState(false);  
    const [present, setPresent] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    const [coins, setCoins] = useState([]);
    const [priceDiffs, setPriceDiffs] = useState({});

    const { getCoinHistories } = CoinListModel();

    // 1분마다 체크 ---------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // 1초마다 현재 시간을 업데이트
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // 1분마다 코인 증감 데이터 조회 api 호출
        // 너무 자주 api 호출하면 fetch 오류 발생
        const currentSecond = currentTime.getSeconds();
        if (currentSecond === 0 && coins.length > 0) {
            // 코인 리스트 가져오면 코인별 가격, 대비 등 데이터 가져오기
            coins.forEach(coin => {
                getCoinHistories(coin.id);
            });
        }
    }, [currentTime, coins]);

    return (
        <CoinContext.Provider value={{
            coins,
            setCoins,
            priceDiffs,
            setPriceDiffs,
            isDetailOpen,
            setDetailOpen,
            present,
            setPresent,
            currentTime,
            setCurrentTime
        }}>
            {children}
        </CoinContext.Provider>
    );
};
export default CoinProvider;
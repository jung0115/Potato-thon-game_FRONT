import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from "react-cookie";
import client from 'gamja-backend-client';
import CoinContext from '../../context/CoinContext';

const host = "https://api.miruku.dog";

const CoinListModel = () => {
    const [ cookies ] = useCookies(['token']);

    const { coins, setCoins, priceDiffs, setPriceDiffs } = useContext(CoinContext);

    const getConnection = () => {
        return {
            host: host,
            headers: {
                ...cookies.token ? {
                'Authorization': `Bearer ${cookies.token}`
                } : {}
            }
        }
    }

    const getCoins = async () => {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
            setCoins(response.coins);
        });
    }

    const getCoinHistories = async (coinId) => {
        const currentDate = new Date();
        const pastDate = new Date();
        pastDate.setMinutes(currentDate.getMinutes() - 10);

        try {
            const response = await client.functional.coin.price_histories.getPriceHistories(
                getConnection(),
                coinId,
                {
                    from: pastDate.toISOString(),
                    to: currentDate.toISOString()
                }
            );
            const historyPrice = response.histories || [];
            
            if (historyPrice.length >= 2) {
                const previousPrice = historyPrice[historyPrice.length - 2].price;
                const currentPrice = historyPrice[historyPrice.length - 1].price;

                setPriceDiffs((prev) => ({
                    ...prev,
                    [coinId]: currentPrice - previousPrice
                }));
            }
        } catch (error) {
            console.error(`Failed to fetch history for coin ${coinId}:`, error);
        }
    };


    // 최초 접속 시, 코인 리스트 가져오기
    useEffect(() => {
        getCoins();
    }, []);

    return { getCoinHistories }
}
export default CoinListModel;
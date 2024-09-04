import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import client from "gamja-backend-client";

// api BASE URL
const host = "https://api.miruku.dog";

const ExchangeTabModel = () => {
    const [cookies] = useCookies(['token']);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [coinId, setCoinId] = useState(null);
    const [remainAmount, setRemainAmount] = useState(0); // 잔여 코인 
    const [currentPrice, setCurrentPrice] = useState(0); // 현재 가격

    const getConnection = () => {
        return {
            host: host,
            headers: {
                ...cookies.token ? {
                    'Authorization': `Bearer ${cookies.token}`
                } : null
            }
        }
    }
    
    // coinGetGoins();

    async function coinGetGoins() {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
            console.log(response);
        })
    }

    // 코인 종류 조회 ---------------------------------------------------------------------------------------------------------
    // 코인 id, 잔여 개수 조회
    async function coinGetCoins() {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
        setCoinId(null);
        setRemainAmount(0);
        const coinNameSub = selectedCoin.substr(0, selectedCoin.length - 3);
        for(let i = 0; i < response.coins.length; i++) {
            if(response.coins[i].name == coinNameSub) {
                setCoinId(response.coins[i].id);
                setRemainAmount(Number(response.coins[i].amount));
            }
        }
        })
    }

    // 현재 코인 가격
    async function getCoinPrice() {
        if(coinId != null) {
            const currentDate = new Date(); // 현재 시간
            const pastDate = new Date();
            pastDate.setMinutes(currentDate.getMinutes() - 1);

            await client.functional.coin.price_histories.getPriceHistories(
                getConnection(),
                coinId, // Coin ID
                {
                    from: pastDate.toString(), // From
                    to: currentDate.toString() // To
                }
            ).then(response => {
                setCurrentPrice(response.histories[0].price);
            });
        }
    }

    useEffect(() => {
        console.log(selectedCoin);
        if(selectedCoin != null) coinGetCoins();
    }, [selectedCoin]);
    
    useEffect(() => {
        getCoinPrice();
    }, [coinId, remainAmount]);
    
    useEffect(() => {
        //console.log(currentPrice);
    }, [currentPrice]);
    
    return { 
        selectedCoin, 
        setSelectedCoin,
        coinId, 
        remainAmount, 
        currentPrice,
        cookies, 
        coinGetCoins, 
        getCoinPrice 
    };
}
export default ExchangeTabModel;
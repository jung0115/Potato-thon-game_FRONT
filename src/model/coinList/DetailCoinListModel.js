import React, { useEffect, useState } from 'react';
import client from 'gamja-backend-client';

const host = 'https://api.miruku.dog';

const DetailCoinListModel = (coinName) => {
    const [cookies] = useCookies(['token']);
    const [coinId, setCoinId] = useState(null);
    const [remainAmount, setRemainAmount] = useState(0); // 잔여 코인 
    const [currentPrice, setCurrentPrice] = useState([]); // 현재 가격

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

    const coinGetCoins = async () => {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
            setCoinId(null);
            setRemainAmount(0);
            const coinNameSub = coinName.substr(0, coinName.length - 3);
            for (let i = 0; i < response.coins.length; i++) {
                if (response.coins[i].name == coinNameSub) {
                    setCoinId(response.coins[i].id);
                    setRemainAmount(Number(response.coins[i].amount));
                    //getCoinPrice();
                }
            }
        })
    };

    // 현재 코인 가격
     const getCoinPrice = async () => {
        if(coinId != null) {
            const currentDate = new Date(); // 현재 시간
            const pastDate = new Date();
            pastDate.setMinutes(currentDate.getMinutes() - 11);
        
            await client.functional.coin.price_histories.getPriceHistories(
                getConnection(),
                coinId, // Coin ID
                {
                    from: pastDate.toString(), // From
                    to: currentDate.toString() // To
                }
            ).then(response => {
                setCurrentPrice(response.histories);
                console.log(currentPrice);
            });
        }
    };

    const priceDifferencesCal = () => {
        const priceDifferences = [];
        
        for (let idx = 0; idx < currentPrice.length; idx++) {
            const presentPrice = currentPrice[idx].price;
            let previousPrice = 0;
            
            if (idx < currentPrice.length - 1) {
                previousPrice = currentPrice[idx + 1].price;
            }
            
            const priceDiff = presentPrice - previousPrice;
            priceDifferences.push(priceDiff);
        }
        return priceDifferences;
    };

    // 코인 선택 시, 코인 정보 가져오기
    useEffect(() => {
        if (coinName != null) coinGetCoins();
    }, [coinName]);

    useEffect(() => {
        getCoinPrice();
    }, [coinId, remainAmount]);

    return { currentPrice, remainAmount, priceDifferencesCal };
}
export default DetailCoinListModel;
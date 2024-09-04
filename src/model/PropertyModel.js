import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import client from 'gamja-backend-client';

const host = 'https://api.miruku.dog';

const PropertyModel = () => {
    const [cookies] = useCookies(['token']);
    const [coins, setCoins] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [price, setPrice] = useState(0);

    const title = ["코인명", "매입가", "현재가", "대비", "수량"];

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
    
    const getUserMoney = async () => {
        await client.functional.user.me.getMyUser(
          getConnection()
          ).then((response) => {
            // 사용자 보유 화폐
            setPrice(response.user.balance);
            console.log(response.user);
        });
    }
    
    const getCoins = async () => {
        await client.functional.coin.getCoins(
            getConnection()
        ).then(response => {
            const allcoin = response.coins;
            const myCoin = coins.map(coin => coin.name);
            setAllCoins(allcoin.filter(coin => myCoin.includes(coin.name)));
        });
    }
    
    const getMyCoins = async () => {
        await client.functional.user.me.coins.getMyCoins(
            getConnection()
        ).then(response => {
            const coin = response.coins.filter(coin => coin.amount > 0);
            setCoins(coin);
            getCoins();
            getUserMoney();
        });
    }

    useEffect(() => {
        if (cookies.token) {
            getMyCoins();
        }
    }, [cookies.token, coins]);

    return {
        cookies,
        coins,
        allCoins,
        price,
        title
    };
}
export default PropertyModel;